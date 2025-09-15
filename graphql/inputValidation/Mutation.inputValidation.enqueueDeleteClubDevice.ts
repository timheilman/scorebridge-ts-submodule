import type { MutationEnqueueDeleteClubDeviceArgs } from "../appsync.js";
import type { InputValidator } from "./multitenancy.js";
import { errorForClubLevelMultitenancy } from "./multitenancy.js";

export const errorForMutationEnqueueDeleteClubDevice: InputValidator<
  MutationEnqueueDeleteClubDeviceArgs
> = ({ args, cogIdentity }) =>
  errorForClubLevelMultitenancy({
    cogIdentity,
    clubId: args.input.clubId,
    failureMessage: "Can only delete club devices for one's own club.",
  });
