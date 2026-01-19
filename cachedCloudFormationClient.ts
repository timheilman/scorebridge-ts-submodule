import { CloudFormationClient } from "@aws-sdk/client-cloudformation";

import { cachedAwsSdkV3Client } from "./cachedAwsSdkV3Client";

const profileDict: Record<string, Record<string, CloudFormationClient>> = {};
const envDict: Record<string, CloudFormationClient> = {};

export const cachedCloudFormationClient = (
  awsRegion: string,
  profile: string | null,
): CloudFormationClient => {
  return cachedAwsSdkV3Client<CloudFormationClient>(
    CloudFormationClient,
    awsRegion,
    profile,
    profileDict,
    envDict,
  );
};
