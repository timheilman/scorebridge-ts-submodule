import type { MutationNotifyCreateClubDeviceArgs } from "../appsync.js";
import type { InputValidator } from "./multitenancy.js";
import { errorForClubLevelMultitenancy } from "./multitenancy.js";

export const errorForMutationNotifyCreateClubDevice: InputValidator<
  MutationNotifyCreateClubDeviceArgs
> = ({ args, cogIdentity }) =>
  errorForClubLevelMultitenancy({
    cogIdentity,
    clubId: args.input.clubId,
    failureMessage:
      "Can only notify creation of club devices for one's own club.",
  });
