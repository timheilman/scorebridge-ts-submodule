import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";

import { cachedAwsSdkV3Client } from "./cachedAwsSdkV3Client.js";

const profileDict: Record<
  string,
  Record<string, CognitoIdentityProviderClient>
> = {};
const envDict: Record<string, CognitoIdentityProviderClient> = {};

export const cachedCognitoIdpClient = (
  awsRegion: string,
  profile: string | null
): CognitoIdentityProviderClient => {
  return cachedAwsSdkV3Client<CognitoIdentityProviderClient>(
    CognitoIdentityProviderClient,
    awsRegion,
    profile,
    profileDict,
    envDict
  );
};
