import { tsSubmoduleLogFn } from "../tsSubmoduleLog";
import { retryOnTimeoutGqlPromise } from "./reactPromiseUtils";
const log = tsSubmoduleLogFn("messageErroringGql.");
export const messageErroringGql = async <T>(gqlPromiseFn: () => Promise<T>) => {
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
