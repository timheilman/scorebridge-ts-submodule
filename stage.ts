// notably, does not depend on requiredEnvVars.ts, but requiredEnvVars.ts depends on this
export const allStages = ["qa", "tdh", "prod"] as const;
export const allSubaccounts = ["dev", "staging", "prod"] as const;
const stageToSubaccountMap = {
  tdh: "dev",
  qa: "staging",
  prod: "prod",
} as const;
export type Stage = (typeof allStages)[number];
export type Subaccount = (typeof allSubaccounts)[number];
const appAbbreviation = "bf";

export const stageForString = (s: string): Stage => {
  if (allStages.find((stage) => stage === s)) {
    return s as Stage;
  }
  throw new Error(
    `Unrecognized stage: ${s} (must be one of ${allStages.join(", ")})`,
  );
};
export const subaccountForStage = (stage: Stage): Subaccount =>
  stageToSubaccountMap[stage];
export const resourceNameForStage = ({
  stage,
  resourceType,
}: {
  stage: Stage;
  resourceType: string;
}) => `${appAbbreviation}-${stage}-${resourceType}`;
