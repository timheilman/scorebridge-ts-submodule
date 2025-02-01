import { MutationAssignPlayerArgs } from "../appsync";
import {
  errorForDeviceLevelMultitenancy,
  InputValidator,
} from "./multitenancy";

export const errorForMutationAssignPlayer: InputValidator<
  MutationAssignPlayerArgs
> = ({ args, cogIdentity }) =>
  // this is somewhat superfluous; to make it airtight would require a 2-stage
  // pipeline to verify that the clubDeviceId provided is the one present in the
  // table assignment for this table number; gameId similarly
  errorForDeviceLevelMultitenancy({
    cogIdentity,
    clubId: args.input.clubId,
    clubDeviceId: args.input.clubDeviceId ?? undefined,
  });
