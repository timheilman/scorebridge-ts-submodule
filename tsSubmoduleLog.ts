import {
  currentConfig,
  getPrintFn,
  LogLevel,
  withConfigProvideLogFn,
} from "./genericLogger";

// SCOR-143: because this fn is used only from within scorebridge-ts-submodule, we must
// guess-and-check as to whether we are in node, webapp prod, webapp
// testing or device, and pull the env var appropriately for each context:
// cloud: node, process.env, no prefix
// webapp prod: vite, import.meta.env, VITE_
// webapp testing: cypress, Cypress.env(), no prefix
// device: expo, process.env, EXPO_PUBLIC_

function localCurrentConfig() {
  const submoduleLoggingConfigKey = "TS_SUBMODULE_SB_LOGGING_CONFIG";
  let foundProcess = true, foundCypress = true;
  try {
    process
  } catch (e) {
    if (e instanceof ReferenceError && e?.message === "process is not defined") {
      foundProcess = false;
    } else {
      throw e;
    }
  }
  try {
    Cypress
  } catch (e) {
    if (e instanceof ReferenceError && e?.message === "Cypress is not defined") {
      foundCypress = false;
    } else {
      throw e;
    }
  }
  if (foundProcess && process.env["AWS_LAMBDA_FUNCTION_NAME"]) {
    return currentConfig(process.env[submoduleLoggingConfigKey]);
  } else if (foundProcess && process.env["EXPO_PUBLIC_SB_EXPO"]) {
    return currentConfig(process.env[`EXPO_PUBLIC_${submoduleLoggingConfigKey}`]);
  } else if (foundCypress) {
    return currentConfig(Cypress.env[submoduleLoggingConfigKey]);
  } else if (import.meta?.env) {
    return currentConfig(import.meta.env[`VITE_${submoduleLoggingConfigKey}`]);
  }
  return currentConfig(undefined);
}

export function tsSubmoduleLogFn(
  catPrefix: string,
): (catSuffix: string, logLevel: LogLevel, ...addlParams: unknown[]) => void {
  return withConfigProvideLogFn(
    localCurrentConfig(),
    getPrintFn,
  )(`tsSubmodule.${catPrefix}`);
}
