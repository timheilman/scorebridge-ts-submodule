// usage:
// import { logCompletionDecoratorFactory } from "mount/point/of/submodule"
// import { logFn } from "repo-specific-logging-lib"
// const catPrefix = "src.foo.bar.file.fn.";
// const log = logFn(catPrefix);
// const lcd = logCompletionDecoratorFactory(log, "debug", "error");
// log("step.outcome", "debug", { other: "stuff" })
// lcd(new Promise((res, rej) => { setTimeout(500, () => {
//       res() or rej()
//     }) }),
//     "async.step.descr", { other: "stuff"});

type LogType = (
    catSuffix: string,
    logLevel: string,
    ...addlArgs: unknown[]
) => void;

type LcdType<PROMISE_RETURN_TYPE> = (
    promise: Promise<PROMISE_RETURN_TYPE>,
    catSuffix: string,
    ...addlArgs: unknown[]
) => Promise<PROMISE_RETURN_TYPE>;

export const logCompletionDecoratorFactory = <PROMISE_RETURN_TYPE>(
    log: LogType,
    successLevel = "debug",
    errLevel = "error",
): LcdType<PROMISE_RETURN_TYPE> => {
  return (
      promise: Promise<PROMISE_RETURN_TYPE>,
      catSuffix: string,
      ...addlArgs: unknown[]
  ) => {
    return logCompletionDecorator<PROMISE_RETURN_TYPE>(
        log,
        promise,
        catSuffix,
        successLevel,
        errLevel,
        ...addlArgs,
    )
  };
};
async function logCompletionDecorator<PROMISE_RETURN_TYPE>(
    log: LogType,
    promise: Promise<PROMISE_RETURN_TYPE>,
    catSuffix: string,
    logLevel: string,
    errLogLevel: string,
    ...addlArgs: unknown[]
) {
  log(`${catSuffix}.begin`, logLevel, ...addlArgs);
  try {
    const r = await promise;
    log(`${catSuffix}.end.success`, logLevel, ...addlArgs);
    return r;
  } catch (e: unknown) {
    log(
        `${catSuffix}.end.error`,
        errLogLevel,
        ...[e, ...addlArgs],
    );
    throw e;
  }
}
