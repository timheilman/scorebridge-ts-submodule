import { BoardResult, Doubling } from "./graphql/appsync";

const effectivelyNull = (br: Omit<BoardResult, "round" | "board">) => {
  if (br === null || br === undefined) {
    return true;
  }
  if (br.type === "NOT_BID_NOT_PLAYED") {
    // deprecated
    return true;
  }
  if (
    !br.level &&
    !br.strain &&
    !br.declarer &&
    !br.leadRank &&
    !br.leadSuit &&
    !br.result &&
    (!br.doubling || br.doubling === "NONE") // deprecated
  ) {
    return true;
  }
  // type of either PASSED_OUT is not effectively null
  // type of PLAYED, undefined, or null depends on last condtional
  return false;
};

const coalesceEq = (item1: unknown, item2: unknown) => {
  if (
    (item1 === null || item1 === undefined) &&
    (item2 === null || item2 === undefined)
  ) {
    return true;
  }
  return item1 === item2;
};

const coalesceDoublingEq = (
  item1: Doubling | null | undefined,
  item2: Doubling | null | undefined,
) => {
  if (
    (item1 === null || item1 === undefined || item1 === "NONE") &&
    (item2 === null || item2 === undefined || item2 === "NONE")
  ) {
    return true;
  }
  return item1 === item2;
};

export const areBoardResultsEquivalent = (
  br1: Omit<BoardResult, "round" | "board">,
  br2: Omit<BoardResult, "round" | "board">,
) => {
  if (effectivelyNull(br1) && effectivelyNull(br2)) {
    return true;
  }
  if (effectivelyNull(br1) || effectivelyNull(br2)) {
    return false;
  }
  // from here, we know that neither br1 nor br2 is effectively null,
  // which covers NOT_BID_NOT_PLAYED
  if (br1.type === "PASSED_OUT" && br1.type === "PASSED_OUT") {
    return true;
  }
  // type is fully handled.  Now let's handle doubling:
  if (!coalesceDoublingEq(br1.doubling, br2.doubling)) {
    return false;
  }
  // doubling is fully handled.  Now the easy ones:
  return (
    coalesceEq(br1.level, br2.level) &&
    coalesceEq(br1.strain, br2.strain) &&
    coalesceEq(br1.declarer, br2.declarer) &&
    coalesceEq(br1.leadRank, br2.leadRank) &&
    coalesceEq(br1.leadSuit, br2.leadSuit) &&
    coalesceEq(br1.result, br2.result)
  );
};
