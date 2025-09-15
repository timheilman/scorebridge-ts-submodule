import type { BoardResultUl, StagedBoardResult } from "./bridgeEnums.js";

export const startingBoardForBoardGroup = ({
  boardGroup,
  boardsPerRound,
}: {
  boardGroup: number;
  boardsPerRound: number;
}) => {
  return (boardGroup - 1) * boardsPerRound + 1;
};
export const endingBoardForBoardGroup = ({
  boardGroup,
  boardsPerRound,
}: {
  boardGroup: number;
  boardsPerRound: number;
}) => {
  return boardGroup * boardsPerRound;
};
export const combineStagedAndCloudBoardResults = ({
  stagedBoardResults,
  tableNumber,
  cloudBoardResults,
}: {
  stagedBoardResults: Record<string, StagedBoardResult>;
  tableNumber: number;
  cloudBoardResults: Record<string, BoardResultUl>;
}) => {
  const nonFalsyStagedBoardResultEntries = Object.entries(
    stagedBoardResults,
  ).filter(([, val]) => !!val) as [string, BoardResultUl][];
  const remappedStagedBoardResults = Object.fromEntries(
    nonFalsyStagedBoardResultEntries.map(([roundBoard, val]) => [
      `${tableNumber}_${roundBoard}`,
      val,
    ]),
  );
  const combinedCloudAndStagedBoardResults = {
    ...cloudBoardResults,
    ...remappedStagedBoardResults,
  };
  return combinedCloudAndStagedBoardResults;
};
