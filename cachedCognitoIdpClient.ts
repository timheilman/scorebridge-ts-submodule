import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import { fromEnv } from "@aws-sdk/credential-providers";

import fromSsoUsingProfile from "./fromSsoUsingProfile";

const profileDict: {
  [awsRegion: string]: { [profile: string]: CognitoIdentityProviderClient };
} = {};
const envDict: {
  [awsRegion: string]: CognitoIdentityProviderClient;
} = {};

export default function cachedCognitoIdpClient(
  awsRegion: string,
  profile: string | null,
) {
  if (profile) {
    if (profileDict[awsRegion] && profileDict[awsRegion][profile]) {
      return profileDict[awsRegion][profile];
    }
    if (!profileDict[awsRegion]) {
      profileDict[awsRegion] = {};
    }
    profileDict[awsRegion][profile] = new CognitoIdentityProviderClient({
      region: awsRegion,
      credentials: fromSsoUsingProfile(profile),
    });
    return profileDict[awsRegion][profile];
  }
  if (envDict[awsRegion]) {
    return envDict[awsRegion];
  }
  envDict[awsRegion] = new CognitoIdentityProviderClient({
    region: awsRegion,
    credentials: fromEnv(),
  });
  return envDict[awsRegion];
}
