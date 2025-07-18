import { GqlTimeoutAfterRetriesError } from "../GqlTimeoutAfterRetriesError";
import {
  RetryingGqlPromiseParams,
  retryOnNonresponsivePromise,
} from "../promiseUtils";
import { cachedClient } from "./gqlClient";

export const retryOnTimeoutGqlPromise = async <T>(
  params: RetryingGqlPromiseParams<T>,
): Promise<T> => {
  const { gqlPromiseFn, maxTries } = params;
  const client = cachedClient();
  return retryOnNonresponsivePromise({
    promiseFn: gqlPromiseFn,
    cancelAfterWaitFn: (p) => client.cancel(p),
    isCancelError: (e) => client.isCancelError(e),
    rejectWithAfterMaxTries: (innerRejection) => {
      const innerError = innerRejection as Error;
      return new GqlTimeoutAfterRetriesError(
        `Failed after ${maxTries} tries. Latest error: ${innerError.message ? innerError.message : (innerRejection as string)}`,
      );
    },
    ...params,
  });
};
