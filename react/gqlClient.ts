import { generateClient } from "aws-amplify/api";
export const client = generateClient();
export const getClient = () => client;
export type NetworkRequestStatus = "idle" | "inFlight" | "succeeded" | "failed";
