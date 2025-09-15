import type { QueryListClubDeviceRegistrationsArgs } from "../appsync.js";
import type { InputValidator } from "./multitenancy.js";
import { errorForClubLevelMultitenancy } from "./multitenancy.js";

export const errorForQueryListClubDeviceRegistrations: InputValidator<
  QueryListClubDeviceRegistrationsArgs
> = ({ args, cogIdentity }) =>
  errorForClubLevelMultitenancy({
    cogIdentity,
    clubId: args.input.clubId,
    failureMessage: "Can only list one's own club's device registrations",
  });
