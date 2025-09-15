import type { QueryGetGameArgs } from "../appsync.js";
import { errorForClubLevelMultitenancy } from "./multitenancy.js";
import type { InputValidator } from "./multitenancy.js";

export const errorForQueryGetGame: InputValidator<QueryGetGameArgs> = ({
  args,
  cogIdentity,
}) =>
  errorForClubLevelMultitenancy({
    cogIdentity,
    clubId: args.input.clubId,
    failureMessage: "Can only get games for one's own club.",
  });
