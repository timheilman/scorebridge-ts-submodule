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

// TODO: SCOR-337 fix this after fast test written or determined should not be:

// export const areBoardResultsEquivalent = ({
//   stagedBoardResult,
//   unkeyedTypeSafeBoardResult,
// }: {
//   stagedBoardResult: StagedBoardResult;
//   unkeyedTypeSafeBoardResult: UnkeyedTypeSafeBoardResult;
// }) => {
//   if (
//     stagedBoardResult.type === "PASSED_OUT" &&
//     unkeyedTypeSafeBoardResult.type === "PASSED_OUT"
//   ) {
//     return true;
//   }
//   if (
//     stagedBoardResult.type === "NOT_BID_NOT_PLAYED" &&
//     unkeyedTypeSafeBoardResult.type === "NOT_BID_NOT_PLAYED"
//   ) {
//     return true;
//   }
//   if (
//     stagedBoardResult.type !== "PLAYED" ||
//     unkeyedTypeSafeBoardResult.type !== "PLAYED"
//   ) {
//     return false;
//   }
//   return playedBoardRequiredFields.every(
//     (key) => stagedBoardResult[key] === unkeyedTypeSafeBoardResult[key],
//   );
// };
