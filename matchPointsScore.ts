import { biddingBoxScoreForPartnershipRegardlessOfPlayed } from "./boardScore";
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

export const singleBoardScoreCalcMatchPoints = ({
  myScore,
  opponentsScores,
}: {
  myScore: number;
  opponentsScores: number[];
}) => {
  return opponentsScores.reduce((acc, opponentScore) => {
    return (
      acc + (opponentScore === myScore ? 1 : opponentScore < myScore ? 2 : 0)
    );
  }, 0);
};

export const singleBoardScoreCalcNeuberg = ({
  myScore,
  opponentsScores,
  skippedBoardCount,
}: {
  myScore: number;
  opponentsScores: number[];
  skippedBoardCount: number;
}) => {
  const matchPointsAsThoughZeroUnplayed = singleBoardScoreCalcMatchPoints({
    myScore,
    opponentsScores,
  });
  const fullBoardCount = opponentsScores.length + skippedBoardCount + 1;
  const neuberg =
    (matchPointsAsThoughZeroUnplayed * fullBoardCount + skippedBoardCount) /
    (opponentsScores.length + 1);
  log(`neuberg`, "debug", {
    M: matchPointsAsThoughZeroUnplayed,
    E: fullBoardCount,
    A: opponentsScores.length + 1,
    N: neuberg,
  });
  return neuberg;
};

export interface BoardMatchPointsScore {
  boardMatchPointsScoredNeuberg: number;
  boardMatchPointsScored: number;
  opponentScoreCount: number;
}

export const matchPointsScore = (params: {
  roundCount: number;
  boardsPerRound: number;
  playerNumber: number;
  tableCount: number;
  board: number;
  movement: string;
  boardResults: Record<string, Omit<BoardResult, "board" | "round">>;
}): BoardMatchPointsScore | null | undefined => {
  const { board, boardResults, playerNumber } = params;
  const {
    tableNumber: playerTable,
    round: playerRound,
    direction: playerDir,
  } = whereWasI(params)!;
  const whereOpponentsWere = trueOpponents(params).map(
    (o) => whereWasI({ ...params, playerNumber: o })!,
  );
  const myScore = biddingBoxScoreForPartnershipRegardlessOfPlayed({
    boardResult: {
      board,
      round: playerRound,
      ...boardResults[`${playerTable}_${board}_${playerRound}`],
    },
    direction: playerDir,
  });
  if (myScore === null || myScore === undefined) {
    log(
      "myScoreUndefined",
      playerNumber === 1 && board === 1 ? "info" : "debug",
    );
    return myScore;
  }
  const opponentsScores = whereOpponentsWere.reduce((acc, opponent) => {
    const otherResult = biddingBoxScoreForPartnershipRegardlessOfPlayed({
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
  // log("mpScoreCalc", "debug", { board, myScore, opponentsScores });
  const skippedBoardCount = whereOpponentsWere.length - opponentsScores.length;

  return {
    boardMatchPointsScoredNeuberg: singleBoardScoreCalcNeuberg({
      myScore,
      opponentsScores,
      skippedBoardCount,
    }),
    boardMatchPointsScored: singleBoardScoreCalcMatchPoints({
      myScore,
      opponentsScores,
    }),
    opponentScoreCount: opponentsScores.length,
  };
};
