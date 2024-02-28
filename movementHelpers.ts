import {
  endingBoardForBoardGroup,
  startingBoardForBoardGroup,
} from "./boardGroups";
import { DirectionLetter } from "./graphql/appsync";
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

// not too bad to just linear search:
export const inversePlayerNumber = (props: {
  tableCount: number;
  playerNumber: number;
  playerNumberMethod: (props: PlayerNumberProps) => number;
  round?: number;
}) => {
  const { tableCount, playerNumber, playerNumberMethod, round = 1 } = props;
  const directions = ["N", "S", "E", "W"] as const;
  for (const direction of directions) {
    for (let table = 1; table <= tableCount; table++) {
      log("inversePlayerNumber.checking", "debug", {
        direction,
        table,
        playerNumber,
      });
      if (
        playerNumberMethod({
          round: round,
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
        return { direction, table };
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
  return Array.from({ length: tableCount }, (_, i) => i + 1).reduce(
    (acc, table) => {
      if (boardGroupMethod({ tableCount, table, round }) === boardGroup) {
        acc.push(table);
      }
      return acc;
    },
    [] as number[],
  );
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

export const whereWasI = ({
  board,
  playerNumber,
  tableCount,
  roundCount,
  movement,
  boardsPerRound,
}: WhereWasIParams) => {
  for (let round = 1; round <= roundCount; round++) {
    const { direction, table } = inversePlayerNumber({
      tableCount,
      playerNumberMethod: movementMethods(movement).playerNumberMethod,
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
      return { direction, tableNumber: table, round };
    }
  }
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
