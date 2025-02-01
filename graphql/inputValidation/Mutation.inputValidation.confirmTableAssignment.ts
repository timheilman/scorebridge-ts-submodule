import { MutationConfirmTableAssignmentArgs } from "../appsync";
import {
  errorForDeviceLevelMultitenancy,
  InputValidator,
} from "./multitenancy";

export const errorForMutationConfirmTableAssignment: InputValidator<
  MutationConfirmTableAssignmentArgs
> = ({ args, cogIdentity }) =>
  errorForDeviceLevelMultitenancy({
    cogIdentity,
    clubId: args.input.clubId,
  });
