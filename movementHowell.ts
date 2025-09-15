import type { BoardGroupProps, PlayerNumberProps } from "./movementHelpers.js";
import { tsSubmoduleLogFn } from "./tsSubmoduleLog.js";
const log = tsSubmoduleLogFn("movementHowell.");
export const playerNumberHowell = (props: PlayerNumberProps): number => {
  const { tableCount } = props;
  if (tableCount === 3) {
    return playerNumberHowell3(props);
  }
  if (tableCount === 4) {
    return playerNumberHowell4(props);
  }
  if (tableCount === 5) {
    return playerNumberHowell5(props);
  }
  if (tableCount === 6) {
    return playerNumberHowell6(props);
  }
  throw new Error(`${tableCount}-table Howell movement is not implemented`);
};

interface WhoFollowsHowell {
  playerNumber: number;
  tableCount: number;
}
const whoFollowsHowell = ({ playerNumber, tableCount }: WhoFollowsHowell) => {
  const movingPlayerCount = 4 * tableCount - 2;
  if (playerNumber > movingPlayerCount) {
    return playerNumber;
  }
  const playerNumberLessOne = playerNumber - 1;
  return ((playerNumberLessOne + 2) % movingPlayerCount) + 1;
};

const playerNumberHowell3 = (props: PlayerNumberProps): number => {
  log("playerNumberHowell3", "debug", { props });
  const { round, direction, table } = props;
  if (round <= 1) {
    if (direction === "N") {
      if (table === 1) {
        return 11;
      }
      if (table === 2) {
        return 5;
      }
      return 9;
    }
    if (direction === "S") {
      return playerNumberHowell3({ ...props, direction: "N" }) + 1;
    }
    if (direction === "W") {
      return playerNumberHowell3({ ...props, direction: "E" }) + 1;
    }
    // if (direction === "E") {
    if (table === 1) {
      return 1;
    }
    if (table === 2) {
      return 7;
    }
    return 3;
    // }
  }
  return whoFollowsHowell({
    ...props,
    playerNumber: playerNumberHowell3({ ...props, round: round - 1 }),
  });
};
const playerNumberHowell4 = (props: PlayerNumberProps): number => {
  const { round, direction, table } = props;
  if (round <= 1) {
    if (direction === "N") {
      if (table === 1) {
        return 15;
      }
      if (table === 2) {
        return 11;
      }
      if (table === 3) {
        return 13;
      }
      return 7;
    }
    if (direction === "S") {
      return playerNumberHowell4({ ...props, direction: "N" }) + 1;
    }
    if (direction === "W") {
      return playerNumberHowell4({ ...props, direction: "E" }) + 1;
    }
    // if (direction === "E") {
    if (table === 1) {
      return 1;
    }
    if (table === 2) {
      return 5;
    }
    if (table === 3) {
      return 3;
    }
    return 9;
    // }
  }
  return whoFollowsHowell({
    ...props,
    playerNumber: playerNumberHowell4({ ...props, round: round - 1 }),
  });
};
const playerNumberHowell5 = (props: PlayerNumberProps): number => {
  const { round, direction, table } = props;
  if (round <= 1) {
    if (direction === "N") {
      if (table === 1) {
        return 13;
      }
      if (table === 2) {
        return 9;
      }
      if (table === 3) {
        return 19;
      }
      if (table === 4) {
        return 17;
      }
      return 7;
    }
    if (direction === "S") {
      return playerNumberHowell5({ ...props, direction: "N" }) + 1;
    }
    if (direction === "W") {
      return playerNumberHowell5({ ...props, direction: "E" }) + 1;
    }
    // if (direction === "E") {
    if (table === 1) {
      return 5;
    }
    if (table === 2) {
      return 3;
    }
    if (table === 3) {
      return 1;
    }
    if (table === 4) {
      return 15;
    }
    return 11;
    // }
  }
  return whoFollowsHowell({
    ...props,
    playerNumber: playerNumberHowell5({ ...props, round: round - 1 }),
  });
};
const playerNumberHowell6 = (props: PlayerNumberProps): number => {
  const { round, direction, table } = props;
  if (round <= 1) {
    if (direction === "N") {
      if (table === 1) {
        return 17;
      }
      if (table === 2) {
        return 5;
      }
      if (table === 3) {
        return 15;
      }
      if (table === 4) {
        return 13;
      }
      if (table === 5) {
        return 23;
      }
      return 21;
    }
    if (direction === "S") {
      return playerNumberHowell6({ ...props, direction: "N" }) + 1;
    }
    if (direction === "W") {
      return playerNumberHowell6({ ...props, direction: "E" }) + 1;
    }
    // if (direction === "E") {
    if (table === 1) {
      return 9;
    }
    if (table === 2) {
      return 3;
    }
    if (table === 3) {
      return 19;
    }
    if (table === 4) {
      return 7;
    }
    if (table === 5) {
      return 1;
    }
    return 11;
    // }
  }
  return whoFollowsHowell({
    ...props,
    playerNumber: playerNumberHowell6({ ...props, round: round - 1 }),
  });
};

