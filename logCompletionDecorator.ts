// usage:
// import { logCompletionDecoratorFactory } from "mount/point/of/submodule"
// import { logFn } from "repo-specific-logging-lib"
// const catPrefix = "src.foo.bar.file.fn.";
// const log = logFn(catPrefix);
// const lcd = logCompletionDecoratorFactory(log, true, "debug", "error");
// log("step.outcome", "debug", { other: "stuff" })
// lcd(new Promise((res, rej) => { setTimeout(500, () => {
//       res() or rej()
//     }) }),
//     "async.step.descr", { other: "stuff"});

type LogType<LOG_LEVEL_TYPE> = (
  catSuffix: string,
  logLevel: LOG_LEVEL_TYPE,
  ...addlArgs: unknown[]
) => void;

export const logCompletionDecoratorFactory = <LOG_LEVEL_TYPE>(
  log: LogType<LOG_LEVEL_TYPE>,
  successLevel: LOG_LEVEL_TYPE = "debug" as LOG_LEVEL_TYPE,
  errLevel: LOG_LEVEL_TYPE = "error" as LOG_LEVEL_TYPE,
) => {
  return <PROMISE_RETURN_TYPE>(
    promise: Promise<PROMISE_RETURN_TYPE>,
    catSuffix: string,
    ...addlArgs: unknown[]
  ) => {
    return logCompletionDecorator<PROMISE_RETURN_TYPE, LOG_LEVEL_TYPE>(
      log,
      promise,
      catSuffix,
      successLevel,
      errLevel,
      ...addlArgs,
    );
  };
};

export const errorSwallowingLogCompletionDecoratorFactory = <LOG_LEVEL_TYPE>(
  log: LogType<LOG_LEVEL_TYPE>,
  successLevel: LOG_LEVEL_TYPE = "debug" as LOG_LEVEL_TYPE,
  errLevel: LOG_LEVEL_TYPE = "error" as LOG_LEVEL_TYPE,
) => {
  return <PROMISE_RETURN_TYPE>(
    promise: Promise<PROMISE_RETURN_TYPE>,
    catSuffix: string,
    ...addlArgs: unknown[]
  ) => {
    try {
      return logCompletionDecorator<PROMISE_RETURN_TYPE, LOG_LEVEL_TYPE>(
        log,
        promise,
        catSuffix,
        successLevel,
        errLevel,
        ...addlArgs,
      );
    } catch {
      // deliberately swallowed
      return Promise.resolve();
    }
  };
};

async function logCompletionDecorator<PROMISE_RETURN_TYPE, LOG_LEVEL_TYPE>(
  log: LogType<LOG_LEVEL_TYPE>,
  promise: Promise<PROMISE_RETURN_TYPE>,
  catSuffix: string,
  logLevel: LOG_LEVEL_TYPE,
  errLogLevel: LOG_LEVEL_TYPE,
  ...addlArgs: unknown[]
) {
  log(`${catSuffix}.begin`, logLevel, ...addlArgs);
  try {
    const r = await promise;
    log(`${catSuffix}.end.success`, logLevel, ...addlArgs);
    return r;
  } catch (e: unknown) {
    log(`${catSuffix}.end.error`, errLogLevel, ...[e, ...addlArgs]);
    throw e;
  }
}
