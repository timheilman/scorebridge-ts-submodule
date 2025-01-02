import { StagedBoardResult } from "../features/clubDeviceInit/clubSlice";
import {
  playedBoardRequiredFields,
  UnkeyedTypeSafeBoardResult,
} from "./bridgeEnums";

export const areBoardResultsEquivalent = ({
  stagedBoardResult,
  unkeyedTypeSafeBoardResult,
}: {
  stagedBoardResult: StagedBoardResult;
  unkeyedTypeSafeBoardResult: UnkeyedTypeSafeBoardResult;
}) => {
  if (
    stagedBoardResult.type === "PASSED_OUT" &&
    unkeyedTypeSafeBoardResult.type === "PASSED_OUT"
  ) {
    return true;
  }
  if (
    stagedBoardResult.type === "NOT_BID_NOT_PLAYED" &&
    unkeyedTypeSafeBoardResult.type === "NOT_BID_NOT_PLAYED"
  ) {
    return true;
  }
  if (
    stagedBoardResult.type !== "PLAYED" ||
    unkeyedTypeSafeBoardResult.type !== "PLAYED"
  ) {
    return false;
  }
  return playedBoardRequiredFields.every(
    (key) => stagedBoardResult[key] === unkeyedTypeSafeBoardResult[key],
  );
};
