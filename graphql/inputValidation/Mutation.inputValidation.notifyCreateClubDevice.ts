import { MutationNotifyCreateClubDeviceArgs } from "../appsync";
import { errorForClubLevelMultitenancy, InputValidator } from "./multitenancy";

export const errorForMutationNotifyCreateClubDevice: InputValidator<
  MutationNotifyCreateClubDeviceArgs
> = ({ args, cogIdentity }) =>
  errorForClubLevelMultitenancy({
    cogIdentity,
    clubId: args.input.clubId,
    failureMessage:
      "Can only notify creation of club devices for one's own club.",
  });
