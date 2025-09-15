import type { MutationUpdateTableAssignmentArgs } from "../appsync.js";
import { errorForDeviceLevelMultitenancy } from "./multitenancy.js";
import type { InputValidator } from "./multitenancy.js";

export const errorForMutationUpdateTableAssignment: InputValidator<
  MutationUpdateTableAssignmentArgs
> = ({ args, cogIdentity, clubDeviceIdAlreadyAssignedToThisTable }) => {
  const clubDeviceIdBeingAssignedToThisTableInThisRequest =
    args.input.tableAssignment.clubDeviceId;
  if (clubDeviceIdAlreadyAssignedToThisTable) {
    const deviceLevelMultitenancyError = errorForDeviceLevelMultitenancy({
      cogIdentity,
      clubId: args.input.clubId,
      restrictClubDeviceIdWhenNonAdmin: true,
      allowedClubDeviceId: clubDeviceIdAlreadyAssignedToThisTable,
    });
    if (deviceLevelMultitenancyError) {
      return deviceLevelMultitenancyError;
    }
  }
  if (clubDeviceIdBeingAssignedToThisTableInThisRequest) {
    const deviceLevelMultitenancyError = errorForDeviceLevelMultitenancy({
      cogIdentity,
      clubId: args.input.clubId,
      restrictClubDeviceIdWhenNonAdmin: true,
      allowedClubDeviceId: clubDeviceIdBeingAssignedToThisTableInThisRequest,
    });
    if (deviceLevelMultitenancyError) {
      return deviceLevelMultitenancyError;
    }
  }

  if (args.input.tableAssignment.tableNumber < 1) {
    return {
      msg: `tableNumber must be >= 1, tableNumber: ${args.input.tableAssignment.tableNumber}`,
    };
  }

  if ((args.input.tableAssignment.round ?? 0) < 0) {
    return {
      msg: `round must be >= 0, round: ${args.input.tableAssignment.round}`,
    };
  }
  // tableNumber being > tableCount must be verified after the first pipeline
  if (
    args.input.tableAssignment.clubDeviceId &&
    args.input.tableAssignment.clearClubDeviceId
  ) {
    return { msg: "Cannot set and clear clubDeviceId in the same mutation." };
  }
  return;
};
