import { MutationUpdateTableAssignmentArgs } from "../appsync";
import {
  errorForDeviceLevelMultitenancy,
  InputValidator,
} from "./multitenancy";

export const errorForMutationUpdateTableAssignment: InputValidator<
  MutationUpdateTableAssignmentArgs
> = ({ args, cogIdentity, stage }) => {
  const clubDeviceId = args.input.partialTableAssignment.clubDeviceId;
  if (clubDeviceId) {
    const deviceLevelMultitenancyError = errorForDeviceLevelMultitenancy({
      cogIdentity,
      clubId: args.input.clubId,
      clubDeviceId,
    });
    if (deviceLevelMultitenancyError) {
      return deviceLevelMultitenancyError;
    }
    return;
  }
  // clubDeviceId is not being set.  Fallback to clientId, though it is a bit superfluous:
  const clientId = args.input.clientId;
  const clientIdSplit = clientId.split(":");
  if (clientIdSplit.length !== 2) {
    return {
      msg: `clientId must be of the form '<userType>:<guid>', clientId: ${clientId}`,
    };
  }
  const [userType, cognitoUsername] = clientIdSplit;
  const validUserTypes = [`webapp-${stage}`, `clubDevice-${stage}`];
  if (!validUserTypes.includes(userType)) {
    return {
      msg: `Unrecognized userType from clientId: ${userType}; valid types are: ${JSON.stringify(validUserTypes)}`,
    };
  }
  // this is somewhat superfluous; to make it airtight would require a 2-stage
  // pipeline to verify that the clubDeviceId provided is the one present in the
  // table assignment for this table number; gameId similarly
  const deviceLevelMultitenancyError = errorForDeviceLevelMultitenancy({
    cogIdentity,
    clubId: args.input.clubId,
    clubDeviceId: cognitoUsername,
  });
  if (deviceLevelMultitenancyError) {
    return deviceLevelMultitenancyError;
  }

  if (args.input.partialTableAssignment.tableNumber < 1) {
    return {
      msg: `tableNumber must be >= 1, tableNumber: ${args.input.partialTableAssignment.tableNumber}`,
    };
  }

  if ((args.input.partialTableAssignment.round ?? 0) < 0) {
    return {
      msg: `round must be >= 0, round: ${args.input.partialTableAssignment.round}`,
    };
  }
  // tableNumber being > tableCount must be verified after the first pipeline
  return;
};
