import { QueryListPlayersArgs } from "../appsync";
import { errorForClubLevelMultitenancy, InputValidator } from "./multitenancy";

export const errorForQueryListPlayers: InputValidator<QueryListPlayersArgs> = ({
  args,
  cogIdentity,
}) =>
  errorForClubLevelMultitenancy({
    cogIdentity,
    clubId: args.input.clubId,
    failureMessage: "Can only list one's own club's players",
  });
