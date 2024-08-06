import { BoardResult, DirectionLetter, Game } from "../graphql/appsync";
import { BoardMatchPointsScore, matchPointsScore } from "../matchPointsScore";
import {
  inversePlayerNumber,
  withEachBoard,
  withEachPlayer,
} from "../movementHelpers";
import { tsSubmoduleLogFn } from "../tsSubmoduleLog";

const log = tsSubmoduleLogFn("react.Leaderboard.");

const average = (scores: BoardMatchPointsScore[], tableCount: number) => {
  const withoutNullsUndefineds = scores.filter(
    (n) => n !== null && n !== undefined,
  );
  if (withoutNullsUndefineds.length === 0) {
    return undefined;
  }
  const mpSum = withoutNullsUndefineds.reduce(
    (acc, score) => acc + score.boardMatchPointsScored,
    0,
  );
  const oscSum = withoutNullsUndefineds.reduce(
    (acc, score) => acc + score.opponentScoreCount,
    0,
  );
  const nsSum = withoutNullsUndefineds.reduce(
    (acc, score) => acc + score.boardMatchPointsScoredNeuberg,
    0,
  );
  log("nsSum", "debug", { scores, nsSum });
  return {
    allBoardsMatchPointScore: mpSum / oscSum / 2,
    allBoardsMatchPointScoreNeuberg:
      nsSum / (scores.length * (tableCount - 1)) / 2,
  };
};
interface PlayerAllBoardsScore {
  matchPointPct: number;
  neubergPct: number;
}
type PlayerNameAllBoardsScorePair = [string | undefined, PlayerAllBoardsScore];
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
      individualScoresSorted: PlayerNameAllBoardsScorePair[];
      nsScoresSorted: PlayerNameAllBoardsScorePair[];
      ewScoresSorted: PlayerNameAllBoardsScorePair[];
    }
  | undefined => {
  if (!game) {
    return;
  }
  const playerNames = playerNumberToName ?? {};
  const tableCount = game.tableCount;
  const getPlayerNumberToBoardToBoardMatchPointsScore = () => {
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
          {} as Record<number, BoardMatchPointsScore>,
        );
        return playerAcc;
      },
      {} as Record<number, Record<number, BoardMatchPointsScore>>,
    );
  };

  const playerNumberToBoardToBoardMatchPoints =
    getPlayerNumberToBoardToBoardMatchPointsScore();
  const playerNumberToAllBoardsMatchPointScorePct = Object.keys(
    playerNumberToBoardToBoardMatchPoints,
  ).reduce(
    (acc, playerNumber) => {
      const individualScore = average(
        Object.values(playerNumberToBoardToBoardMatchPoints[+playerNumber]),
        tableCount,
      );
      if (individualScore !== undefined && individualScore !== null) {
        acc[+playerNumber] = {
          matchPointPct:
            Math.round(individualScore.allBoardsMatchPointScore * 1000) / 10,
          neubergPct:
            Math.round(individualScore.allBoardsMatchPointScoreNeuberg * 1000) /
            10,
        };
      }
      return acc;
    },
    {} as Record<number, { matchPointPct: number; neubergPct: number }>,
  );
  log("playerNumberToAveragePct", "debug", {
    playerNumberToAllBoardsMatchPointScorePct,
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
  const individualScoresSorted = sortScores(
    playerNumberToAllBoardsMatchPointScorePct,
  );

  const filterToDirs = (dir1: DirectionLetter, dir2: DirectionLetter) => {
    return Object.fromEntries(
      Object.entries(playerNumberToAllBoardsMatchPointScorePct).filter((e) => {
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
  return { individualScoresSorted, nsScoresSorted, ewScoresSorted };
};
