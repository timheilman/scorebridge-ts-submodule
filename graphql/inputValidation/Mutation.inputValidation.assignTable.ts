import { MutationAssignTableArgs } from "../appsync";
import {
  errorForDeviceLevelMultitenancy,
  InputValidator,
} from "./multitenancy";

export const errorForMutationAssignTable: InputValidator<
  MutationAssignTableArgs
> = ({ args, cogIdentity }) =>
  errorForDeviceLevelMultitenancy({
    cogIdentity,
    clubId: args.input.clubId,
    clubDeviceId: args.input.clubDeviceId,
  });
