import { GqlTimeoutAfterRetriesError } from "./GqlTimeoutAfterRetriesError";
import { getClient } from "./react/gqlClient";

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
  if (retry >= maxRetries) {
    throw new GqlTimeoutAfterRetriesError(
      `Failed after ${maxRetries} retries.`,
    );
  }
  const gqlPromise = gqlPromiseFn();
  const cancellationTimeout = setTimeout(
    () => {
      getClient().cancel(gqlPromise);
    },
    initialDelayMs * Math.pow(2, retry),
  );
  try {
    const result = await gqlPromise;
    clearTimeout(cancellationTimeout);
    return result;
  } catch (e) {
    if (getClient().isCancelError(e)) {
      return await retryOnTimeoutGqlPromise({ ...params, retry: retry + 1 });
    } else {
      throw e;
    }
  }
};
