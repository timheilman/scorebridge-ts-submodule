import { MutationDeleteClubDeviceArgs } from "../appsync";
import { errorForClubLevelMultitenancy, InputValidator } from "./multitenancy";

export const errorForMutationDeleteClubDevice: InputValidator<
  MutationDeleteClubDeviceArgs
> = ({ args, cogIdentity }) =>
  errorForClubLevelMultitenancy({
    cogIdentity,
    clubId: args.input.clubId,
    failureMessage: "Can only delete club devices for one's own club.",
  });
