import {
  currentConfig,
  getPrintFn,
  LogLevel,
  withConfigProvideLogFn,
} from "./genericLogger";

function logOrInformUndefined(s: string | undefined) {
  if (s === undefined) {
    console.log("Submodule logging config: undefined");
  } else {
    console.log("Submodule logging config: " + s);
  }
}

// SCOR-143: because this fn is used only from within scorebridge-ts-submodule, we must
// guess-and-check as to whether we are in node, webapp prod, webapp
// testing or device, and pull the env var appropriately for each context:
// cloud: node, process.env, no prefix
// webapp prod: vite, import.meta.env, VITE_
// webapp testing: cypress, Cypress.env(), no prefix
// device: expo, process.env, EXPO_PUBLIC_

function localCurrentConfig() {
  const submoduleLoggingConfigKey = "TS_SUBMODULE_SB_LOGGING_CONFIG";
  let foundProcess = true,
    foundCypress = true;
  try {
    process;
  } catch (e) {
    if (
      e instanceof ReferenceError &&
      e?.message === "process is not defined"
    ) {
      foundProcess = false;
    } else {
      throw e;
    }
  }
  try {
    Cypress;
  } catch (e) {
    if (
      e instanceof ReferenceError &&
      e?.message === "Cypress is not defined"
    ) {
      foundCypress = false;
    } else {
      throw e;
    }
  }
  // SCOR-143 TODO: use refreshed custom var here like EXPO_PUBLIC_SB_EXPO rather than
  // AWS_LAMBDA_FUNCTION_NAME in order to catch the Cypress task case
  if (foundProcess && process.env.AWS_LAMBDA_FUNCTION_NAME) {
    console.log("Submodule logging config: using process.env with no prefix:");
    const processEnvNoPrefix = process.env[submoduleLoggingConfigKey];
    logOrInformUndefined(processEnvNoPrefix);
    return currentConfig(processEnvNoPrefix);
  } else if (foundProcess && process.env.EXPO_PUBLIC_SB_EXPO) {
    console.log(
      "Submodule logging config: using process.env with EXPO_PUBLIC_ prefix:",
    );
    const processEnvExpoPublicPrefix =
      process.env[`EXPO_PUBLIC_${submoduleLoggingConfigKey}`];
    logOrInformUndefined(processEnvExpoPublicPrefix);
    return currentConfig(processEnvExpoPublicPrefix);
  } else if (foundCypress) {
    console.log("Submodule logging config: using Cypress.env with no prefix:");
    const cypressEnvNoPrefix = Cypress.env(submoduleLoggingConfigKey);
    logOrInformUndefined(cypressEnvNoPrefix);
    return currentConfig(cypressEnvNoPrefix);
  } else if (import.meta?.env) {
    console.log(
      "Submodule logging config: using import.meta.env with VITE_ prefix:",
    );
    const importMetaEnvVitePrefix = import.meta.env[
      `VITE_${submoduleLoggingConfigKey}`
    ];
    logOrInformUndefined(importMetaEnvVitePrefix);
    return currentConfig(importMetaEnvVitePrefix);
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
