import { generateClient } from "aws-amplify/api";
export const client = generateClient();
export type NetworkRequestStatus = "idle" | "inFlight" | "succeeded" | "failed";
