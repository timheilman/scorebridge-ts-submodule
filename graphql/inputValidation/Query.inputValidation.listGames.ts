import type { QueryListGamesArgs } from "../appsync.js";
import { errorForClubLevelMultitenancy } from "./multitenancy.js";
import type { InputValidator } from "./multitenancy.js";

export const errorForQueryListGames: InputValidator<QueryListGamesArgs> = ({
  args,
  cogIdentity,
}) =>
  errorForClubLevelMultitenancy({
    cogIdentity,
    clubId: args.input.clubId,
    failureMessage: "Can only list one's own club's games",
  });
