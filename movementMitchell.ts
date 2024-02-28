import { BoardGroupProps, PlayerNumberProps } from "./movementHelpers";

export const playerNumberMitchell = (props: PlayerNumberProps): number => {
  const { table, tableCount, direction, round } = props;
  if (direction === "N") {
    return 2 * table - 1;
  }
  if (direction === "S") {
    return 2 * table;
  }
  // standard mitchell movement
  const roundLessOne = round - 1;
  const tableLessOne = table - 1;
  if (direction === "E") {
    const ewPartnershipNumber =
      ((tableLessOne + tableCount - roundLessOne) % tableCount) + 1;
    const partnershipNumber = ewPartnershipNumber + tableCount;
    return partnershipNumber * 2 - 1;
  }
  return playerNumberMitchell({ ...props, direction: "E" }) + 1;
};

function boardGroupMitchellOdd(props: BoardGroupProps) {
  const { round, table, tableCount } = props;
  const roundLessOne = round - 1;
  const tableLessOne = table - 1;
  return ((roundLessOne + tableLessOne) % tableCount) + 1;
}

function boardGroupMitchellEven(props: BoardGroupProps) {
  const { table, tableCount } = props;
  if (table === 1) {
    // table 2 always shares boards with table 1 in even mitchell:
    return boardGroupMitchellEven({ ...props, table: 2 });
  }
  // otherwise, behaves identically to odd but with add'l bye stand table
  const byeNumber = tableCount / 2 + 2;
  return boardGroupMitchellOdd({
    ...props,
    table: table < byeNumber ? table - 1 : table,
  });
}

export const boardGroupMitchell = (props: BoardGroupProps): number => {
  if (props.tableCount % 2 === 1) {
    return boardGroupMitchellOdd(props);
  } else {
    return boardGroupMitchellEven(props);
  }
};
