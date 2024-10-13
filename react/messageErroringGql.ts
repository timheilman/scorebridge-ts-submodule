import { retryOnTimeoutGqlPromise } from "../promiseUtils";

export const messageErroringGql = async <T>(gqlPromiseFn: () => Promise<T>) => {
  try {
    return await retryOnTimeoutGqlPromise({ gqlPromiseFn });
  } catch (e) {
    if ((e as { errors: unknown[] }).errors) {
      throw new Error(
        JSON.stringify((e as { errors: unknown[] }).errors, null, 2),
      );
    }
    throw e;
  }
};
