import type { Level, WonTrickCount } from "../../bridgeEnums.js";
import { allLevels, allWonTrickCounts } from "../../bridgeEnums.js";
import type { MutationUpdateBoardResultArgs } from "../appsync.js";
import type { InputValidator } from "./multitenancy.js";
import { errorForDeviceLevelMultitenancy } from "./multitenancy.js";

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
    // TODO: figure this out once schema is updated
    Object.keys(putTargets).length > 1 // confirmed must be present
  ) {
    return {
      msg: `Cannot set results on a PASSED_OUT or NOT_BID_NOT_PLAYED board result.  The only valid fields are board, round, and type.  Instead received: ${JSON.stringify(
        putTargets,
      )}`,
    };
  }
  if (
    type === "PLAYED" &&
    putTargets.level !== undefined &&
    !allLevels.includes(putTargets.level as Level)
  ) {
    return { msg: "Level is invalid." };
  }
  if (
    type === "PLAYED" &&
    putTargets.wonTrickCount !== undefined &&
    !allWonTrickCounts.includes(putTargets.wonTrickCount as WonTrickCount)
  ) {
    return { msg: "WonTrickCount is invalid." };
  }
  // input is valid:
  return;
};
