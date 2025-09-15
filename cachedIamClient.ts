import { IAMClient } from "@aws-sdk/client-iam";

import { cachedAwsSdkV3Client } from "./cachedAwsSdkV3Client.js";

const profileDict: Record<string, Record<string, IAMClient>> = {};
const envDict: Record<string, IAMClient> = {};

export const cachedIamClient = (
  awsRegion: string,
  profile: string | null,
): IAMClient => {
  return cachedAwsSdkV3Client<IAMClient>(
    IAMClient,
    awsRegion,
    profile,
    profileDict,
    envDict,
  );
};
