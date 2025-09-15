import type { MutationUpdateCurrentGameIdArgs } from "../appsync.js";
import type { InputValidator } from "./multitenancy.js";
import { errorForClubLevelMultitenancy } from "./multitenancy.js";

export const errorForMutationUpdateCurrentGameId: InputValidator<
  MutationUpdateCurrentGameIdArgs
> = ({ args, cogIdentity }) =>
  errorForClubLevelMultitenancy({
    cogIdentity,
    clubId: args.input.clubId,
    failureMessage: "Can only update one's own club",
  });
