import { GqlTimeoutAfterRetriesError } from "./GqlTimeoutAfterRetriesError";
import { client } from "./react/gqlClient";

export const delayedStartPromise = <T>({
  promiseFn,
  delayMs,
}: {
  promiseFn: () => Promise<T>;
  delayMs: number;
}) => {
  return new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      promiseFn().then(resolve, reject);
    }, delayMs);
  });
};

export const cancelAfterMsPromise = async <T>({
  promiseFn,
  cancelAfterWaitFn,
  maxWaitMs,
}: {
  promiseFn: () => Promise<T>;
  cancelAfterWaitFn: (t: Promise<T>) => void;
  maxWaitMs: number;
}) => {
  const promise = promiseFn();
  const cancellationTimeout = setTimeout(cancelAfterWaitFn, maxWaitMs, promise);
  try {
    return await promise;
  } finally {
    clearTimeout(cancellationTimeout);
  }
};

export const expBackoffRetryPromise = async <T>(params: {
  promiseFn: (retryCount: number) => Promise<T>;
  shouldRejectNotRetry?: (innerRejection: unknown) => boolean;
  maxRetries?: number;
  initialDelayMs?: number;
  maxDelayMs?: number;
  retryCount?: number;
  rejectWithWhenShouldntRetry?: (innerRejection: unknown) => unknown;
  rejectWithAfterMaxRetries?: (innerRejection: unknown) => unknown;
}): Promise<T> => {
  const {
    promiseFn,
    shouldRejectNotRetry = () => false,
    maxRetries = 2,
    initialDelayMs = 1000,
    retryCount = 0,
    rejectWithWhenShouldntRetry = (e: unknown) => e,
    rejectWithAfterMaxRetries = (e: unknown) => e,
  } = params;
  const promise = promiseFn(retryCount);
  try {
    return await promise;
  } catch (innerRejection) {
    if (retryCount >= maxRetries) {
      throw rejectWithAfterMaxRetries(innerRejection);
    }
    if (shouldRejectNotRetry(innerRejection)) {
      throw rejectWithWhenShouldntRetry(innerRejection);
    } else {
      return delayedStartPromise({
        promiseFn: () =>
          expBackoffRetryPromise({
            ...params,
            retryCount: retryCount + 1,
          }),
        delayMs: initialDelayMs * Math.pow(2, retryCount),
      });
    }
  }
};

export interface RetryingGqlPromiseParams<T> {
  gqlPromiseFn: () => Promise<T>;
  maxRetries?: number;
  initialWaitMs?: number;
  retryCount?: number;
}
export const retryOnTimeoutGqlPromise = async <T>(
  params: RetryingGqlPromiseParams<T>,
): Promise<T> => {
  const {
    gqlPromiseFn,
    maxRetries = 2,
    initialWaitMs = 5000,
    retryCount = 0,
  } = params;
  return expBackoffRetryPromise({
    promiseFn: (retryCount: number) => {
      return cancelAfterMsPromise({
        promiseFn: gqlPromiseFn,
        cancelAfterWaitFn: (p) => {
          client.cancel(p);
        },
        maxWaitMs: initialWaitMs * Math.pow(2, retryCount),
      });
    },
    shouldRejectNotRetry: (e) => !client.isCancelError(e),
    maxRetries,
    initialDelayMs: 0, // no delays between attempts, failsAfterMs used instead
    retryCount,
    rejectWithAfterMaxRetries: (innerRejection: unknown) => {
      const innerError = innerRejection as Error;
      return new GqlTimeoutAfterRetriesError(
        `Failed after ${params.maxRetries} retries; most recent failure: ${innerError.message ? innerError.message : "(unknown)"}.`,
      );
    },
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const loosyGoosyIsNetworkError = (error: any) => {
  if (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    error?.message?.includes &&
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
    (error.message.includes("Network Error") ||
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      error.message.includes("ERR_NAME_NOT_RESOLVED"))
  ) {
    return true;
  }
  if (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    error?.toString &&
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    (error.toString().includes("Network Error") ||
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
      error.toString().includes("ERR_NAME_NOT_RESOLVED"))
  ) {
    return true;
  }
  return (
    JSON.stringify(error).includes("Network Error") ||
    JSON.stringify(error).includes("ERR_NAME_NOT_RESOLVED")
  );
};

export function retryOnNetworkFailurePromise<T>(
  promiseFunction: () => Promise<T>,
  maxRetries = 5,
  initialDelay = 1000,
  maxDelay = 16000,
): Promise<T> {
  return expBackoffRetryPromise({
    promiseFn: promiseFunction,
    shouldRejectNotRetry: (e) => !loosyGoosyIsNetworkError(e),
    maxRetries,
    initialDelayMs: initialDelay,
    maxDelayMs: maxDelay,
  });
}
