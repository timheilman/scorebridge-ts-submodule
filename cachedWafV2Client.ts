import { WAFV2Client } from "@aws-sdk/client-wafv2";

import { cachedAwsSdkV3Client } from "./cachedAwsSdkV3Client";

const profileDict: Record<string, Record<string, WAFV2Client>> = {};
const envDict: Record<string, WAFV2Client> = {};

export const cachedWafV2Client = (
  awsRegion: string,
  profile: string | null,
): WAFV2Client => {
  return cachedAwsSdkV3Client<WAFV2Client>(
    WAFV2Client,
    awsRegion,
    profile,
    profileDict,
    envDict,
  );
};
