import { client } from "./react/gqlClient";

export interface RetryingGqlPromiseParams<T> {
  gqlPromiseFn: () => Promise<T>;
  successFn?: (t: T) => void;
  maxRetries?: number;
  initialDelayMs?: number;
  retry?: number;
}

export const retryOnTimeoutGqlPromise = async <T>(
  params: RetryingGqlPromiseParams<T>,
) => {
  const {
    gqlPromiseFn,
    // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
    successFn = (t) => {},
    maxRetries = 5,
    initialDelayMs = 5000,
    retry = 0,
  } = params;
  if (retry >= maxRetries) {
    throw new Error(`Failed after ${maxRetries} retries.`);
  }
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
    successFn(result);
  } catch (e) {
    if (client.isCancelError(e)) {
      void retryOnTimeoutGqlPromise({ ...params, retry: retry + 1 });
    } else {
      throw e;
    }
  }
};
