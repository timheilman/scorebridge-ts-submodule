import {
  currentConfig,
  getPrintFn,
  LogLevel,
  withConfigProvideLogFn,
} from "./genericLogger";

export function tsSubmoduleLogFn(
  catPrefix: string,
): (catSuffix: string, logLevel: LogLevel, ...addlParams: unknown[]) => void {
  return withConfigProvideLogFn(
    currentConfig(process.env["TS_SUBMODULE_SB_LOGGING_CONFIG"]),
    getPrintFn,
  )(`tsSubmodule.${catPrefix}`);
}
