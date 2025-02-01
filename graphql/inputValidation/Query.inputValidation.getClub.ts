import { QueryGetClubArgs } from "../appsync";
import { errorForClubLevelMultitenancy, InputValidator } from "./multitenancy";

export const errorForQueryGetClub: InputValidator<QueryGetClubArgs> = ({
  args,
  cogIdentity,
}) =>
  errorForClubLevelMultitenancy({
    cogIdentity,
    clubId: args.clubId,
    failureMessage: "Can only get one's own club",
  });
