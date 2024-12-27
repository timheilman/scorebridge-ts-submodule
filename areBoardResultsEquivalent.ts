import {
  playedBoardRequiredFields,
  UnkeyedTypeSafeBoardResult,
} from "./bridgeEnums";

export const areBoardResultsEquivalent = (
  br1: UnkeyedTypeSafeBoardResult,
  br2: UnkeyedTypeSafeBoardResult,
) => {
  if (br1.type === "PASSED_OUT" && br2.type === "PASSED_OUT") {
    return true;
  }
  if (br1.type === "NOT_BID_NOT_PLAYED" && br2.type === "NOT_BID_NOT_PLAYED") {
    return true;
  }
  if (br1.type !== "PLAYED" || br2.type !== "PLAYED") {
    return false;
  }
  return playedBoardRequiredFields.every((key) => br1[key] === br2[key]);
};
