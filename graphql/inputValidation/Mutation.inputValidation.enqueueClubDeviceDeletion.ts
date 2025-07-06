import { MutationEnqueueClubDeviceDeletionArgs } from "../appsync";
import { errorForClubLevelMultitenancy, InputValidator } from "./multitenancy";

export const errorForMutationEnqueueClubDeviceDeletion: InputValidator<
  MutationEnqueueClubDeviceDeletionArgs
> = ({ args, cogIdentity }) =>
  errorForClubLevelMultitenancy({
    cogIdentity,
    clubId: args.input.clubId,
    failureMessage: "Can only delete club devices for one's own club.",
  });
