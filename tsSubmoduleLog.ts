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
    // SCOR-143: because this fn is used only from within submodule, we must
    // guess-and-check as to whether we are in node, webapp prod, webapp
    // testing or device, and pull the env var appropriately for each context:
    // cloud: node, process.env, no prefix
    // webapp prod: vite, import.meta.env, VITE_
    // webapp testing: cypress, Cypress.env(), no prefix
    // device: expo, process.env, EXPO_PUBLIC_
    currentConfig(process.env["TS_SUBMODULE_SB_LOGGING_CONFIG"]),
    getPrintFn,
  )(`tsSubmodule.${catPrefix}`);
}
