import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

import { cachedAwsSdkV3Client } from "./cachedAwsSdkV3Client";

const profileDict: Record<string, Record<string, DynamoDBClient>> = {};
const envDict: Record<string, DynamoDBClient> = {};

export const cachedDynamoDbClient = (
  awsRegion: string,
  profile: string | null,
): DynamoDBClient => {
  return cachedAwsSdkV3Client<DynamoDBClient>(
    DynamoDBClient,
    awsRegion,
    profile,
    profileDict,
    envDict,
  );
};
