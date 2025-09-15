import type { MutationUnassignPlayersArgs } from "../appsync.js";
import { errorForDeviceLevelMultitenancy } from "./multitenancy.js";
import type { InputValidator } from "./multitenancy.js";

export const errorForMutationUnassignPlayers: InputValidator<
  MutationUnassignPlayersArgs
> = ({ args, cogIdentity }) =>
  // this is somewhat superfluous; to make it airtight would require a 2-stage
  // pipeline to verify that the clubDeviceId provided is the one present in the
  // table assignment for this table number; gameId similarly
  // so, passing the args.input.clubDeviceId as allowed for now; it should actually
  // be the value from the table assignment
  errorForDeviceLevelMultitenancy({
    cogIdentity,
    clubId: args.input.clubId,
    allowedClubDeviceId: args.input.clubDeviceId ?? undefined,
    restrictClubDeviceIdWhenNonAdmin: true,
  });
