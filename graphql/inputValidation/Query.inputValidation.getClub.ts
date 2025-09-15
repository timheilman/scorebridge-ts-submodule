import type { QueryGetClubArgs } from "../appsync.js";
import type { InputValidator } from "./multitenancy.js";
import { errorForClubLevelMultitenancy } from "./multitenancy.js";

export const errorForQueryGetClub: InputValidator<QueryGetClubArgs> = ({
  args,
  cogIdentity,
}) =>
  errorForClubLevelMultitenancy({
    cogIdentity,
    clubId: args.clubId,
    failureMessage: "Can only get one's own club",
  });
