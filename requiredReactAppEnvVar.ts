import requiredEnvVar from "./requiredEnvVar";

// SCOR-143 this function never needed to be in the submodule, so it can move directly to
// webapp. Furthermore with the move to vite and import.meta.env, it no longer will depend
// on requiredEnvVar.
export default function requiredReactAppEnvVar(key: string): string {
  return requiredEnvVar(`REACT_APP_${key}`);
}
