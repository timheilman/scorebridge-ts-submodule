import { biddingBoxScoreForPartnershipRegardlessOfPlayed } from "./boardScore";
import { UnkeyedTypeSafeBoardResult } from "./bridgeEnums";
import { whereWasI, withEachPlayer } from "./movementHelpers";
import { tsSubmoduleLogFn } from "./tsSubmoduleLog";

const log = tsSubmoduleLogFn("matchPointsScore.");

interface TrueOpponentsParams {
  roundCount: number;
  boardsPerRound: number;
  playerNumber: number;
  tableCount: number;
  board: number;
  movement: string;
}

export const trueOpponents = (params: TrueOpponentsParams) => {
  const whereWasIResult = whereWasI(params);
  if (!whereWasIResult) {
    throw new Error("expected to know where I was");
  }
  const {
    tableNumber: playerTable,
    direction: playerDir,
    round: playerRound,
  } = whereWasIResult;
  // log("whereWasI", "debug", { whereWasIResult });
  return withEachPlayer(params).reduce<number[]>((acc, otherPlayer) => {
    const whereWasHe = whereWasI({ ...params, playerNumber: otherPlayer });
    if (!whereWasHe) {
      throw new Error("expected to know where he was");
    }
    // log("whereWasHe", "debug", { otherPlayer, whereWasHe });
    const {
      tableNumber: otherTable,
      direction: otherDir,
      round: otherRound,
    } = whereWasHe;
    if (otherTable === playerTable && playerRound === otherRound) {
      return acc;
    }
    if (otherDir !== playerDir) {
      return acc;
    }
    acc.push(otherPlayer);
    return acc;
  }, []);
};

export const singleBoardScoreCalcMatchPoints = ({
  myBiddingBoxScore,
  opponentsBiddingBoxScores,
}: {
  myBiddingBoxScore: number;
  opponentsBiddingBoxScores: number[];
}) => {
  return opponentsBiddingBoxScores.reduce((acc, opponentScore) => {
    return (
      acc +
      (opponentScore === myBiddingBoxScore
        ? 1
        : opponentScore < myBiddingBoxScore
          ? 2
          : 0)
    );
  }, 0);
};

export const singleBoardScoreCalcNeuberg = ({
  myBiddingBoxScore,
  opponentsBiddingBoxScores,
  skippedBoardCount,
}: {
  myBiddingBoxScore: number;
  opponentsBiddingBoxScores: number[];
  skippedBoardCount: number;
}) => {
  const matchPointsAsThoughZeroUnplayed = singleBoardScoreCalcMatchPoints({
    myBiddingBoxScore,
    opponentsBiddingBoxScores: opponentsBiddingBoxScores,
  });
  const fullBoardCount =
    opponentsBiddingBoxScores.length + skippedBoardCount + 1;
  const neuberg =
    (matchPointsAsThoughZeroUnplayed * fullBoardCount + skippedBoardCount) /
    (opponentsBiddingBoxScores.length + 1);
  log(`neuberg`, "debug", {
    M: matchPointsAsThoughZeroUnplayed,
    E: fullBoardCount,
    A: opponentsBiddingBoxScores.length + 1,
    N: neuberg,
  });
  return neuberg;
};

export interface BoardAllRoundsScore {
  boardAllRoundsScoreNeuberg: number;
  boardAllRoundsScoreMatchPoints: number;
  opponentScoreCount: number;
}

export const matchPointsScore = (params: {
  roundCount: number;
  boardsPerRound: number;
  playerNumber: number;
  tableCount: number;
  board: number;
  movement: string;
  boardResults: Record<string, UnkeyedTypeSafeBoardResult>;
}): BoardAllRoundsScore | null | undefined => {
  const { board, boardResults } = params;
  const whereIWas = whereWasI(params);
  if (!whereIWas) {
    throw new Error("expected to know where I was");
  }
  const {
    tableNumber: playerTable,
    round: playerRound,
    direction: playerDir,
  } = whereIWas;
  const whereOpponentsWere = trueOpponents(params).map((o) => {
    const whereOpponentWas = whereWasI({ ...params, playerNumber: o });
    if (!whereOpponentWas) {
      throw new Error("expected to know where opponent was");
    }
    return whereOpponentWas;
  });
  const myBiddingBoxScore = biddingBoxScoreForPartnershipRegardlessOfPlayed({
    boardResult: {
      board,
      ...boardResults[`${playerTable}_${board}_${playerRound}`],
    },
    direction: playerDir,
  });
  if (myBiddingBoxScore === undefined) {
    log("myBiddingBoxScoreUndefined", "debug");
    return myBiddingBoxScore;
  } else {
    log("myBiddingBoxScoreNotUndefined", "debug", { myBiddingBoxScore });
  }
  const opponentsBiddingBoxScores = whereOpponentsWere.reduce<number[]>(
    (acc, opponent) => {
      const otherResult = biddingBoxScoreForPartnershipRegardlessOfPlayed({
        boardResult: {
          board,
          ...boardResults[`${opponent.tableNumber}_${board}_${opponent.round}`],
        },
        direction: opponent.direction,
      });
      log("opponentsBiddingBoxScore", "debug", {
        index: `${opponent.tableNumber}_${board}_${opponent.round}`,
        otherResult,
      });
      if (otherResult !== undefined) {
        acc.push(otherResult);
      }
      return acc;
    },
    [],
  );
  log("opponentsBiddingBoxScores", "debug", { opponentsBiddingBoxScores });
  if (opponentsBiddingBoxScores.length === 0) {
    return;
  }
  // log("mpScoreCalc", "debug", { board, myScore, opponentsScores });
  const skippedBoardCount =
    whereOpponentsWere.length - opponentsBiddingBoxScores.length;

  return {
    boardAllRoundsScoreNeuberg: singleBoardScoreCalcNeuberg({
      myBiddingBoxScore,
      opponentsBiddingBoxScores,
      skippedBoardCount,
    }),
    boardAllRoundsScoreMatchPoints: singleBoardScoreCalcMatchPoints({
      myBiddingBoxScore,
      opponentsBiddingBoxScores,
    }),
    opponentScoreCount: opponentsBiddingBoxScores.length,
  };
};
