export const clubSortKeyPrefix0 = "C";
export const clubDeviceSortKeyPrefix0 = "D";
export const gameSortKeyPrefix0 = "G";
export const userSortKeyPrefix0 = "U";

export const clubDeviceIdFromSortKey = (sortKey: string) => {
  if (!sortKey.startsWith(clubDeviceSortKeyPrefix0)) {
    return `Not a clubDeviceItem sortKey; ${sortKey} did not start with ${clubDeviceSortKeyPrefix0}`;
  }
  const theSplit = sortKey.split("#");
  // G, gameId, tableNumber, direction
  if (theSplit.length < 2) {
    return `Not a correct sortKey; ${sortKey} has no hashes.`;
  }
  return theSplit[1];
};

export const directionLetterFromSortKey = (sortKey: string) => {
  if (!sortKey.startsWith(gameSortKeyPrefix0)) {
    return `Not a correct sortKey; ${sortKey} did not start with ${gameSortKeyPrefix0}`;
  }
  const theSplit = sortKey.split("#");
  // G, gameId, tableNumber, direction
  if (theSplit.length < 4) {
    return `Not a correct sortKey; ${sortKey} has under three hashes.`;
  }
  return theSplit[3];
};

export const gameIdFromSortKey = (sortKey: string) => {
  if (!sortKey.startsWith(gameSortKeyPrefix0)) {
    return `Not a correct sortKey; ${sortKey} did not start with ${gameSortKeyPrefix0}`;
  }
  const theSplit = sortKey.split("#");
  // G, gameId
  if (theSplit.length < 2) {
    return `Not a correct sortKey; ${sortKey} has no hashes.`;
  }
  return theSplit[1];
};

export const tableNumberFromSortKey = (sortKey: string) => {
  if (!sortKey.startsWith(gameSortKeyPrefix0)) {
    return 0;
  }
  const theSplit = sortKey.split("#");
  // G, gameId, tableNumber
  if (theSplit.length < 3) {
    return 0;
  }
  return +theSplit[2];
};
