import type { MutationCreateClubDeviceRegistrationArgs } from "../appsync.js";
import type { InputValidator } from "./multitenancy.js";
import { errorForClubLevelMultitenancy } from "./multitenancy.js";

export const errorForMutationCreateClubDeviceRegistration: InputValidator<
  MutationCreateClubDeviceRegistrationArgs
> = ({ args, cogIdentity }) =>
  errorForClubLevelMultitenancy({
    cogIdentity,
    clubId: args.input.clubId,
    failureMessage: "Can only create club devices for one's own club.",
  });
