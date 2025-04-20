import { tsSubmoduleLogFn } from "../tsSubmoduleLog";
import { retryOnTimeoutGqlPromise } from "./reactPromiseUtils";
const log = tsSubmoduleLogFn("messageErroringGql.");
let enableRetryOnGqlTimeout = true;

export const setEnableRetryOnGqlTimeout = (enable: boolean) => {
  enableRetryOnGqlTimeout = enable;
};
export const messageErroringGql = async <T>(gqlPromiseFn: () => Promise<T>) => {
  if (!enableRetryOnGqlTimeout) {
    log("messageErroringGql.directPassThrough", "debug");
    return gqlPromiseFn();
  }
  try {
    return await retryOnTimeoutGqlPromise({ gqlPromiseFn });
  } catch (e) {
    log("messageErroringGql", "debug", {
      e,
      eErrors: (e as { errors?: unknown[] }).errors,
    });

    if ((e as { errors?: unknown[] }).errors) {
      throw new Error(
        JSON.stringify((e as { errors: unknown[] }).errors, null, 2),
      );
    }
    throw e;
  }
};
