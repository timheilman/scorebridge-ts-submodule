import {
  endingBoardForBoardGroup,
  startingBoardForBoardGroup,
} from "./boardGroups.js";
import type { UnkeyedPlayerAssignment } from "./bridgeEnums.js";
import { allDirections } from "./bridgeEnums.js";
import type {
  DirectionLetter,
  Movement,
  Rank,
  Strain,
} from "./graphql/appsync.js";
import { boardGroupHowell, playerNumberHowell } from "./movementHowell.js";
import {
  boardGroupMitchell,
  playerNumberMitchell,
} from "./movementMitchell.js";
import { boardGroupRainbow, playerNumberRainbow } from "./movementRainbow.js";
import { tsSubmoduleLogFn } from "./tsSubmoduleLog.js";
const log = tsSubmoduleLogFn("movementHelpers.");
export interface BoardGroupProps {
  tableCount: number;
  table: number;
  round: number;
}
export interface PlayerNumberProps extends BoardGroupProps {
  direction: DirectionLetter;
}

export const englishDirection = (direction: DirectionLetter) => {
  switch (direction) {
    case "N":
      return "North";
    case "W":
      return "West";
    case "E":
      return "East";
    case "S":
      return "South";
    default:
      return "Unknown";
  }
};
export const englishStrainSingular = (strain: Strain) => {
  switch (strain) {
    case "C":
      return "Club";
    case "D":
      return "Diamond";
    case "H":
      return "Heart";
    case "S":
      return "Spade";
    case "NT":
      return "No Trump";
    default:
      return "Unknown";
  }
};
export const isRankNumeric = (rank: Rank) => {
  return (
    rank === "TWO" ||
    rank === "THREE" ||
    rank === "FOUR" ||
    rank === "FIVE" ||
    rank === "SIX" ||
    rank === "SEVEN" ||
    rank === "EIGHT" ||
    rank === "NINE" ||
    rank === "TEN"
  );
};
export const englishOrArabicNumeralsRank = (rank: Rank) => {
  switch (rank) {
    case "TWO":
      return "2";
    case "THREE":
      return "3";
    case "FOUR":
      return "4";
    case "FIVE":
      return "5";
    case "SIX":
      return "6";
    case "SEVEN":
      return "7";
    case "EIGHT":
      return "8";
    case "NINE":
      return "9";
    case "TEN":
      return "10";
    case "JACK":
      return "Jack";
    case "QUEEN":
      return "Queen";
    case "KING":
      return "King";
    case "ACE":
      return "Ace";
    default:
      return "Unknown";
  }
};

export const movementMethods = (movement: Movement) => {
  if (movement === "RAINBOW") {
    return {
      playerNumberMethod: playerNumberRainbow,
      boardGroupMethod: boardGroupRainbow,
    };
  }
  if (movement === "MITCHELL") {
    return {
      playerNumberMethod: playerNumberMitchell,
      boardGroupMethod: boardGroupMitchell,
    };
  }
  if ((movement as string) !== "HOWELL") {
    throw new Error(`Unrecognized movement: ${movement}`);
  }
  return {
    playerNumberMethod: playerNumberHowell,
    boardGroupMethod: boardGroupHowell,
  };
};

const ipnMemo = {} as Record<
  string,
  { direction: DirectionLetter; table: number } | undefined
>;

interface InversePlayerNumberParams {
  tableCount: number;
  playerNumber: number;
  movement: Movement;
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
  return withEachTable({ tableCount }).reduce<number[]>((acc, table) => {
    if (boardGroupMethod({ tableCount, table, round }) === boardGroup) {
      acc.push(table);
    }
    return acc;
  }, []);
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
  movement: Movement;
}
const whereWasIMemo = {} as Record<
  string,
  { tableNumber: number; direction: DirectionLetter; round: number } | undefined
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
  movement: Movement;
  tableCount: number;
  boardsPerRound: number;
  roundCount: number;
}) => {
  const boardGroupMethod = movementMethods(movement).boardGroupMethod;
  return withEachTable({ tableCount }).reduce<
    { table: number; round: number }[]
  >((acc, table) => {
    return [
      ...acc,
      ...Array.from({ length: roundCount }, (_, i) => i + 1).reduce<
        { table: number; round: number }[]
      >((acc, round) => {
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
      }, []),
    ];
  }, []);
};

export const tableRoundDirectionToPlayerName = ({
  movement,
  tableCount,
  playerAssignments,
}: {
  movement: Movement;
  tableCount: number;
  // key is "<tableNumber>_<directionLetter>"
  playerAssignments: Record<string, UnkeyedPlayerAssignment | undefined>;
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
      ?.displayName;
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
  // if (dir === "W") {
  return "E";
  // }
};

export const withEachTableBoardRoundTrio = ({
  movement,
  tableCount,
  boardsPerRound,
  roundCount,
}: {
  movement: Movement;
  tableCount: number;
  boardsPerRound: number;
  roundCount: number;
}) =>
  withEachBoard({ roundCount, boardsPerRound }).reduce<
    { board: number; table: number; round: number }[]
  >((acc, board) => {
    tableRoundPairsForBoard({
      board,
      movement,
      tableCount,
      boardsPerRound,
      roundCount,
    }).forEach(({ table, round }) => {
      acc.push({ board, table, round });
    });
    return acc;
  }, []);
