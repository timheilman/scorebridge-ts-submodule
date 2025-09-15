import { SecretsManagerClient } from "@aws-sdk/client-secrets-manager";

import { cachedAwsSdkV3Client } from "./cachedAwsSdkV3Client.js";

const profileDict: Record<string, Record<string, SecretsManagerClient>> = {};
const envDict: Record<string, SecretsManagerClient> = {};

export const cachedSecretsManagerClient = (
  awsRegion: string,
  profile: string | null,
): SecretsManagerClient => {
  return cachedAwsSdkV3Client<SecretsManagerClient>(
    SecretsManagerClient,
    awsRegion,
    profile,
    profileDict,
    envDict,
  );
};
