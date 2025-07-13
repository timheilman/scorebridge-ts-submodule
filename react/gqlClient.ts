import { generateClient } from "aws-amplify/api";
let client:
  | ReturnType<typeof generateClient<Record<string, unknown>>>
  | undefined = undefined;
export const cachedClient = () => {
  client ??= generateClient<Record<string, unknown>>();
  return client;
};
export type NetworkRequestStatus = "idle" | "inFlight" | "succeeded" | "failed";
