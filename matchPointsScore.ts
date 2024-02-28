import { boardScoreFromBoardResult } from "./boardScore";
import { BoardResult } from "./graphql/appsync";
import { whereWasI, withEachPlayer } from "./movementHelpers";
import { tsSubmoduleLogFn } from "./tsSubmoduleLog";
const log = tsSubmoduleLogFn("features.gameOver.test.");

interface TrueOpponentsParams {
  roundCount: number;
  boardsPerRound: number;
  playerNumber: number;
  tableCount: number;
  board: number;
  movement: string;
}

export const trueOpponents = (params: TrueOpponentsParams) => {
  const whereWasIResult = whereWasI(params)!;
  const {
    tableNumber: playerTable,
    direction: playerDir,
    round: playerRound,
  } = whereWasIResult;
  // log("whereWasI", "debug", { whereWasIResult });
  return withEachPlayer(params).reduce((acc, otherPlayer) => {
    const whereWasHe = whereWasI({ ...params, playerNumber: otherPlayer })!;
    const {
      tableNumber: otherTable,
      direction: otherDir,
      round: otherRound,
    } = whereWasHe;
    // log("whereWasHe", "debug", { otherPlayer, whereWasHe });
    if (otherTable === playerTable && playerRound === otherRound) {
      return acc;
    }
    if (otherDir !== playerDir) {
      return acc;
    }
    acc.push(otherPlayer);
    return acc;
  }, [] as number[]);
};

export const mpScoreCalc = ({
  myScore,
  opponentsScores,
}: {
  myScore: number;
  opponentsScores: number[];
}) => {
  return (
    opponentsScores.reduce((acc, opponentScore) => {
      return (
        acc + (opponentScore === myScore ? 1 : opponentScore < myScore ? 2 : 0)
      );
    }, 0) /
    opponentsScores.length /
    2
  );
};

export const matchPointsScore = (params: {
  roundCount: number;
  boardsPerRound: number;
  playerNumber: number;
  tableCount: number;
  board: number;
  movement: string;
  boardResults: Record<string, Omit<Omit<BoardResult, "board">, "round">>;
}) => {
  const { board, boardResults } = params;
  const {
    tableNumber: playerTable,
    round: playerRound,
    direction: playerDir,
  } = whereWasI(params)!;
  const whereOpponentsWere = trueOpponents(params).map(
    (o) => whereWasI({ ...params, playerNumber: o })!,
  );
  const myScore = boardScoreFromBoardResult({
    boardResult: {
      board,
      round: playerRound,
      ...boardResults[`${playerTable}_${board}_${playerRound}`],
    },
    direction: playerDir,
  });
  if (!myScore) {
    log("myScoreUndefined", "debug");
    return myScore;
  }
  const opponentsScores = whereOpponentsWere.reduce((acc, opponent) => {
    const otherResult = boardScoreFromBoardResult({
      boardResult: {
        board,
        round: opponent.round,
        ...boardResults[`${opponent.tableNumber}_${board}_${opponent.round}`],
      },
      direction: opponent.direction,
    });
    if (otherResult !== null && otherResult !== undefined) {
      acc.push(otherResult);
    }
    return acc;
  }, [] as number[]);
  if (opponentsScores.length === 0) {
    return;
  }
  return mpScoreCalc({ myScore, opponentsScores });
};
