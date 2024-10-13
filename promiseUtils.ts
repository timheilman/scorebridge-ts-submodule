import { GqlTimeoutAfterRetriesError } from "./GqlTimeoutAfterRetriesError";
import { client } from "./react/gqlClient";
import { tsSubmoduleLogFn } from "./tsSubmoduleLog";
const log = tsSubmoduleLogFn("promiseUtils.");

interface DelayedStartPromiseParams<T> {
  promiseFn: () => Promise<T>;
  delayMs: number;
}

export const delayedStartPromise = <T>({
  promiseFn,
  delayMs,
}: DelayedStartPromiseParams<T>) => {
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

interface CancelAfterMsPromiseParams<T> {
  promiseFn: () => Promise<T>;
  cancelAfterWaitFn: (t: Promise<T>) => void;
  waitMs: number;
}

export const cancelAfterMsPromise = async <T>({
  promiseFn,
  cancelAfterWaitFn,
  waitMs,
}: CancelAfterMsPromiseParams<T>) => {
  const promise = promiseFn();
  log("cancelAfterMsPromise", "debug", { now: Date.now(), waitMs });
  const cancellationTimeout = setTimeout(cancelAfterWaitFn, waitMs, promise);
  try {
    return await promise;
  } finally {
    log("cancelAfterMsPromise.finally", "debug", {
      now: Date.now(),
      waitMs,
    });
    clearTimeout(cancellationTimeout);
  }
};

interface ExpBackoffPromiseParams<T> {
  promiseFn: (tryCount: number) => Promise<T>;
  shouldRejectNotRetry?: (innerRejection: unknown) => boolean;
  maxTries?: number;
  initialDelayMs?: number;
  maxDelayMs?: number;
  tryCount?: number;
  rejectWithWhenShouldntRetry?: (innerRejection: unknown) => unknown;
  rejectWithAfterMaxTries?: (innerRejection: unknown) => unknown;
}

export const expBackoffPromise = async <T>(
  params: ExpBackoffPromiseParams<T>,
): Promise<T> => {
  const {
    promiseFn,
    shouldRejectNotRetry = () => false,
    maxTries = 6,
    initialDelayMs = 1000,
    maxDelayMs = 16000,
    tryCount = 1,
    rejectWithWhenShouldntRetry = (e: unknown) => e,
    rejectWithAfterMaxTries = (e: unknown) => e,
  } = params;
  const promise = promiseFn(tryCount);
  try {
    return await promise;
  } catch (innerRejection) {
    if (tryCount >= maxTries) {
      log("expBackoffRetryPromise.rejectWithAfterMaxRetries", "debug", {
        params,
        innerRejection,
      });
      throw rejectWithAfterMaxTries(innerRejection);
    }
    if (shouldRejectNotRetry(innerRejection)) {
      throw rejectWithWhenShouldntRetry(innerRejection);
    } else {
      log("Retrying after error", "debug", { params });
      return delayedStartPromise({
        promiseFn: () =>
          expBackoffPromise({
            ...params,
            tryCount: tryCount + 1,
          }),
        delayMs: Math.min(
          initialDelayMs * Math.pow(2, tryCount - 1),
          maxDelayMs,
        ),
      });
    }
  }
};

export type RetryOnNonresponsivePromiseParams<T> = Omit<
  ExpBackoffPromiseParams<T>,
  "shouldRejectNotRetry" | "initialDelayMs" | "maxDelayMs" | "promiseFn"
> &
  Omit<CancelAfterMsPromiseParams<T>, "waitMs"> & {
    isCancelError: (innerRejection: unknown) => boolean;
    initialWaitMs?: number;
    maxWaitMs?: number;
  };

export const retryOnNonresponsivePromise = async <T>(
  props: RetryOnNonresponsivePromiseParams<T>,
): Promise<T> => {
  const {
    promiseFn,
    cancelAfterWaitFn,
    isCancelError,
    initialWaitMs = 1000,
    maxWaitMs = 16000,
    ...remainingProps
  } = props;
  return expBackoffPromise({
    promiseFn: (tryCount: number) => {
      return cancelAfterMsPromise({
        promiseFn,
        waitMs: Math.min(initialWaitMs * Math.pow(2, tryCount - 1), maxWaitMs),
        cancelAfterWaitFn,
      });
    },
    shouldRejectNotRetry: (innerRejection) => !isCancelError(innerRejection),
    initialDelayMs: 0, // wait in this case, not delay
    maxDelayMs: 0, // wait in this case, not delay
    ...remainingProps,
  });
};

export type RetryingGqlPromiseParams<T> = Omit<
  RetryOnNonresponsivePromiseParams<T>,
  | "promiseFn"
  | "cancelAfterWaitFn"
  | "isCancelError"
  | "rejectWithAfterMaxRetries"
> & {
  gqlPromiseFn: () => Promise<T>;
};
export const retryOnTimeoutGqlPromise = async <T>(
  params: RetryingGqlPromiseParams<T>,
): Promise<T> => {
  const { gqlPromiseFn, maxTries } = params;
  return retryOnNonresponsivePromise({
    promiseFn: gqlPromiseFn,
    cancelAfterWaitFn: (p) => client.cancel(p),
    isCancelError: (e) => client.isCancelError(e),
    rejectWithAfterMaxTries: (innerRejection) => {
      const innerError = innerRejection as Error;
      new GqlTimeoutAfterRetriesError(
        `Failed after ${maxTries} tries. Latest error: ${innerError.message ? innerError.message : "(unknown)"}`,
      );
    },
    ...params,
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

export type RetryOnNetworkFailurePromiseParams<T> = Omit<
  ExpBackoffPromiseParams<T>,
  "shouldRejectNotRetry"
>;

export const retryOnNetworkFailurePromise = <T>(
  props: RetryOnNetworkFailurePromiseParams<T>,
): Promise<T> =>
  expBackoffPromise({
    ...props,
    shouldRejectNotRetry: (e) => !loosyGoosyIsNetworkError(e),
  });
