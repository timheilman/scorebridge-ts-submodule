import { Lambda } from "@aws-sdk/client-lambda";

import { cachedAwsSdkV3Client } from "./cachedAwsSdkV3Client";

const profileDict: Record<string, Record<string, Lambda>> = {};
const envDict: Record<string, Lambda> = {};

export const cachedLambdaClient = (
  awsRegion: string,
  profile: string | null,
): Lambda => {
  return cachedAwsSdkV3Client<Lambda>(
    Lambda,
    awsRegion,
    profile,
    profileDict,
    envDict,
  );
};
