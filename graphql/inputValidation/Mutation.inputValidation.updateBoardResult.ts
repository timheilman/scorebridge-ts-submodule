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
> = ({ args, cogIdentity }) => {
  const { boardResult } = args.input;
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    board: _board,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    round: _round,
    type,
    ...putTargets
  } = boardResult;
  // this is somewhat superfluous; to make it airtight would require a 2-stage
  // pipeline to verify that the clubDeviceId provided is the one present in the
  // table assignment for this table number; gameId similarly
  // so, passing restrictClubDeviceIdWhenNonAdmin: false for now; it should actually
  // be true and the allowedClubDeviceId value passed from the table assignment record
  const deviceLevelMultitenancyError = errorForDeviceLevelMultitenancy({
    cogIdentity,
    clubId: args.input.clubId,
    restrictClubDeviceIdWhenNonAdmin: false,
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
