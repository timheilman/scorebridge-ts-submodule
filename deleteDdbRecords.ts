import {
  BatchWriteCommand,
  DynamoDBDocumentClient,
  NativeAttributeValue,
  QueryCommand,
  QueryCommandOutput,
} from "@aws-sdk/lib-dynamodb";

import { cachedDynamoDbClient } from "./cachedDynamoDbClient";
import { clubKey, gameSortKeyPrefix0 } from "./ddbSortkey";
import { tsSubmoduleLogFn } from "./tsSubmoduleLog";
const log = tsSubmoduleLogFn("deleteDdbRecords.");
async function queryChunk({
  awsRegion,
  profile = null,
  tableName,
  keyConditionExpression,
  expressionAttributeValues,
  exclusiveStartKey,
}: {
  awsRegion: string;
  profile: string | null;
  tableName: string;
  keyConditionExpression: string;
  expressionAttributeValues: Record<string, NativeAttributeValue>;
  exclusiveStartKey: Record<string, NativeAttributeValue> | undefined;
}) {
  log("queryChunk", "debug", {
    keyConditionExpression,
    expressionAttributeValues,
  });
  return DynamoDBDocumentClient.from(
    cachedDynamoDbClient({ awsRegion, profile }),
  ).send(
    new QueryCommand({
      TableName: tableName,
      KeyConditionExpression: keyConditionExpression,
      ExpressionAttributeValues: expressionAttributeValues,
      ExclusiveStartKey: exclusiveStartKey,
    }),
  );
}

async function batchQuery({
  awsRegion,
  profile = null,
  tableName,
  keyConditionExpression,
  expressionAttributeValues,
}: {
  awsRegion: string;
  profile: string | null;
  tableName: string;
  keyConditionExpression: string;
  expressionAttributeValues: Record<string, NativeAttributeValue>;
}) {
  const items: Record<string, NativeAttributeValue>[] = [];
  let lastEvaluatedKey: Record<string, NativeAttributeValue> | undefined =
    undefined;
  do {
    const results: QueryCommandOutput = await queryChunk({
      awsRegion,
      profile,
      tableName,
      keyConditionExpression,
      expressionAttributeValues: expressionAttributeValues,
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
}

export async function batchDeleteGames({
  awsRegion,
  profile,
  tableName,
  clubId,
}: {
  awsRegion: string;
  profile: string;
  tableName: string;
  clubId: string;
}) {
  const keyConditionExpression = "pk = :pk and begins_with(sk, :sk)";
  const expressionAttributeValues = {
    ":pk": clubKey(clubId),
    ":sk": `${gameSortKeyPrefix0}#`,
  };
  const items = await batchQuery({
    awsRegion,
    profile,
    tableName,
    keyConditionExpression,
    expressionAttributeValues,
  });
  log("batchDeleteGames", "debug", { items, clubId });
  await batchDeleteDdbRecords({
    items,
    awsRegion,
    profile,
    tableName,
  });
}

export async function batchDeleteClubDetails({
  awsRegion,
  profile = null,
  scoreBridgeTableName,
  clubId,
}: {
  awsRegion: string;
  profile?: string | null;
  scoreBridgeTableName: string;
  clubId: string;
}) {
  await batchDeleteDdbRecords({
    items: await batchQuery({
      awsRegion,
      tableName: scoreBridgeTableName,
      expressionAttributeValues: {
        ":pk": clubKey(clubId),
      },
      profile,
      keyConditionExpression: "pk = :pk",
    }),
    awsRegion,
    profile,
    tableName: scoreBridgeTableName,
  });
}
export const chunk = <T>(arr: T[], size: number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_v, i) =>
    arr.slice(i * size, i * size + size),
  );

async function batchDeleteDdbRecords({
  items,
  awsRegion,
  profile = null,
  tableName,
}: {
  items: Record<string, NativeAttributeValue>[];
  awsRegion: string;
  profile: string | null;
  tableName: string;
}) {
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
      cachedDynamoDbClient({ awsRegion, profile }).send(
        new BatchWriteCommand({
          RequestItems: { [tableName]: requestItems },
        }),
      ),
    );
  });

  return await Promise.all(promises);
}
