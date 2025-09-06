import { AppSyncIdentityCognito } from "aws-lambda";

import { MutationDeleteClubHumanArgs } from "../appsync";
import { errorForClubLevelMultitenancy } from "./multitenancy";

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
