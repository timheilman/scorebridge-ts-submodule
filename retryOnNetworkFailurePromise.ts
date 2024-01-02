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
  return new Promise<T>((resolve, reject) => {
    const attempt = (currentAttempt: number) => {
      promiseFunction()
        .then(resolve)
        .catch((error) => {
          if (currentAttempt < maxRetries && loosyGoosyIsNetworkError(error)) {
            const delay = Math.min(
              initialDelay * 2 ** currentAttempt,
              maxDelay,
            );
            setTimeout(() => attempt(currentAttempt + 1), delay);
          } else {
            reject(error);
          }
        });
    };

    attempt(0);
  });
}
