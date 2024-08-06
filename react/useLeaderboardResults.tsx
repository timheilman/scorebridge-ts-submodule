import { BoardResult, DirectionLetter, Game } from "../graphql/appsync";
import { BoardAllRoundsScore, matchPointsScore } from "../matchPointsScore";
import {
  inversePlayerNumber,
  withEachBoard,
  withEachPlayer,
} from "../movementHelpers";
import { tsSubmoduleLogFn } from "../tsSubmoduleLog";

const log = tsSubmoduleLogFn("react.Leaderboard.");

const allBoardsAllRoundsPartnershipScore = (
  scores: BoardAllRoundsScore[],
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
interface PlayerAllBoardsScore {
  matchPointPct: number;
  neubergPct: number;
}
type PlayerNameAllBoardsScorePair = [string | undefined, PlayerAllBoardsScore];
const getPlayerNumberToBoardToBoardAllRoundsScoreForPartnership = ({
  game,
  boardResults,
}: {
  game: Omit<Game, "tableAssignments">;
  boardResults: Record<string, Omit<BoardResult, "board" | "round">>;
}) => {
  return withEachPlayer(game).reduce(
    (playerAcc, playerNumber) => {
      playerAcc[playerNumber] = withEachBoard(game).reduce(
        (acc, board) => {
          const thisBoardScore = matchPointsScore({
            ...game,
            playerNumber,
            board,
            boardResults,
          });
          if (thisBoardScore !== undefined && thisBoardScore !== null) {
            acc[board] = thisBoardScore;
          }
          return acc;
        },
        {} as Record<number, BoardAllRoundsScore>,
      );
      return playerAcc;
    },
    {} as Record<number, Record<number, BoardAllRoundsScore>>,
  );
};

export const useLeaderboardResults = ({
  game,
  boardResults,
  playerNumberToName,
}: {
  game: Omit<Game, "tableAssignments"> | undefined;
  boardResults: Record<string, Omit<BoardResult, "board" | "round">>;
  playerNumberToName: Record<number, string | undefined> | undefined;
}):
  | {
      partnershipScoresSortedAll: PlayerNameAllBoardsScorePair[];
      partnershipScoresSortedNs: PlayerNameAllBoardsScorePair[];
      partnershipScoresSortedEw: PlayerNameAllBoardsScorePair[];
    }
  | undefined => {
  if (!game) {
    return;
  }
  const playerNames = playerNumberToName ?? {};
  const tableCount = game.tableCount;

  const playerNumberToBoardToBoardAllRoundsScore =
    getPlayerNumberToBoardToBoardAllRoundsScoreForPartnership({
      game,
      boardResults,
    });
  const playerNumberToAllBoardsScorePct = Object.keys(
    playerNumberToBoardToBoardAllRoundsScore,
  ).reduce(
    (acc, playerNumber) => {
      const partnershipScore = allBoardsAllRoundsPartnershipScore(
        Object.values(playerNumberToBoardToBoardAllRoundsScore[+playerNumber]),
        tableCount,
      );
      if (partnershipScore !== undefined && partnershipScore !== null) {
        acc[+playerNumber] = {
          matchPointPct:
            Math.round(
              partnershipScore.allBoardsScoreDecimalMatchPoints * 1000,
            ) / 10,
          neubergPct:
            Math.round(partnershipScore.allBoardsScoreDecimalNeuberg * 1000) /
            10,
        };
      }
      return acc;
    },
    {} as Record<number, { matchPointPct: number; neubergPct: number }>,
  );
  log("playerNumberToAveragePct", "debug", {
    playerNumberToAllBoardsMatchPointScorePct: playerNumberToAllBoardsScorePct,
  });
  const sortScores = (
    playerNumStringToScore: Record<
      string,
      { matchPointPct: number; neubergPct: number }
    >,
  ): PlayerNameAllBoardsScorePair[] => {
    return Object.entries(playerNumStringToScore)
      .sort((a, b) =>
        a[1].matchPointPct > b[1].matchPointPct
          ? -1
          : a[1].matchPointPct === b[1].matchPointPct
            ? 0
            : 1,
      )
      .map((e) => {
        const playerName = playerNames[+e[0]];
        return [playerName, e[1]] as const;
      });
  };
  const individualScoresSorted = sortScores(playerNumberToAllBoardsScorePct);

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

  const nsScoresSorted = sortScores(filterToDirs("N", "S"));
  const ewScoresSorted = sortScores(filterToDirs("E", "W"));
  return {
    partnershipScoresSortedAll: individualScoresSorted,
    partnershipScoresSortedNs: nsScoresSorted,
    partnershipScoresSortedEw: ewScoresSorted,
  };
};
