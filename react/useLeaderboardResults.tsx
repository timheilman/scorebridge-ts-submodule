import { BoardResult, DirectionLetter, Game } from "../graphql/appsync";
import { matchPointsScore } from "../matchPointsScore";
import {
  inversePlayerNumber,
  withEachBoard,
  withEachPlayer,
} from "../movementHelpers";
import { tsSubmoduleLogFn } from "../tsSubmoduleLog";

const log = tsSubmoduleLogFn("react.Leaderboard.");

const average = (
  nums: {
    boardMatchPointsScored: number;
    ns: number;
    opponentScoreCount: number;
  }[],
  tableCount: number,
) => {
  const withoutNullsUndefineds = nums.filter(
    (n) => n !== null && n !== undefined,
  );
  if (withoutNullsUndefineds.length === 0) {
    return undefined;
  }
  const mpSum = withoutNullsUndefineds.reduce(
    (acc, mp) => acc + mp.boardMatchPointsScored,
    0,
  );
  const ocSum = withoutNullsUndefineds.reduce(
    (acc, mp) => acc + mp.opponentScoreCount,
    0,
  );
  const nsSum = withoutNullsUndefineds.reduce((acc, mp) => acc + mp.ns, 0);
  log("nsSum", "debug", { nums, nsSum });
  return {
    mp: mpSum / ocSum / 2,
    ns: nsSum / (nums.length * (tableCount - 1)) / 2,
  };
};
export const useLeaderboardResults = ({
  game,
  boardResults,
  playerNumberToName,
}: {
  game: Omit<Game, "tableAssignments"> | undefined;
  boardResults: Record<string, Omit<BoardResult, "board" | "round">>;
  playerNumberToName: Record<number, string | undefined> | undefined;
}) => {
  if (!game) {
    return {};
  }
  const playerNames = playerNumberToName ?? {};
  const tableCount = game.tableCount;
  const getPlayerNumberToBoardToMatchPointOpponentCountPairs = () => {
    return withEachPlayer(game).reduce(
      (playerAcc, playerNumber) => {
        playerAcc[playerNumber] = withEachBoard(game).reduce(
          (acc, board) => {
            const matchpointOpponentCountPair = matchPointsScore({
              ...game,
              playerNumber,
              board,
              boardResults,
              neuberg: false,
            });
            const neubergPair = matchPointsScore({
              ...game,
              playerNumber,
              board,
              boardResults,
              neuberg: true,
            });
            if (
              matchpointOpponentCountPair !== undefined &&
              matchpointOpponentCountPair !== null
            ) {
              acc[board] = {
                ...matchpointOpponentCountPair,
                ns: neubergPair!.boardMatchPointsScored,
              };
            }
            return acc;
          },
          {} as Record<
            number,
            {
              boardMatchPointsScored: number;
              ns: number;
              opponentScoreCount: number;
            }
          >,
        );
        return playerAcc;
      },
      {} as Record<
        number,
        Record<
          number,
          {
            boardMatchPointsScored: number;
            ns: number;
            opponentScoreCount: number;
          }
        >
      >,
    );
  };

  const playerNumberToBoardToMatchPoints =
    getPlayerNumberToBoardToMatchPointOpponentCountPairs();
  const playerNumberToAveragePct = Object.keys(
    playerNumberToBoardToMatchPoints,
  ).reduce(
    (acc, playerNumber) => {
      const individualScore = average(
        Object.values(playerNumberToBoardToMatchPoints[+playerNumber]),
        tableCount,
      );
      if (individualScore !== undefined && individualScore !== null) {
        acc[+playerNumber] = {
          mp: Math.round(individualScore.mp * 1000) / 10,
          ns: Math.round(individualScore.ns * 1000) / 10,
        };
      }
      return acc;
    },
    {} as Record<number, { mp: number; ns: number }>,
  );
  log("playerNumberToAveragePct", "debug", { playerNumberToAveragePct });
  const sortScores = (
    playerNumStringToScore: Record<string, { mp: number; ns: number }>,
  ) => {
    return Object.entries(playerNumStringToScore)
      .sort((a, b) => (a[1].mp > b[1].mp ? -1 : a[1].mp === b[1].mp ? 0 : 1))
      .map((e) => {
        const playerName = playerNames[+e[0]];
        return [playerName, e[1]];
      });
  };
  const individualScoresSorted = sortScores(playerNumberToAveragePct) as [
    string | undefined,
    { mp: number; ns: number },
  ][];

  const filterToDirs = (dir1: DirectionLetter, dir2: DirectionLetter) => {
    return Object.fromEntries(
      Object.entries(playerNumberToAveragePct).filter((e) => {
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

  const nsScoresSorted = sortScores(filterToDirs("N", "S")) as [
    string | undefined,
    { mp: number; ns: number },
  ][];
  const ewScoresSorted = sortScores(filterToDirs("E", "W")) as [
    string | undefined,
    { mp: number; ns: number },
  ][];
  return { individualScoresSorted, nsScoresSorted, ewScoresSorted };
};
