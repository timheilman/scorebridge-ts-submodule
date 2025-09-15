import type { MutationDeleteClubAndAdminArgs } from "../appsync.js";
import type { InputValidator } from "./multitenancy.js";
import { errorForClubLevelMultitenancy } from "./multitenancy.js";

export const errorForMutationDeleteClubAndAdmin: InputValidator<
  MutationDeleteClubAndAdminArgs
> = ({ args, cogIdentity }) => {
  const multitenancyError = errorForClubLevelMultitenancy({
    cogIdentity,
    clubId: args.input.clubId,
    failureMessage: "Can only remove a club that one is an admin of",
  });
  if (multitenancyError) {
    return multitenancyError;
  }
  if (!cogIdentity) {
    return { msg: "No cogIdentity", errorType: "No cogIdentity" };
  }
  if ((cogIdentity.groups ?? []).includes("adminSuper")) {
    return;
  }
  if (cogIdentity.sub !== args.input.userId) {
    return {
      msg: "Can only remove one's self, not others",
      errorType: "401: Invalid User Id",
    };
  }
  return;
};
