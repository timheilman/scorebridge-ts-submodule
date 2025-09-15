import type { MutationNotifyCreateGameArgs } from "../appsync.js";
import type { InputValidator } from "./multitenancy.js";
import { errorForClubLevelMultitenancy } from "./multitenancy.js";

export const errorForMutationNotifyCreateGame: InputValidator<
  MutationNotifyCreateGameArgs
> = ({ args, cogIdentity }) =>
  errorForClubLevelMultitenancy({
    cogIdentity,
    clubId: args.input.clubId,
    failureMessage: "Can only notify creation of games for one's own club.",
  });
