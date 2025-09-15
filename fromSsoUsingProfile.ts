import { fromSSO } from "@aws-sdk/credential-providers";

export default (profile: string): ReturnType<typeof fromSSO> => {
  return fromSSO({ profile });
};
