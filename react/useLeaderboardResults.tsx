import type { BoardResultUl } from "../bridgeEnums.js";
import type { DirectionLetter, Game } from "../graphql/appsync.js";
import type { BoardAllRoundsScore } from "../matchPointsScore.js";
import { matchPointsScore } from "../matchPointsScore.js";
import {
  inversePlayerNumber,
  oppositeDir,
  whereWasI,
  withEachBoard,
  withEachPlayer,
} from "../movementHelpers.js";
import { tsSubmoduleLogFn } from "../tsSubmoduleLog.js";

const log = tsSubmoduleLogFn("react.Leaderboard.");

const allBoardsAllRoundsScore = (
  scores: (BoardAllRoundsScore | null | undefined)[],
  tableCount: number,
) => {
  const withoutNullsUndefineds = scores.filter(
    (n) => n !== null && n !== undefined,
  );
  if (withoutNullsUndefineds.length === 0) {
    return undefined;
  }
  const mpSum = withoutNullsUndefineds.reduce(
    (acc, score) => acc + score.boardAllRoundsScoreMatchPoints,
    0,
  );
  const oscSum = withoutNullsUndefineds.reduce(
    (acc, score) => acc + score.opponentScoreCount,
    0,
  );
  const nsSum = withoutNullsUndefineds.reduce(
    (acc, score) => acc + score.boardAllRoundsScoreNeuberg,
    0,
  );
  log("nsSum", "debug", { scores, nsSum });
  return {
    allBoardsScoreDecimalMatchPoints: mpSum / oscSum / 2,
    allBoardsScoreDecimalNeuberg:
      nsSum / (scores.length * (tableCount - 1)) / 2,
  };
};
export interface PlayerAllBoardsScore {
  matchPointPct: number;
  neubergPct: number;
}
export interface BothScoresPct {
  partnership: PlayerAllBoardsScore;
  individual: PlayerAllBoardsScore;
}

export type AllPlayerFinalScores = Record<number, BothScoresPct | undefined>;

const roleForPlayerOnBoard = ({
  playerNumber,
  board,
  boardResults,
  game,
}: {
  playerNumber: number;
  board: number;
  // key is "<tableNumber>_<board>_<round>"
  boardResults: Record<string, BoardResultUl>;
  game: Omit<Game, "tableAssignments">;
}): "Declarer" | "Defender" | "Dummy" | undefined => {
  const whereIWas = whereWasI({
    playerNumber,
    board,
    ...game,
  });
  if (!whereIWas) {
    throw new Error("expected to find where I was");
  }
  const { direction, tableNumber, round } = whereIWas;
  const boardResult = boardResults[`${tableNumber}_${board}_${round}`];
  if (
    boardResult.type === "PASSED_OUT" ||
    boardResult.type === "NOT_BID_NOT_PLAYED"
  ) {
    return;
  }
  if (!boardResult.declarer) {
    throw new Error(
      `roleForPlayerOnBoard called with PLAYED board without a declarer direction specified. Result in question: ${JSON.stringify(
        boardResult,
      )}`,
    );
  }
  if (boardResult.declarer === direction) {
    return "Declarer";
  }
  if (oppositeDir(boardResult.declarer) === direction) {
    return "Dummy";
  }
  return "Defender";
};
const getPlayerNumberToBoardAllRoundsScoreList = ({
  game,
  boardResults,
}: {
  game: Omit<Game, "tableAssignments">;
  // key is "<tableNumber>_<board>_<round>"
  boardResults: Record<string, BoardResultUl>;
}) => {
  return withEachPlayer(game).reduce<
    Record<
      number,
      | {
          partnership: BoardAllRoundsScore[];
          individual: BoardAllRoundsScore[];
        }
      | null
      | undefined
    >
  >((playerAcc, playerNumber) => {
    playerAcc[playerNumber] = withEachBoard(game).reduce(
      (acc, board) => {
        const thisBoardScore = matchPointsScore({
          ...game,
          playerNumber,
          board,
          boardResults,
        });
        if (thisBoardScore !== undefined && thisBoardScore !== null) {
          acc.partnership.push(thisBoardScore);
          const role = roleForPlayerOnBoard({
            playerNumber,
            board,
            boardResults,
            game,
          });
          if (role === "Defender") {
            acc.individual.push(thisBoardScore);
          } else if (role === "Declarer") {
            acc.individual.push(thisBoardScore);
            acc.individual.push(thisBoardScore);
          }
        }
        return acc;
      },
      {
        partnership: [] as BoardAllRoundsScore[],
        individual: [] as BoardAllRoundsScore[],
      },
    );
    return playerAcc;
  }, {});
};

