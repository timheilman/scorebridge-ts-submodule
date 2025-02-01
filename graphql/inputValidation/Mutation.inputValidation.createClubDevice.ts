import { MutationCreateClubDeviceArgs } from "../appsync";
import { errorForClubLevelMultitenancy, InputValidator } from "./multitenancy";

export const errorForMutationCreateClubDevice: InputValidator<
  MutationCreateClubDeviceArgs
> = ({ args, cogIdentity }) =>
  errorForClubLevelMultitenancy({
    cogIdentity,
    clubId: args.input.clubId,
    failureMessage: "Can only create club devices for one's own club.",
  });
