import { MutationUpdateCurrentGameIdArgs } from "../appsync";
import { errorForClubLevelMultitenancy, InputValidator } from "./multitenancy";

export const errorForMutationUpdateCurrentGameId: InputValidator<
  MutationUpdateCurrentGameIdArgs
> = ({ args, cogIdentity }) =>
  errorForClubLevelMultitenancy({
    cogIdentity,
    clubId: args.input.clubId,
    failureMessage: "Can only update one's own club",
  });
