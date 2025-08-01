import { allDirections } from "./bridgeEnums";
import { DirectionLetter } from "./graphql/appsync";

// BridgeFridgeTable:
export const clubSortKeyPrefix0 = "C";
export const clubDeviceSortKeyPrefix0 = "D";
export const gameSortKeyPrefix0 = "G";
// shares slot with PlayerAssignment.directionLetter, so must not be N, S, E, or W:
export const resultSortKeyPrefix3 = "R";
export const playerSortKeyPrefix0 = "P";

// UserTable
export const userDetailSortKeyPrefix0 = "U";
export const bridgeFridgeClaimSortKeyPrefix0 = "C";

export const clubDeviceIdFromSortKey = (sortKey: string) => {
  if (!sortKey.startsWith(clubDeviceSortKeyPrefix0)) {
    return {
      error: `Not a clubDeviceItem sortKey; ${sortKey} did not start with ${clubDeviceSortKeyPrefix0}`,
      result: "",
    };
  }
  const theSplit = sortKey.split("#");
  // G, gameId, tableNumber, direction
  if (theSplit.length < 2) {
    return {
      error: `Not a correct sortKey; ${sortKey} has no hashes.`,
      result: "",
    };
  }
  return { result: theSplit[1], error: "" };
};

export const directionLetterFromSortKey = (
  sortKey: string,
): { error: string; result: DirectionLetter } => {
  if (!sortKey.startsWith(gameSortKeyPrefix0)) {
    return {
      error: `Not a correct sortKey; ${sortKey} did not start with ${gameSortKeyPrefix0}`,
      result: "N" as const,
    };
  }
  const theSplit = sortKey.split("#");
  // G, gameId, tableNumber, direction
  if (theSplit.length < 4) {
    return {
      error: `Not a correct sortKey; ${sortKey} has under three hashes.`,
      result: "N" as const,
    };
  }
  const directionString = theSplit[3];
  if (!allDirections.includes(directionString as DirectionLetter)) {
    return {
      error: `Not a correct sortKey; ${directionString} is not a direction.`,
      result: "N" as const,
    };
  }
  return {
    result: directionString as DirectionLetter,
    error: "",
  };
};

export const gameIdFromSortKey = (sortKey: string) => {
  if (!sortKey.startsWith(gameSortKeyPrefix0)) {
    return {
      result: "",
      error: `Not a correct sortKey; ${sortKey} did not start with ${gameSortKeyPrefix0}`,
    };
  }
  const theSplit = sortKey.split("#");
  // G, gameId
  if (theSplit.length < 2) {
    return {
      result: "",
      error: `Not a correct sortKey; ${sortKey} has no hashes.`,
    };
  }
  return { result: theSplit[1], error: "" };
};

export const playerIdFromSortKey = (sortKey: string) => {
  if (!sortKey.startsWith(playerSortKeyPrefix0)) {
    return {
      result: "",
      error: `Not a correct sortKey; ${sortKey} did not start with ${playerSortKeyPrefix0}`,
    };
  }
  const theSplit = sortKey.split("#");
  // P, playerId
  if (theSplit.length < 2) {
    return {
      result: "",
      error: `Not a correct sortKey; ${sortKey} has no hashes.`,
    };
  }
  // playerIds can (and do) contain hash (#), so must rejoin them:
  return { result: theSplit.slice(1, theSplit.length).join("#"), error: "" };
};

export const tableNumberFromSortKey = (sortKey: string) => {
  if (!sortKey.startsWith(gameSortKeyPrefix0)) {
    return {
      result: 0,
      error: `Not a correct sortKey; ${sortKey} did not start with ${gameSortKeyPrefix0}`,
    };
  }
  const theSplit = sortKey.split("#");
  // G, gameId, tableNumber
  if (theSplit.length < 3) {
    return {
      result: 0,
      error: `Not a correct sortKey; ${sortKey} has < 2 hashes.`,
    };
  }
  return { result: +theSplit[2], error: "" };
};

export const boardFromSortKey = (sortKey: string) => {
  if (!sortKey.startsWith(gameSortKeyPrefix0)) {
    return {
      error: `Not a correct sortKey; ${sortKey} did not start with ${gameSortKeyPrefix0}`,
      result: 0,
    };
  }
  const theSplit = sortKey.split("#");
  // G, gameId, tableNumber, R, boardNumber
  if (theSplit.length < 5) {
    return {
      error: `Not a correct sortKey; ${sortKey} has under four hashes.`,
      result: 0,
    };
  }
  if (theSplit[3] !== resultSortKeyPrefix3) {
    return {
      error: `Not a correct sortKey; ${sortKey[3]} is not resultSortKeyPrefix3: ${resultSortKeyPrefix3}`,
      result: 0,
    };
  }
  return {
    result: +theSplit[4],
    error: "",
  };
};

export const roundFromSortKey = (sortKey: string) => {
  if (!sortKey.startsWith(gameSortKeyPrefix0)) {
    return {
      error: `Not a correct sortKey; ${sortKey} did not start with ${gameSortKeyPrefix0}`,
      result: 0,
    };
  }
  const theSplit = sortKey.split("#");
  // G, gameId, tableNumber, R, boardNumber, roundNumber
  if (theSplit.length < 6) {
    return {
      error: `Not a correct sortKey; ${sortKey} has under five hashes.`,
      result: 0,
    };
  }
  if (theSplit[3] !== resultSortKeyPrefix3) {
    return {
      error: `Not a correct sortKey; ${sortKey[3]} is not resultSortKeyPrefix3: ${resultSortKeyPrefix3}`,
      result: 0,
    };
  }
  return {
    result: +theSplit[5],
    error: "",
  };
};

export const gameItemSortKeyRegExStr = `^${gameSortKeyPrefix0}#[^#]+$`;

export const tableAssignmentItemSortKeyRegExStr = ({
  gameId = "[^#]+",
}: {
  gameId?: string;
}) => {
  return `^${gameSortKeyPrefix0}#${gameId}#\\d+$`;
};

export const boardResultItemSortKeyRegExStr = ({
  gameId = "[^#]+",
  tableNumber = "[0-9]+",
}: {
  gameId?: string;
  tableNumber?: number | string;
}) => {
  return `^${gameSortKeyPrefix0}#${gameId}#${tableNumber}#${resultSortKeyPrefix3}#[^#]+#[^#]+$`;
};
