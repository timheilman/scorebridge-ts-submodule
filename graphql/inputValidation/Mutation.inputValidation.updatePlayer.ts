import { MutationUpdatePlayerArgs } from "../appsync";
import { errorForClubLevelMultitenancy, InputValidator } from "./multitenancy";

export const errorForMutationUpdatePlayer: InputValidator<
  MutationUpdatePlayerArgs
> = ({ args, cogIdentity }) =>
  errorForClubLevelMultitenancy({
    cogIdentity,
    clubId: args.input.clubId,
    failureMessage: "Can only update players from one's own club",
  });
