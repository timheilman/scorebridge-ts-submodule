import { tsSubmoduleLogFn } from "./tsSubmoduleLog";
const log = tsSubmoduleLogFn("promiseUtils.");

const initialWaitBeforeKillAndRetryMs = 5000;
const maxWaitBeforeKillAndRetryMs = 60000;

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
  return new Promise<T>((resolve, reject: (reason: unknown) => void) => {
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
    maxTries = 3,
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
    initialWaitMs = initialWaitBeforeKillAndRetryMs,
    maxWaitMs = maxWaitBeforeKillAndRetryMs,
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

const loosyGoosyIsNetworkError = (error: {
  message?: string;
  toString?: () => string;
}) => {
  if (
    error.message?.includes &&
    (error.message.includes("Network Error") ||
      error.message.includes("ERR_NAME_NOT_RESOLVED"))
  ) {
    return true;
  }
  if (
    error.toString &&
    (error.toString().includes("Network Error") ||
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
    shouldRejectNotRetry: (e) =>
      !loosyGoosyIsNetworkError(e as { message?: string }),
  });
