export function retryPromise<T>(
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
          if (currentAttempt < maxRetries) {
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
