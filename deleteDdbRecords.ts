import {
  BatchWriteCommand,
  DynamoDBDocumentClient,
  NativeAttributeValue,
  QueryCommand,
  QueryCommandOutput,
} from "@aws-sdk/lib-dynamodb";

import { clubKey, gameSortKeyPrefix0 } from "./ddbSortkey";
import { tsSubmoduleLogFn } from "./tsSubmoduleLog";
const log = tsSubmoduleLogFn("deleteDdbRecords.");
async function queryChunk({
  ddbClient,
  tableName,
  indexName,
  keyConditionExpression,
  expressionAttributeValues,
  exclusiveStartKey,
}: {
  ddbClient: DynamoDBDocumentClient;
  tableName: string;
  indexName?: string;
  keyConditionExpression: string;
  expressionAttributeValues: Record<string, NativeAttributeValue>;
  exclusiveStartKey: Record<string, NativeAttributeValue> | undefined;
}) {
  log("queryChunk", "debug", {
    keyConditionExpression,
    expressionAttributeValues,
  });
  return ddbClient.send(
    new QueryCommand({
      TableName: tableName,
      ...(indexName ? { IndexName: indexName } : {}),
      KeyConditionExpression: keyConditionExpression,
      ExpressionAttributeValues: expressionAttributeValues,
      ExclusiveStartKey: exclusiveStartKey,
    }),
  );
}

export const batchQuery = async ({
  ddbClient,
  tableName,
  indexName,
  keyConditionExpression,
  expressionAttributeValues,
}: {
  ddbClient: DynamoDBDocumentClient;
  tableName: string;
  indexName?: string;
  keyConditionExpression: string;
  expressionAttributeValues: Record<string, NativeAttributeValue>;
}) => {
  const items: Record<string, NativeAttributeValue>[] = [];
  let lastEvaluatedKey: Record<string, NativeAttributeValue> | undefined =
    undefined;
  do {
    const results: QueryCommandOutput = await queryChunk({
      ddbClient,
      tableName,
      indexName,
      keyConditionExpression,
      expressionAttributeValues,
      exclusiveStartKey: lastEvaluatedKey,
    });
    log("batchQuery.doWhile", "debug", { items, results });
    if (!results.Items) {
      throw new Error("expected results.Items");
    }
    results.Items.forEach((item) => {
      items.push(item);
    });
    log("batchQuery.postItemsForeachPush", "debug", { items });
    lastEvaluatedKey = results.LastEvaluatedKey;
  } while (lastEvaluatedKey && Object.keys(lastEvaluatedKey).length !== 0);
  return items;
};

export async function batchDeleteGames({
  ddbClient,
  tableName,
  clubId,
}: {
  ddbClient: DynamoDBDocumentClient;
  tableName: string;
  clubId: string;
}) {
  const keyConditionExpression = "pk = :pk and begins_with(sk, :sk)";
  const expressionAttributeValues = {
    ":pk": clubKey(clubId),
    ":sk": `${gameSortKeyPrefix0}#`,
  };
  const items = await batchQuery({
    ddbClient,
    tableName,
    keyConditionExpression,
    expressionAttributeValues,
  });
  log("batchDeleteGames", "debug", { items, clubId });
  await batchDeleteDdbRecords({
    items,
    ddbClient,
    tableName,
  });
}

export const batchDeleteClubItems = async ({
  ddbClient,
  scoreBridgeTableName,
  clubId,
}: {
  ddbClient: DynamoDBDocumentClient;
  scoreBridgeTableName: string;
  clubId: string;
}) =>
  batchDeleteDdbRecords({
    items: await batchQuery({
      ddbClient,
      tableName: scoreBridgeTableName,
      expressionAttributeValues: {
        ":pk": clubKey(clubId),
      },
      keyConditionExpression: "pk = :pk",
    }),
    ddbClient,
    tableName: scoreBridgeTableName,
  });

export const chunk = <T>(arr: T[], size: number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_v, i) =>
    arr.slice(i * size, i * size + size),
  );

export const batchDeleteDdbRecords = async ({
  items,
  ddbClient,
  tableName,
}: {
  items: Record<string, NativeAttributeValue>[];
  ddbClient: DynamoDBDocumentClient;
  tableName: string;
}) => {
  // batch deletes have a maximum of 25 records:
  const chunks = chunk(items, 25);
  const promises: Promise<unknown>[] = [];
  chunks.forEach((chunk) => {
    const requestItems = chunk.reduce<
      { DeleteRequest: { Key: Record<string, NativeAttributeValue> } }[]
    >((requestItems, item) => {
      const { pk, sk } = item as {
        pk: string;
        sk: string;
      };
      requestItems.push({
        DeleteRequest: { Key: { pk, sk } },
      });

      return requestItems;
    }, []);
    promises.push(
      ddbClient.send(
        new BatchWriteCommand({
          RequestItems: { [tableName]: requestItems },
        }),
      ),
    );
  });

  return await Promise.all(promises);
};