const pctThreeSigDig = (n: number) => Math.round(n * 1000) / 10;

export const useLeaderboardResults = ({
  game,
  boardResultsLoaded,
  boardResults,
}: {
  game: Omit<Game, "tableAssignments"> | undefined;
  boardResultsLoaded: boolean;
  // key is "<tableNumber>_<board>_<round>"
  boardResults: Record<string, BoardResultUl>;
}) => {
  log("useLeaderboardResults", "debug", { boardResultsLoaded, boardResults });
  if (!game || !boardResultsLoaded) {
    return;
  }
  const tableCount = game.tableCount;

  const playerNumberToBoardAllRoundsScoreList =
    getPlayerNumberToBoardAllRoundsScoreList({
      game,
      boardResults,
    });
  const playerNumberToAllBoardsScorePct = Object.keys(
    playerNumberToBoardAllRoundsScoreList,
  ).reduce<
    Record<
      number,
      | {
          partnership: { matchPointPct: number; neubergPct: number };
          individual: { matchPointPct: number; neubergPct: number };
        }
      | undefined
    >
  >((acc, playerNumber) => {
    const boardAllRoundsScoreList =
      playerNumberToBoardAllRoundsScoreList[+playerNumber];
    if (!boardAllRoundsScoreList) {
      throw new Error(
        `Expected boardAllRoundsScoreList for player number, ${playerNumber}`,
      );
    }
    const partnershipScore = allBoardsAllRoundsScore(
      boardAllRoundsScoreList.partnership,
      tableCount,
    );
    const indivScore = allBoardsAllRoundsScore(
      boardAllRoundsScoreList.individual,
      tableCount,
    );
    if (partnershipScore !== undefined) {
      acc[+playerNumber] = {
        partnership: {
          matchPointPct: pctThreeSigDig(
            partnershipScore.allBoardsScoreDecimalMatchPoints,
          ),
          neubergPct: pctThreeSigDig(
            partnershipScore.allBoardsScoreDecimalNeuberg,
          ),
        },
        individual: {
          matchPointPct: indivScore
            ? pctThreeSigDig(indivScore.allBoardsScoreDecimalMatchPoints)
            : 0,
          neubergPct: indivScore
            ? pctThreeSigDig(indivScore.allBoardsScoreDecimalNeuberg)
            : 0,
        },
      };
    }

    return acc;
  }, {});
  log("playerNumberToAveragePct", "debug", {
    playerNumberToAllBoardsMatchPointScorePct: playerNumberToAllBoardsScorePct,
  });

  const filterToDirs = (dir1: DirectionLetter, dir2: DirectionLetter) => {
    return Object.fromEntries(
      Object.entries(playerNumberToAllBoardsScorePct).filter((e) => {
        const { direction } = inversePlayerNumber({
          ...game,
          playerNumber: +e[0],
        });
        if (direction === dir1 || direction === dir2) {
          return true;
        }
      }),
    );
  };

  return {
    partnershipScoresAll: playerNumberToAllBoardsScorePct,
    partnershipScoresNs: filterToDirs("N", "S"),
    partnershipScoresEw: filterToDirs("E", "W"),
  };
};
