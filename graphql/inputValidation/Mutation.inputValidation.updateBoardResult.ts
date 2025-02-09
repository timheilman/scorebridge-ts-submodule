import {
  allLevels,
  allWonTrickCounts,
  Level,
  WonTrickCount,
} from "../../bridgeEnums";
import { MutationUpdateBoardResultArgs } from "../appsync";
import {
  errorForDeviceLevelMultitenancy,
  InputValidator,
} from "./multitenancy";

export const errorForMutationUpdateBoardResult: InputValidator<
  MutationUpdateBoardResultArgs
> = ({ args, cogIdentity, stage }) => {
  const { partialBoardResult } = args.input;
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    board: _board,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    round: _round,
    type,
    ...putTargets
  } = partialBoardResult;
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
  if (
    (type === "PASSED_OUT" || type === "NOT_BID_NOT_PLAYED") &&
    Object.keys(putTargets).length > 0
  ) {
    return {
      msg: `Cannot set results on a PASSED_OUT or NOT_BID_NOT_PLAYED board result.  The only valid fields are board, round, and type.  Instead received: ${JSON.stringify(putTargets)}`,
    };
  }
  if (
    type === "PLAYED" &&
    (putTargets.level === undefined ||
      putTargets.level === null ||
      !putTargets.strain ||
      !putTargets.doubling ||
      !putTargets.declarer ||
      !putTargets.leadRank ||
      !putTargets.leadSuit ||
      putTargets.wonTrickCount === undefined ||
      putTargets.wonTrickCount === null)
  ) {
    return { msg: "Must provide all fields to a PLAYED board result." };
  }

  if (type === "PLAYED" && !allLevels.includes(putTargets.level as Level)) {
    return { msg: "Level is invalid." };
  }
  if (
    type === "PLAYED" &&
    !allWonTrickCounts.includes(putTargets.wonTrickCount as WonTrickCount)
  ) {
    return { msg: "WonTrickCount is invalid." };
  }
  // input is valid:
  return;
};
