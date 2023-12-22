// SCOR-143 this function is no longer going to be shared between webapp (REACT_APP)
// and cloud, so it can move directly to cloud
export default function requiredEnvVar(key: string): string {
  if (!process.env[key]) {
    throw new Error(
      `Please set ${key} in env vars. (Did you export vars for your env to .env?)`,
    );
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return process.env[key];
}
