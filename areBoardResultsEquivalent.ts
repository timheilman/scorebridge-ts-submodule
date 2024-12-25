import { BoardResult, Doubling } from "./graphql/appsync";

export const maybeConvertResultToFalsy = (
  br?: Omit<BoardResult, "round" | "board"> | null,
) => {
  if (br === null || br === undefined) {
    return br;
  }
  if (
    !br.level &&
    !br.strain &&
    !br.declarer &&
    !br.leadRank &&
    !br.leadSuit &&
    !br.wonTrickCount &&
    !br.doubling
  ) {
    return null;
  }
  // br.type of PASSED_OUT is not effectively null
  // br.type of null or undefined means depend on the other fields
  return br;
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
    (item1 === null || item1 === undefined) &&
    (item2 === null || item2 === undefined)
  ) {
    return true;
  }
  return item1 === item2;
};

export const areBoardResultsEquivalent = (
  br1?: Omit<BoardResult, "round" | "board"> | null,
  br2?: Omit<BoardResult, "round" | "board"> | null,
) => {
  const solidBr1 = maybeConvertResultToFalsy(br1);
  const solidBr2 = maybeConvertResultToFalsy(br2);
  if (!solidBr1 && !solidBr2) {
    return true;
  }
  if (!solidBr1 || !solidBr2) {
    return false;
  }
  // from here, we know that neither br1 nor br2 is effectively null,
  // meaning not bid, not played
  if (solidBr1.type === "PASSED_OUT" && solidBr2.type === "PASSED_OUT") {
    return true;
  }
  // type is fully handled.  Now let's handle doubling:
  if (!coalesceDoublingEq(solidBr1.doubling, solidBr2.doubling)) {
    return false;
  }
  // doubling is fully handled.  Now the easy ones:
  return (
    coalesceEq(solidBr1.level, solidBr2.level) &&
    coalesceEq(solidBr1.strain, solidBr2.strain) &&
    coalesceEq(solidBr1.declarer, solidBr2.declarer) &&
    coalesceEq(solidBr1.leadRank, solidBr2.leadRank) &&
    coalesceEq(solidBr1.leadSuit, solidBr2.leadSuit) &&
    coalesceEq(solidBr1.wonTrickCount, solidBr2.wonTrickCount)
  );
};
