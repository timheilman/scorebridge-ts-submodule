import { MutationNotifyCreateGameArgs } from "../appsync";
import { errorForClubLevelMultitenancy, InputValidator } from "./multitenancy";

export const errorForMutationNotifyCreateGame: InputValidator<
  MutationNotifyCreateGameArgs
> = ({ args, cogIdentity }) =>
  errorForClubLevelMultitenancy({
    cogIdentity,
    clubId: args.input.clubId,
    failureMessage: "Can only notify creation of games for one's own club.",
  });
