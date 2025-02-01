import { QueryGetGameArgs } from "../appsync";
import { errorForClubLevelMultitenancy, InputValidator } from "./multitenancy";

export const errorForQueryGetGame: InputValidator<QueryGetGameArgs> = ({
  args,
  cogIdentity,
}) =>
  errorForClubLevelMultitenancy({
    cogIdentity,
    clubId: args.input.clubId,
    failureMessage: "Can only get games for one's own club.",
  });
