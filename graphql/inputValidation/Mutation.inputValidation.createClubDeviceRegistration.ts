import { MutationCreateClubDeviceRegistrationArgs } from "../appsync";
import { errorForClubLevelMultitenancy, InputValidator } from "./multitenancy";

export const errorForMutationCreateClubDeviceRegistration: InputValidator<
  MutationCreateClubDeviceRegistrationArgs
> = ({ args, cogIdentity }) =>
  errorForClubLevelMultitenancy({
    cogIdentity,
    clubId: args.input.clubId,
    failureMessage: "Can only create club devices for one's own club.",
  });
