import type { QueryListClubHumansArgs } from "../appsync.js";
import { errorForClubLevelMultitenancy } from "./multitenancy.js";
import type { InputValidator } from "./multitenancy.js";

export const errorForQueryListClubHumans: InputValidator<
  QueryListClubHumansArgs
> = ({ args, cogIdentity }) =>
  errorForClubLevelMultitenancy({
    cogIdentity,
    clubId: args.input.clubId,
    failureMessage: "Can only list one's own club's clubHumans",
  });
