import type { LogLevel } from "./genericLogger.js";
import {
  currentConfig,
  getPrintFn,
  withConfigProvideLogFn,
} from "./genericLogger.js";

// because this file is referenced from cloud, webapp, cypress main, cypress
// task, and device contexts, it is ignored for linting and formatting from all
// contexts, since each will have different complaints

function logOrInformUndefined(s: string | undefined) {
  if (s === undefined) {
    console.log("Submodule logging config: undefined");
  } else {
    console.log("Submodule logging config: " + s);
  }
}

// because this fn is used only from within scorebridge-ts-submodule, we must
// guess-and-check as to whether we are in node, webapp prod, a webapp Cypress
// test, a webapp Cypress task, or device, and pull the env var appropriately
// for each context.
//
// cloud: node, process.env, no prefix
// webapp prod: vite, import.meta.env, VITE_
// webapp Cypress test: cypress, Cypress.env(), no prefix
// webapp Cypress task: cypress, process.env, no prefix
// device: expo, process.env, EXPO_PUBLIC_
//
// Unfortunately in expo, any reference to Cypress or to import.meta causes an
// uncatchable error, so that means that for ts-submodule code logging in the
// context of webapp prod or a webapp Cypress test, the only way to specify
// logging configuration will be via the file loggingConfig.json.

function localCurrentConfig() {
  const submoduleLoggingConfigKey = "TS_SUBMODULE_SB_LOGGING_CONFIG";
  let foundProcess = true;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    process;
  } catch (e) {
    if (e instanceof ReferenceError) {
      foundProcess = false;
    } else {
      throw e;
    }
  }
  // Cypress test guess removed, since it relies on Cypress object which breaks expo
  if (foundProcess && process.env.AWS_LAMBDA_FUNCTION_NAME) {
    console.log("Submodule logging config: using process.env with no prefix:");
    const processEnvNoPrefix = process.env[submoduleLoggingConfigKey];
    logOrInformUndefined(processEnvNoPrefix);
    return currentConfig(processEnvNoPrefix);
  } else if (foundProcess && process.env.CYPRESS) {
    console.log(
      "Submodule logging config: using process.env with CYPRESS_TASK_ prefix:",
    );
    const processEnvCypressTaskPrefix =
      process.env[`CYPRESS_TASK_${submoduleLoggingConfigKey}`];
    logOrInformUndefined(processEnvCypressTaskPrefix);
    return currentConfig(processEnvCypressTaskPrefix);
  } else if (foundProcess && process.env.EXPO_PUBLIC_SB_EXPO) {
    console.log(
      "Submodule logging config: using process.env with EXPO_PUBLIC_ prefix:",
    );
    const processEnvExpoPublicPrefix =
      process.env[`EXPO_PUBLIC_${submoduleLoggingConfigKey}`];
    logOrInformUndefined(processEnvExpoPublicPrefix);
    return currentConfig(processEnvExpoPublicPrefix);
  }
  // VITE guess removed since it also breaks expo
  return currentConfig(undefined);
}
const config = localCurrentConfig();
export function tsSubmoduleLogFn(
  catPrefix: string,
): (catSuffix: string, logLevel: LogLevel, ...addlParams: unknown[]) => void {
  return withConfigProvideLogFn(config, getPrintFn)(`tsSubmodule.${catPrefix}`);
}
