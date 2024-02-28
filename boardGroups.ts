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
