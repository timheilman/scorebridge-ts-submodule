import { GqlTimeoutAfterRetriesError } from "./GqlTimeoutAfterRetriesError";
import { getClient } from "./react/gqlClient";
import { tsSubmoduleLogFn } from "./tsSubmoduleLog";
const log = tsSubmoduleLogFn("promiseUtils.");

export const delayedStartPromise = <T>({
  promiseFn,
  delayMs,
}: {
  promiseFn: () => Promise<T>;
  delayMs: number;
}) => {
  log("delayedStartPromise", "debug", { delayMs });
  if (delayMs <= 0) {
    return promiseFn();
  }
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
  log("cancelAfterMsPromise", "debug", { now: Date.now(), maxWaitMs });
  const cancellationTimeout = setTimeout(cancelAfterWaitFn, maxWaitMs, promise);
  try {
    return await promise;
  } finally {
    log("cancelAfterMsPromise.finally", "debug", {
      now: Date.now(),
      maxWaitMs,
    });
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
    maxDelayMs = 16000,
    retryCount = 0,
    rejectWithWhenShouldntRetry = (e: unknown) => e,
    rejectWithAfterMaxRetries = (e: unknown) => e,
  } = params;
  const promise = promiseFn(retryCount);
  try {
    return await promise;
  } catch (innerRejection) {
    if (retryCount >= maxRetries) {
      log("expBackoffRetryPromise.rejectWithAfterMaxRetries", "debug", {
        params,
        innerRejection,
      });
      throw rejectWithAfterMaxRetries(innerRejection);
    }
    if (shouldRejectNotRetry(innerRejection)) {
      throw rejectWithWhenShouldntRetry(innerRejection);
    } else {
      log("Retrying after error", "debug", { params });
      return delayedStartPromise({
        promiseFn: () =>
          expBackoffRetryPromise({
            ...params,
            retryCount: retryCount + 1,
          }),
        delayMs: Math.min(initialDelayMs * Math.pow(2, retryCount), maxDelayMs),
      });
    }
  }
};

export interface RetryOnNonresponsivePromiseParams<T> {
  promiseFn: () => Promise<T>;
  cancelAfterWaitFn: (innerPromise: Promise<T>) => void;
  isCancelError: (innerRejection: unknown) => boolean;
  maxRetries?: number;
  initialDelayMs?: number;
  maxDelayMs?: number;
  rejectWithWhenShouldntRetry?: (innerRejection: unknown) => unknown;
  rejectWithAfterMaxRetries?: (innerRejection: unknown) => unknown;
}

export const retryOnNonresponsivePromise = async <T>({
  promiseFn,
  cancelAfterWaitFn,
  isCancelError,
  maxRetries,
  initialDelayMs = 1000,
  maxDelayMs = 16000,
  rejectWithWhenShouldntRetry = (e) => e,
  rejectWithAfterMaxRetries = (e) => e,
}: RetryOnNonresponsivePromiseParams<T>): Promise<T> => {
  return expBackoffRetryPromise({
    promiseFn: (retryCount: number) => {
      return cancelAfterMsPromise({
        promiseFn,
        maxWaitMs: Math.min(
          initialDelayMs * Math.pow(2, retryCount),
          maxDelayMs,
        ),
        cancelAfterWaitFn,
      });
    },
    shouldRejectNotRetry: (innerRejection) => !isCancelError(innerRejection),
    maxRetries,
    initialDelayMs: 0, // delay in this case is handled by cancelAfterMsPromise
    maxDelayMs: 0, // delay in this case is handled by cancelAfterMsPromise
    rejectWithWhenShouldntRetry,
    rejectWithAfterMaxRetries,
  });
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
  const { gqlPromiseFn } = params;
  return retryOnNonresponsivePromise({
    ...params,
    promiseFn: gqlPromiseFn,
    cancelAfterWaitFn: (p) => getClient().cancel(p),
    isCancelError: (e) => getClient().isCancelError(e),
    rejectWithAfterMaxRetries: (innerRejection) => {
      const innerError = innerRejection as Error;
      new GqlTimeoutAfterRetriesError(
        `Failed after ${params.maxRetries} retries. Latest error: ${innerError.message ? innerError.message : "(unknown)"}`,
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
