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

const retryPromise = async <T>(params: {
  promiseFn: (retryCount: number) => Promise<T>;
  retryCondition?: (e: unknown) => boolean;
  maxRetries?: number;
  initialDelayMs?: number;
  maxDelayMs?: number;
  retryCount?: number;
  onFail?: () => void;
}): Promise<T> => {
  const {
    promiseFn,
    retryCondition = () => true,
    maxRetries = 2,
    initialDelayMs = 1000,
    retryCount = 0,
    onFail = () => {
      throw new Error(`Failed after ${maxRetries} retries.`);
    },
  } = params;
  if (retryCount >= maxRetries) {
    onFail();
    return Promise.reject();
  }
  const promise = promiseFn(retryCount);
  try {
    return await promise;
  } catch (e) {
    if (retryCondition(e)) {
      return delayedStartPromise({
        promiseFn: () =>
          retryPromise({
            ...params,
            retryCount: retryCount + 1,
          }),
        delayMs: initialDelayMs * Math.pow(2, retryCount),
      });
    } else {
      throw e;
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
  return retryPromise({
    promiseFn: (retryCount: number) => {
      return cancelAfterMsPromise({
        promiseFn: gqlPromiseFn,
        cancelAfterWaitFn: (p) => {
          client.cancel(p);
        },
        maxWaitMs: initialWaitMs * Math.pow(2, retryCount),
      });
    },
    retryCondition: (e) => client.isCancelError(e),
    maxRetries,
    initialDelayMs: 0, // no delays between attempts, failsAfterMs used instead
    retryCount,
    onFail: () => {
      throw new GqlTimeoutAfterRetriesError(
        `Failed after ${params.maxRetries} retries.`,
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
  return retryPromise({
    promiseFn: promiseFunction,
    retryCondition: loosyGoosyIsNetworkError,
    maxRetries,
    initialDelayMs: initialDelay,
    maxDelayMs: maxDelay,
  });
}
