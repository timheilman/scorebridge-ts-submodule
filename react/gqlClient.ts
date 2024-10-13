import { generateClient } from "aws-amplify/api";
export const client = generateClient<Record<string, unknown>>();
export type NetworkRequestStatus = "idle" | "inFlight" | "succeeded" | "failed";
