import { MutationUnassignPlayersArgs } from "../appsync";
import {
  errorForDeviceLevelMultitenancy,
  InputValidator,
} from "./multitenancy";

export const errorForMutationUnassignPlayers: InputValidator<
  MutationUnassignPlayersArgs
> = ({ args, cogIdentity }) =>
  // this is somewhat superfluous; to make it airtight would require a 2-stage
  // pipeline to verify that the clubDeviceId provided is the one present in the
  // table assignment for this table number; gameId similarly
  errorForDeviceLevelMultitenancy({
    cogIdentity,
    clubId: args.input.clubId,
    clubDeviceId: args.input.clubDeviceId ?? undefined,
  });
