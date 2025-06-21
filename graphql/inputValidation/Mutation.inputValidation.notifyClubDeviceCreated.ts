import { MutationNotifyClubDeviceCreatedArgs } from "../appsync";
import { errorForClubLevelMultitenancy, InputValidator } from "./multitenancy";

export const errorForMutationNotifyClubDeviceCreated: InputValidator<
  MutationNotifyClubDeviceCreatedArgs
> = ({ args, cogIdentity }) =>
  errorForClubLevelMultitenancy({
    cogIdentity,
    clubId: args.input.clubId,
    failureMessage:
      "Can only notify creation of club devices for one's own club.",
  });
