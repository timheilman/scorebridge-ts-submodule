import { QueryListClubDeviceRegistrationsArgs } from "../appsync";
import { errorForClubLevelMultitenancy, InputValidator } from "./multitenancy";

export const errorForQueryListClubDeviceRegistrations: InputValidator<
  QueryListClubDeviceRegistrationsArgs
> = ({ args, cogIdentity }) =>
  errorForClubLevelMultitenancy({
    cogIdentity,
    clubId: args.input.clubId,
    failureMessage: "Can only list one's own club's device registrations",
  });
