import { allDirections } from "./allDirections";
import {
  endingBoardForBoardGroup,
  startingBoardForBoardGroup,
} from "./boardGroups";
import { DirectionLetter, PlayerAssignment } from "./graphql/appsync";
import { boardGroupHowell, playerNumberHowell } from "./movementHowell";
import { boardGroupMitchell, playerNumberMitchell } from "./movementMitchell";
import { boardGroupRainbow, playerNumberRainbow } from "./movementRainbow";
import { tsSubmoduleLogFn } from "./tsSubmoduleLog";
const log = tsSubmoduleLogFn("features.assignBoardResult.movementHelpers.");
export interface BoardGroupProps {
  tableCount: number;
  table: number;
  round: number;
}
export interface PlayerNumberProps extends BoardGroupProps {
  direction: DirectionLetter;
}

export const allLevels = Array.from({ length: 7 }, (_, i) => i + 1);
export const allSuits = ["C", "D", "H", "S"] as const;
export const allStrains = [...allSuits, "NT"] as const;
export const allRanks = [
  "TWO",
  "THREE",
  "FOUR",
  "FIVE",
  "SIX",
  "SEVEN",
  "EIGHT",
  "NINE",
  "TEN",
  "JACK",
  "QUEEN",
  "KING",
  "ACE",
] as const;

export const possibleResults = (level: number) => {
  // at one-level, if opponents make all 13 tricks, that's down seven:
  // one-level: [-7, -6, ..., -1, 1, 2, 3, 4, 5, 6, 7]
  // two-level: [-8, -7, ..., -1, 2, 3, 4, 5, 6, 7]
  // three-level: [-9, ..., -1, 3, 4, ..., 7]
  // four-level: [-10, ..., -1, 4, ..., 7]
  const downLeftEndpoint = -6 - level;
  const downRightEndpoint = -1;
  const madeLeftEndpoint = level;
  const madeRightEndpoint = 7;
  return [
    ...Array.from({ length: 13 }, (_, i) => -(i + 1)).reverse(),
    ...Array.from({ length: 7 }, (_, i) => i + 1),
  ].filter(
    (i) =>
      (i >= downLeftEndpoint && i <= downRightEndpoint) ||
      (i >= madeLeftEndpoint && i <= madeRightEndpoint),
  );
};

export const movementMethods = (movement: string) => {
  if (movement === "rainbow") {
    return {
      playerNumberMethod: playerNumberRainbow,
      boardGroupMethod: boardGroupRainbow,
    };
  }
  if (movement === "mitchell") {
    return {
      playerNumberMethod: playerNumberMitchell,
      boardGroupMethod: boardGroupMitchell,
    };
  }
  if (movement === "howell") {
    return {
      playerNumberMethod: playerNumberHowell,
      boardGroupMethod: boardGroupHowell,
    };
  }
  throw new Error(`Unrecognized movement: ${movement}`);
};

const ipnMemo = {} as Record<
  string,
  { direction: DirectionLetter; table: number }
>;

interface InversePlayerNumberParams {
  tableCount: number;
  playerNumber: number;
  movement: string;
  round?: number;
}
const inversePlayerNumberMemoKey = (props: InversePlayerNumberParams) => {
  const { tableCount, playerNumber, movement, round = 1 } = props;
  return `${movement}_${tableCount}_${playerNumber}_${round}`;
};

export const inversePlayerNumber = (props: InversePlayerNumberParams) => {
  const myMemoKey = inversePlayerNumberMemoKey(props);
  if (ipnMemo[myMemoKey]) {
    return ipnMemo[myMemoKey];
  }
  const { tableCount, playerNumber, movement, round = 1 } = props;

  for (const direction of allDirections) {
    for (let table = 1; table <= tableCount; table++) {
      log("inversePlayerNumber.checking", "debug", {
        direction,
        table,
        playerNumber,
      });
      if (
        movementMethods(movement).playerNumberMethod({
          round,
          tableCount,
          direction,
          table,
        }) === playerNumber
      ) {
        log("inversePlayerNumber.found", "debug", {
          direction,
          table,
          playerNumber,
        });
        ipnMemo[myMemoKey] = { direction, table };
        return ipnMemo[myMemoKey];
      }
    }
  }
  throw new Error(`No player number ${playerNumber} found`);
};

export const inverseBoardGroup = (props: {
  boardGroup: number;
  tableCount: number;
  boardGroupMethod: (props: BoardGroupProps) => number;
  round: number;
}) => {
  const { tableCount, boardGroup, boardGroupMethod, round } = props;
  return withEachTable({ tableCount }).reduce((acc, table) => {
    if (boardGroupMethod({ tableCount, table, round }) === boardGroup) {
      acc.push(table);
    }
    return acc;
  }, [] as number[]);
};

