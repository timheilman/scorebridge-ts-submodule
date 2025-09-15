import type { AppSyncIdentityCognito } from "aws-lambda";

import type { MutationDeleteClubHumanArgs } from "../appsync.js";
import { errorForClubLevelMultitenancy } from "./multitenancy.js";

export const errorForMutationDeleteClubHuman = ({
  cogIdentity,
  args,
}: {
  cogIdentity?: AppSyncIdentityCognito;
  args: MutationDeleteClubHumanArgs;
}) =>
  errorForClubLevelMultitenancy({
    cogIdentity,
    clubId: args.input.clubId,
    failureMessage: "Can only delete clubHumans for one's own club.",
  });
