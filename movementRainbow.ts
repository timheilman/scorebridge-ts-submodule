import type { DirectionLetter } from "./graphql/appsync.js";
import type { BoardGroupProps, PlayerNumberProps } from "./movementHelpers.js";

export const effectiveTable = ({
  round,
  table,
  tableCount,
  direction,
}: PlayerNumberProps) => {
  const roundLessOneDivThree = Math.floor((round - 1) / 3); // 1
  const roundLessOneModThree = (round - 1) % 3;
  if (roundLessOneModThree !== 0) {
    throw new Error(
      "Only intended for use with roundLessOneModThree === 0 invocations",
    );
  }
  if (direction === "N") {
    return table;
  }
  const tableLessOne = table - 1; // 0
  if (direction === "S") {
    return (
      ((tableLessOne + tableCount - roundLessOneDivThree) % tableCount) + 1
    );
  }
  if (direction === "W") {
    return ((tableLessOne + 2 * roundLessOneDivThree) % tableCount) + 1;
  }
  return (
    ((tableLessOne +
      tableCount * roundLessOneDivThree -
      2 * roundLessOneDivThree) %
      tableCount) +
    1
  );
};
function rotatedOnce(direction: DirectionLetter) {
  return direction === "N"
    ? direction
    : direction === "W"
      ? "S"
      : direction === "S"
        ? "E"
        : "W";
}

const rotatedTwice = (direction: DirectionLetter) =>
  rotatedOnce(rotatedOnce(direction));
const playerNumberRainbowTrue = (props: PlayerNumberProps): number => {
  const { round, table, tableCount, direction } = props;
  const roundLessOne = round - 1;
  if (roundLessOne === 0) {
    const multiple =
      direction === "N" ? 0 : direction === "W" ? 1 : direction === "S" ? 2 : 3;
    return table + tableCount * multiple;
  }
  const roundLessOneDivThree = Math.floor(roundLessOne / 3);
  const roundLessOneModThree = Math.floor(roundLessOne % 3);
  if (roundLessOneDivThree === 0) {
    // in the first 3 rounds: just rotations
    // roundLessOneModThree cannot be 0; then roundLessOne must === 0 and we already returned
    if (roundLessOneModThree === 1) {
      return playerNumberRainbowTrue({
        round: 1,
        table,
        tableCount,
        direction: rotatedOnce(direction),
      });
    } // else: roundLessOneModThree is 2
    return playerNumberRainbowTrue({
      round: 1,
      table,
      tableCount,
      direction: rotatedTwice(direction),
    });
  }
  // beyond first three rounds; need to determine which board and direction to recur with
  if (roundLessOneModThree === 0) {
    return playerNumberRainbowTrue({
      round: 1,
      tableCount,
      table: effectiveTable(props),
      direction,
    });
  } else if (roundLessOneModThree === 1) {
    return playerNumberRainbowTrue({
      round: round - 1,
      tableCount,
      table,
      direction: rotatedOnce(direction),
    });
  }
  return playerNumberRainbowTrue({
    round: round - 2,
    tableCount,
    table,
    direction: rotatedTwice(direction),
  });
};

const boardGroupRainbowTrue = (props: BoardGroupProps): number => {
  const { round, table, tableCount } = props;
  if (round === 0) {
    return 0;
  }
  const roundLessOne = round - 1;
  const roundLessOneDivThree = Math.floor(roundLessOne / 3);
  const roundLessOneModThree = Math.floor(roundLessOne % 3);
  const tableLessOne = table - 1;
  if (roundLessOneDivThree === 0) {
    return 1 + tableLessOne + roundLessOneModThree * tableCount;
  }
  return boardGroupRainbowTrue({
    round: round - 3,
    tableCount,
    table: ((tableLessOne + 1) % tableCount) + 1,
  });
};

const whoFollowsRainbowTwoTable = (playerNumber: number) => {
  if (playerNumber === 1) {
    return 1;
  }
  if (playerNumber === 2) {
    return 7;
  }
  if (playerNumber === 3) {
    return 8;
  }
  if (playerNumber === 4) {
    return 2;
  }
  if (playerNumber === 5) {
    return 3;
  }
  if (playerNumber === 6) {
    return 5;
  }
  if (playerNumber === 7) {
    return 6;
  }
  if (playerNumber === 8) {
    return 4;
  }

  throw new Error(`invalid playerNumber: ${playerNumber}`);
};
const playerNumberRainbowTwoTable = ({
  round,
  table,
  direction,
}: {
  round: number;
  table: number;
  direction: DirectionLetter;
}): number => {
  if (round === 1) {
    if (table === 1) {
      if (direction === "N") {
        return 1;
      }
      if (direction === "W") {
        return 3;
      }
      if (direction === "S") {
        return 5;
      }
      // if (direction === "E") {
      return 7;
      // }
    } else {
      return playerNumberRainbowTwoTable({ table: 1, direction, round }) + 1;
    }
  }
  return whoFollowsRainbowTwoTable(
    playerNumberRainbowTwoTable({ table, direction, round: round - 1 }),
  );
};

const boardGroupRainbowTwoTable = ({ round }: { round: number }) =>
  ((round - 1) % 7) + 1;

export const boardGroupRainbow = (props: BoardGroupProps) => {
  const { tableCount } = props;
  if (tableCount === 2) {
    return boardGroupRainbowTwoTable(props);
  } else {
    return boardGroupRainbowTrue(props);
  }
};

export const playerNumberRainbow = (props: PlayerNumberProps) => {
  const { tableCount } = props;
  return tableCount === 2
    ? playerNumberRainbowTwoTable(props)
    : playerNumberRainbowTrue(props);
};