export const boardGroupHowell = (props: BoardGroupProps): number => {
  const { tableCount } = props;
  if (tableCount === 3) {
    return boardGroupHowell3(props);
  }
  if (tableCount === 4) {
    return boardGroupHowell4(props);
  }
  if (tableCount === 5) {
    return boardGroupHowell5(props);
  }
  if (tableCount === 6) {
    return boardGroupHowell6(props);
  }
  throw new Error(`${tableCount}-table Howell movement is not implemented`);
};

export const boardGroupHowell3 = (props: BoardGroupProps): number => {
  const { round, table } = props;
  if (round === 1) {
    if (table === 1) {
      return 1;
    }
    if (table === 2) {
      return 2;
    }
    return 4;
  }
  if (round === 2) {
    if (table === 1) {
      return 2;
    }
    if (table === 2) {
      return 3;
    }
    return 4;
  }
  if (round === 3) {
    if (table === 1) {
      return 3;
    }
    if (table === 2) {
      return 2;
    }
    return 1;
  }
  if (round === 4) {
    if (table === 1) {
      return 4;
    }
    if (table === 2) {
      return 3;
    }
    return 1;
  }
  return 5; // sharing in round 5
};

export const boardGroupHowell4 = (props: BoardGroupProps): number => {
  const { round, table } = props;
  const roundLessOne = round - 1;
  if (table === 1) {
    return round; // === ((roundLessOne + 0) % 7) + 1
  }
  if (table === 2) {
    return ((roundLessOne + 3) % 7) + 1;
  }
  if (table === 3) {
    return ((roundLessOne + 5) % 7) + 1;
  }
  return ((roundLessOne + 6) % 7) + 1;
};

export const boardGroupHowell5 = (props: BoardGroupProps): number => {
  const { round, table } = props;
  const roundLessOne = round - 1;
  if (table === 1) {
    return round; // === ((roundLessOne + 0) % 9) + 1
  }
  if (table === 2) {
    return ((roundLessOne + 1) % 9) + 1;
  }
  if (table === 3) {
    return ((roundLessOne + 2) % 9) + 1;
  }
  if (table === 4) {
    return ((roundLessOne + 3) % 9) + 1;
  }
  return ((roundLessOne + 4) % 9) + 1;
};

export const boardGroupHowell6 = (props: BoardGroupProps): number => {
  const { round, table } = props;
  const roundLessOne = round - 1;
  if (table === 1) {
    return round; // === ((roundLessOne + 0) % 9) + 1
  }
  if (table === 2) {
    return ((roundLessOne + 1) % 11) + 1;
  }
  if (table === 3) {
    return ((roundLessOne + 2) % 11) + 1;
  }
  if (table === 4) {
    return ((roundLessOne + 4) % 11) + 1;
  }
  if (table === 5) {
    return ((roundLessOne + 5) % 11) + 1;
  }
  return ((roundLessOne + 7) % 11) + 1;
};
