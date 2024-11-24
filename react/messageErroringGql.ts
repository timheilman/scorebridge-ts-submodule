import { retryOnTimeoutGqlPromise } from "../promiseUtils";
import { tsSubmoduleLogFn } from "../tsSubmoduleLog";
const log = tsSubmoduleLogFn("messageErroringGql.");
export const messageErroringGql = async <T>(gqlPromiseFn: () => Promise<T>) => {
  try {
    return await retryOnTimeoutGqlPromise({ gqlPromiseFn });
  } catch (e) {
    log("messageErroringGql", "debug", { e });

    if ((e as { errors: unknown[] }).errors) {
      throw new Error(
        JSON.stringify((e as { errors: unknown[] }).errors, null, 2),
      );
    }
    throw e;
  }
};
