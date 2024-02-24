import { AppSyncClient } from "@aws-sdk/client-appsync";

import { cachedAwsSdkV3Client } from "../cachedAwsSdkV3Client";

const profileDict: Record<string, Record<string, AppSyncClient>> = {};
const envDict: Record<string, AppSyncClient> = {};

export const cachedAppsyncClient = (
  awsRegion: string,
  profile: string | null,
): AppSyncClient => {
  return cachedAwsSdkV3Client<AppSyncClient>(
    AppSyncClient,
    awsRegion,
    profile,
    profileDict,
    envDict,
  );
};
