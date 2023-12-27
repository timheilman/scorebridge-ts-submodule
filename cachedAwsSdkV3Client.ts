import { fromEnv } from "@aws-sdk/credential-providers";
import { AwsCredentialIdentityProvider } from "@smithy/types/dist-types/identity/awsCredentialIdentity";

import fromSsoUsingProfile from "./fromSsoUsingProfile";

type AwsClientConstructor<T> = new (params: {
  region: string;
  credentials: AwsCredentialIdentityProvider;
}) => T;
export function cachedAwsSdkV3Client<T>(
  klass: AwsClientConstructor<T>,
  awsRegion: string,
  profile: string | null,
  profileDict: Record<string, Record<string, T>>,
  envDict: Record<string, T>,
) {
  if (profile) {
    if (profileDict[awsRegion] && profileDict[awsRegion][profile]) {
      return profileDict[awsRegion][profile];
    }
    if (!profileDict[awsRegion]) {
      profileDict[awsRegion] = {};
    }
    profileDict[awsRegion][profile] = new klass({
      region: awsRegion,
      credentials: fromSsoUsingProfile(profile),
    });
    return profileDict[awsRegion][profile];
  }
  if (envDict[awsRegion]) {
    return envDict[awsRegion];
  }
  envDict[awsRegion] = new klass({
    region: awsRegion,
    credentials: fromEnv(),
  });
  return envDict[awsRegion];
}
