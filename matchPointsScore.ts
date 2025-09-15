import { biddingBoxScoreForPartnershipRegardlessOfPlayed } from "./boardScore.js";
import { allDirections } from "./bridgeEnums.js";
import type { BoardResultUl } from "./bridgeEnums.js";
import type { DirectionLetter, Game, Movement } from "./graphql/appsync.js";
import {
  movementMethods,
  whereWasI,
  withEachPlayer,
} from "./movementHelpers.js";
import { tsSubmoduleLogFn } from "./tsSubmoduleLog.js";

const log = tsSubmoduleLogFn("matchPointsScore.");

interface TrueOpponentsParams {
  roundCount: number;
  boardsPerRound: number;
  playerNumber: number;
  tableCount: number;
  board: number;
  movement: Movement;
}

export const trueOpponents = (params: TrueOpponentsParams) => {
  const whereWasIResult = whereWasI(params);
  if (!whereWasIResult) {
    throw new Error(`expected to know where I was ${JSON.stringify(params)}`);
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
  movement: Movement;
  boardResults: Record<string, BoardResultUl>;
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
      if (otherResult !== undefined && isNaN(otherResult)) {
        throw new Error("expected a number, instead got NaN");
      }
      log("opponentsBiddingBoxScore", "debug", {
        index: `${opponent.tableNumber}_${board}_${opponent.round}`,
        otherResult,
      });
      if (otherResult !== undefined) {
        acc.push(otherResult);
      }
      return acc;
    },
    []
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
const pointFooPct = (ratio: number) => Math.round(ratio * 1000) / 10;

export const playerDirToMpScore = ({
  game,
  round,
  tableNumber,
  board,
  combinedCloudAndStagedBoardResults,
}: {
  game: Omit<Game, "tableAssignments">;
  round: number;
  tableNumber: number;
  board: number;
  combinedCloudAndStagedBoardResults: Record<string, BoardResultUl>;
}) => {
  return allDirections.reduce<
    Partial<
      Record<DirectionLetter, { myPct: number; opponentPcts: string[] } | null>
    >
  >((dirToComp, dir) => {
    const playerNumber = movementMethods(game.movement).playerNumberMethod({
      direction: dir,
      round,
      table: tableNumber,
      tableCount: game.tableCount,
    });
    const opponents = trueOpponents({ ...game, board, playerNumber });
    const myScore = matchPointsScore({
      ...game,
      playerNumber,
      board,
      boardResults: combinedCloudAndStagedBoardResults,
    });
    if (myScore !== null && myScore !== undefined) {
      dirToComp[dir] = {
        myPct: pointFooPct(
          myScore.boardAllRoundsScoreMatchPoints /
            myScore.opponentScoreCount /
            2
        ),
        opponentPcts: opponents
          .reduce<number[]>((numAcc, opponentPlayerNumber) => {
            const opponentScore = matchPointsScore({
              ...game,
              playerNumber: opponentPlayerNumber,
              board,
              boardResults: combinedCloudAndStagedBoardResults,
            });
            if (opponentScore !== null && opponentScore !== undefined) {
              numAcc.push(
                pointFooPct(
                  opponentScore.boardAllRoundsScoreMatchPoints /
                    opponentScore.opponentScoreCount /
                    2
                )
              );
            }
            return numAcc;
          }, [])
          .sort((a, b) => (dir === "N" || dir === "S" ? a - b : b - a))
          .map((num) => `${num}%`),
      };
    }

    return dirToComp;
  }, {});
};

export const mpScoreString = (
  mpScore: { myPct: number; opponentPcts: string[] } | null | undefined
): string => {
  return mpScore !== null && mpScore !== undefined
    ? `(${mpScore.myPct}% / ${mpScore.opponentPcts.length + 1})`
    : "";
};
