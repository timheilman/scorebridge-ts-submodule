import { SQSClient } from "@aws-sdk/client-sqs";

import { cachedAwsSdkV3Client } from "./cachedAwsSdkV3Client";

const profileDict: Record<string, Record<string, SQSClient>> = {};
const envDict: Record<string, SQSClient> = {};

export const cachedSqsClient = (
  awsRegion: string,
  profile: string | null,
): SQSClient => {
  return cachedAwsSdkV3Client<SQSClient>(
    SQSClient,
    awsRegion,
    profile,
    profileDict,
    envDict,
  );
};
