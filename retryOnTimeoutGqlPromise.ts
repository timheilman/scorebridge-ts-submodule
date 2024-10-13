import { GqlTimeoutAfterRetriesError } from "./GqlTimeoutAfterRetriesError";
import { client } from "./react/gqlClient";
import { tsSubmoduleLogFn } from "./tsSubmoduleLog";
const log = tsSubmoduleLogFn("promiseUtils.");
export interface RetryingGqlPromiseParams<T> {
  gqlPromiseFn: () => Promise<T>;
  maxRetries?: number;
  initialDelayMs?: number;
  retry?: number;
}

export const retryOnTimeoutGqlPromise = async <T>(
  params: RetryingGqlPromiseParams<T>,
): Promise<T> => {
  const {
    gqlPromiseFn,
    maxRetries = 2,
    initialDelayMs = 5000,
    retry = 0,
  } = params;
  log("retryOnTimeoutGqlPromise", "debug", { retry });
  if (retry >= maxRetries) {
    throw new GqlTimeoutAfterRetriesError(
      `Failed after ${maxRetries} retries.`,
    );
  }
  log("invokingGqlPromise", "debug", { retry });
  const gqlPromise = gqlPromiseFn();
  const cancellationTimeout = setTimeout(
    () => {
      client.cancel(gqlPromise);
    },
    initialDelayMs * Math.pow(2, retry),
  );
  try {
    const result = await gqlPromise;
    clearTimeout(cancellationTimeout);
    return result;
  } catch (e) {
    if (client.isCancelError(e)) {
      log("reinvoke.dueToCancel", "debug", { retry });
      return await retryOnTimeoutGqlPromise({ ...params, retry: retry + 1 });
    } else {
      throw e;
    }
  }
};