export const isVulnerable = ({
  board,
  direction,
}: {
  board: number;
  direction: DirectionLetter;
}) => {
  const m = ((board - 1) % 16) + 1;
  if (direction === "N" || direction === "S") {
    return (
      m === 2 ||
      m === 4 ||
      m === 5 ||
      m === 7 ||
      m === 10 ||
      m === 12 ||
      m === 13 ||
      m === 15
    );
  }
  return (
    m === 3 ||
    m === 4 ||
    m === 6 ||
    m === 7 ||
    m === 9 ||
    m === 10 ||
    m === 13 ||
    m === 16
  );
};

export const dealer = (board: number): DirectionLetter => {
  const m = ((board - 1) % 4) + 1;
  if (m === 1) {
    return "N";
  }
  if (m === 2) {
    return "E";
  }
  if (m === 3) {
    return "S";
  }
  return "W";
};

interface WhereWasIParams {
  board: number;
  playerNumber: number;
  tableCount: number;
  roundCount: number;
  boardsPerRound: number;
  movement: string;
}
const whereWasIMemo = {} as Record<
  string,
  { tableNumber: number; direction: DirectionLetter; round: number }
>;
const whereWasIMemoKey = (props: WhereWasIParams) => {
  const {
    movement,
    tableCount,
    roundCount,
    boardsPerRound,
    playerNumber,
    board,
  } = props;
  return `${movement}_${tableCount}_${roundCount}_${boardsPerRound}_${playerNumber}_${board}`;
};
export const whereWasI = (params: WhereWasIParams) => {
  const myMemoKey = whereWasIMemoKey(params);
  const memoHit = whereWasIMemo[myMemoKey];
  if (memoHit) {
    return memoHit;
  }
  const {
    board,
    playerNumber,
    tableCount,
    roundCount,
    movement,
    boardsPerRound,
  } = params;
  for (let round = 1; round <= roundCount; round++) {
    const { direction, table } = inversePlayerNumber({
      tableCount,
      movement,
      playerNumber,
      round,
    });
    const boardGroup = movementMethods(movement).boardGroupMethod({
      tableCount,
      table,
      round,
    });
    const start = startingBoardForBoardGroup({ boardGroup, boardsPerRound });
    const end = endingBoardForBoardGroup({ boardGroup, boardsPerRound });
    if (board >= start && board <= end) {
      whereWasIMemo[myMemoKey] = { direction, tableNumber: table, round };
      return whereWasIMemo[myMemoKey];
    }
  }
  return null;
};

export const withEachBoard = ({
  roundCount,
  boardsPerRound,
}: {
  roundCount: number;
  boardsPerRound: number;
}) => {
  return Array.from({ length: roundCount * boardsPerRound }, (_, i) => i + 1);
};

export const withEachPlayer = ({ tableCount }: { tableCount: number }) => {
  return Array.from({ length: tableCount * 4 }, (_, i) => i + 1);
};

export const withEachTable = ({ tableCount }: { tableCount: number }) => {
  return Array.from({ length: tableCount }, (_, i) => i + 1);
};

export const tableRoundPairsForBoard = ({
  board,
  movement,
  tableCount,
  boardsPerRound,
  roundCount,
}: {
  board: number;
  movement: string;
  tableCount: number;
  boardsPerRound: number;
  roundCount: number;
}) => {
  const boardGroupMethod = movementMethods(movement).boardGroupMethod;
  return withEachTable({ tableCount }).reduce(
    (acc, table) => {
      return [
        ...acc,
        ...Array.from({ length: roundCount }, (_, i) => i + 1).reduce(
          (acc, round) => {
            const boardGroup = boardGroupMethod({
              tableCount,
              table,
              round,
            });
            const start = startingBoardForBoardGroup({
              boardGroup,
              boardsPerRound,
            });
            const end = endingBoardForBoardGroup({
              boardGroup,
              boardsPerRound,
            });
            if (board <= end && board >= start) {
              acc.push({ table, round });
            }
            return acc;
          },
          [] as { table: number; round: number }[],
        ),
      ];
    },
    [] as { table: number; round: number }[],
  );
};

export const tableRoundDirectionToPlayerName = ({
  movement,
  tableCount,
  playerAssignments,
}: {
  movement: string;
  tableCount: number;
  // key is "<tableNumber>_<directionLetter>"
  playerAssignments: Record<string, Omit<PlayerAssignment, "directionLetter">>;
}) => {
  const { playerNumberMethod } = movementMethods(movement);
  return ({
    direction,
    tableNumber,
    round,
  }: {
    direction: DirectionLetter;
    tableNumber: number;
    round: number;
  }) => {
    const props = {
      direction,
      tableCount,
      table: tableNumber,
      round,
    };
    const playerNumber = playerNumberMethod(props);
    const { direction: originalDirection, table: originalTable } =
      inversePlayerNumber({
        tableCount,
        playerNumber,
        movement,
      });
    return playerAssignments[`${originalTable}_${originalDirection}`]
      ?.playerDisplayName;
  };
};

export const oppositeDir = (dir: DirectionLetter) => {
  if (dir === "N") {
    return "S";
  }
  if (dir === "S") {
    return "N";
  }
  if (dir === "E") {
    return "W";
  }
  if (dir === "W") {
    return "E";
  }
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  throw new Error(`Unrecognized direction: ${dir}`);
};
