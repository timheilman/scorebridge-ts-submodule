import {
  AttributeValue,
  BatchWriteItemCommand,
  QueryCommand,
  QueryCommandOutput,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

import { cachedDynamoDbClient } from "./cachedDynamoDbClient";
import { gameSortKeyPrefix0 } from "./ddbSortkey";
import { tsSubmoduleLogFn } from "./tsSubmoduleLog";
const log = tsSubmoduleLogFn("deleteDdbRecords.");
async function queryChunk({
  awsRegion,
  profile = null,
  tableName,
  keyConditionExpression,
  unmarshalledExpressionAttributeValues,
  exclusiveStartKey,
}: {
  awsRegion: string;
  profile: string | null;
  tableName: string;
  keyConditionExpression: string;
  unmarshalledExpressionAttributeValues: Record<string, string>;
  exclusiveStartKey: Record<string, AttributeValue> | undefined;
}) {
  log("queryChunk", "debug", {
    keyConditionExpression,
    unmarshalledExpressionAttributeValues,
  });
  return cachedDynamoDbClient(awsRegion, profile).send(
    new QueryCommand({
      TableName: tableName,
      KeyConditionExpression: keyConditionExpression,
      ExpressionAttributeValues: marshall(
        unmarshalledExpressionAttributeValues,
      ),
      ExclusiveStartKey: exclusiveStartKey,
    }),
  );
}

async function batchQuery({
  awsRegion,
  profile = null,
  tableName,
  keyConditionExpression,
  unmarshalledExpressionAttributeValues,
}: {
  awsRegion: string;
  profile: string | null;
  tableName: string;
  keyConditionExpression: string;
  unmarshalledExpressionAttributeValues: Record<string, string>;
}) {
  const items: Record<string, AttributeValue>[] = [];
  let lastEvaluatedKey: Record<string, AttributeValue> | undefined = undefined;
  do {
    const results: QueryCommandOutput = await queryChunk({
      awsRegion,
      profile,
      tableName,
      keyConditionExpression,
      unmarshalledExpressionAttributeValues,
      exclusiveStartKey: lastEvaluatedKey,
    });
    log("batchQuery.doWhile", "debug", { items, results });
    results.Items!.forEach((item) => {
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
  const keyConditionExpression =
    "clubId = :clubId and begins_with(sortKey, :sk)";
  const unmarshalledExpressionAttributeValues = {
    ":clubId": clubId,
    ":sk": `${gameSortKeyPrefix0}#`,
  };
  const items = await batchQuery({
    awsRegion,
    profile,
    tableName,
    keyConditionExpression,
    unmarshalledExpressionAttributeValues,
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
      unmarshalledExpressionAttributeValues: {
        ":clubId": clubId,
      },
      profile,
      keyConditionExpression: "clubId = :clubId",
    }),
    awsRegion,
    profile,
    tableName: scoreBridgeTableName,
  });
}

async function batchDeleteDdbRecords({
  items,
  awsRegion,
  profile = null,
  tableName,
}: {
  items: Record<string, AttributeValue>[];
  awsRegion: string;
  profile: string | null;
  tableName: string;
}) {
  const chunk = <T>(arr: T[], size: number) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_v, i) =>
      arr.slice(i * size, i * size + size),
    );
  // batch deletes have a maximum of 25 records:
  const chunks = chunk(items, 25);
  const promises: Promise<unknown>[] = [];
  chunks.forEach((chunk) => {
    const requestItems = chunk.reduce(
      (requestItems, marshalledItem) => {
        const item = unmarshall(marshalledItem) as {
          clubId: string;
          sortKey: string;
        };
        requestItems.push({
          DeleteRequest: {
            Key: marshall({
              clubId: item.clubId,
              sortKey: item.sortKey,
            }),
          },
        });

        return requestItems;
      },
      [] as { DeleteRequest: { Key: Record<string, AttributeValue> } }[],
    );
    promises.push(
      cachedDynamoDbClient(awsRegion, profile).send(
        new BatchWriteItemCommand({
          RequestItems: { [tableName]: requestItems },
        }),
      ),
    );
  });

  return await Promise.all(promises);
}
