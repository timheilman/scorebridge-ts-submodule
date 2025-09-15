import { DateTime } from "luxon";

import {
  allDirections,
  allDoublings,
  allDownResults,
  allLevels,
  allMadeResults,
  allMovements,
  allRanks,
  allResults,
  allStrains,
  allSuits,
  allWonTrickCounts,
} from "./bridgeEnums.js";
import type {
  BoardResultUc,
  BoardResultUcl,
  BoardResultUl,
  DownResult,
  Level,
  MadeResult,
  Result,
  WonTrickCount,
} from "./bridgeEnums.js";
import type {
  DirectionLetter,
  Doubling,
  Movement,
  Rank,
  Strain,
  Suit,
} from "./graphql/appsync.js";

class BoardResultTypeUnsafe extends Error {}

// const uTypeSafetyProblemBoardResult = (
//   br?: BoardResultU,
// ): string | undefined => {
//   if (!br) {
//     return "board result is undefined";
//   }
//   if (br.type === "PASSED_OUT" || br.type === "NOT_BID_NOT_PLAYED") {
//     return;
//   }
//   const problems = [
//     tspLevel(br.level),
//     tspStrain(br.strain),
//     tspDoubling(br.doubling),
//     tspDirectionLetter(br.declarer),
//     tspRank(br.leadRank),
//     tspSuit(br.leadSuit),
//     tspWonTrickCount(br.wonTrickCount),
//   ].filter((p) => p);
//   if (problems.length > 0) {
//     return `PLAYED board result has problems: ${problems.join(", ")}`;
//   }
//   return;
// };

// const uTypeSafetyProblemTableAssignment = (
//   ta?: TableAssignmentU,
// ): string | undefined => {
//   if (!ta) {
//     return "table assignment is undefined";
//   }
//   const problems = [
//     tspRound(ta.round),
//     tspBoolean(ta.confirmed),
//     tspBoolean(ta.roundWelcomeConfirmed),
//   ].filter((p) => p);
//   if (problems.length > 0) {
//     return `table assignment has problems: ${problems.join(", ")}`;
//   }
//   return;
// };

// const reduceToRequiredFieldsBoardResult = (
//   br: BoardResultUt,
// ): BoardResultUt => {
//   if (br.type === "PASSED_OUT" || br.type === "NOT_BID_NOT_PLAYED") {
//     return { type: br.type };
//   }
//   return {
//     type: br.type,
//     level: br.level,
//     strain: br.strain,
//     doubling: br.doubling,
//     declarer: br.declarer,
//     leadRank: br.leadRank,
//     leadSuit: br.leadSuit,
//     wonTrickCount: br.wonTrickCount,
//   };
// };

// const reduceToRequiredFieldsTableAssignment = (
//   ta: TableAssignmentUvt,
// ): TableAssignmentUvt => {
//   return {
//     clubDeviceId: ta.clubDeviceId,
//     confirmed: ta.confirmed,
//     round: ta.round,
//     roundWelcomeConfirmed: ta.roundWelcomeConfirmed,
//     results: ta.results,
//     playerAssignments: ta.playerAssignments,
//   };
// };

// export const ucToUctBoardResult = (br?: BoardResultUc): BoardResultUct => {
//   const problem = uTypeSafetyProblemBoardResult(br);
//   if (problem) {
//     throw new BoardResultTypeUnsafe(problem);
//   }
//   const boardResultUt = reduceToRequiredFieldsBoardResult(br as BoardResultUt);
//   if (!br) {
//     // dead code; just to satisfy the type checker that br is defined
//     throw new BoardResultTypeUnsafe("board result is undefined");
//   }
//   if (!DateTime.fromISO(br.currentAsOf).isValid) {
//     throw new BoardResultTypeUnsafe(
//       `currentAsOf ${br.currentAsOf} is not a valid ISO DateTime`,
//     );
//   }
//   return { ...boardResultUt, currentAsOf: br.currentAsOf };
// };

export const ucToUclBoardResult = (br: BoardResultUc): BoardResultUcl => {
  const boardResultUl = reduceToLooseFieldsBoardResult(br as BoardResultUl);
  if (!DateTime.fromISO(br.currentAsOf).isValid) {
    throw new BoardResultTypeUnsafe(
      `currentAsOf ${br.currentAsOf} is not a valid ISO DateTime`
    );
  }
  return { ...boardResultUl, currentAsOf: br.currentAsOf };
};

// export const uToUtBoardResult = (
//   br: BoardResultU,
// ): BoardResultUt | undefined => {
//   const problem = uTypeSafetyProblemBoardResult(br);
//   if (problem) {
//     return;
//   }
//   return reduceToRequiredFieldsBoardResult(br as BoardResultUt);
// };

export const reduceToLooseFieldsBoardResult = (
  br: BoardResultUl
): BoardResultUl => {
  if (br.type === "PASSED_OUT" || br.type === "NOT_BID_NOT_PLAYED") {
    return { type: br.type, confirmed: br.confirmed };
  }
  return {
    type: br.type,
    level: br.level,
    strain: br.strain,
    doubling: br.doubling,
    declarer: br.declarer,
    leadRank: br.leadRank,
    leadSuit: br.leadSuit,
    wonTrickCount: br.wonTrickCount,
    confirmed: br.confirmed,
  };
};

// export const uvToUvtTableAssignment = (
//   ta: TableAssignmentUv,
// ): TableAssignmentUvt | undefined => {
//   const problem = uTypeSafetyProblemTableAssignment(ta);
//   if (problem) {
//     return;
//   }
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const { clearClubDeviceId, ...taRemainder } = ta;
//   return reduceToRequiredFieldsTableAssignment(
//     taRemainder as TableAssignmentUvt,
//   );
// };

const typeSafetyError = (problem?: string): undefined => {
  if (problem) {
    throw new BoardResultTypeUnsafe(problem);
  }
  return;
};

// tsp for type safety problem
const tspLevel = (level?: number | null): string | undefined => {
  if (!allLevels.includes(level as Level)) {
    return `unexpected level ${level}`;
  }
  return;
};
export const typeSafeLevel = (level?: number): Level => {
  typeSafetyError(tspLevel(level));
  return level as Level;
};

const tspMadeResult = (madeResult?: number | null): string | undefined => {
  if (!allMadeResults.includes(madeResult as MadeResult)) {
    return `unexpected madeResult ${madeResult}`;
  }
  return;
};
export const typeSafeMadeResult = (madeResult?: number): MadeResult => {
  typeSafetyError(tspMadeResult(madeResult));
  return madeResult as MadeResult;
};

const tspDownResult = (downResult?: number | null): string | undefined => {
  if (!allDownResults.includes(downResult as DownResult)) {
    return `unexpected downResult ${downResult}`;
  }
  return;
};
export const typeSafeDownResult = (downResult?: number): DownResult => {
  typeSafetyError(tspDownResult(downResult));
  return downResult as DownResult;
};

const tspResult = (result?: number | null): string | undefined => {
  if (!allResults.includes(result as Result)) {
    return `unexpected result ${result}`;
  }
  return;
};
export const typeSafeResult = (result?: number): Result => {
  typeSafetyError(tspResult(result));
  return result as Result;
};

const tspStrain = (strain?: string | null): string | undefined => {
  if (!allStrains.includes(strain as Strain)) {
    return `unexpected strain ${strain}`;
  }
  return;
};
export const typeSafeStrain = (strain?: string): Strain => {
  typeSafetyError(tspStrain(strain));
  return strain as Strain;
};

const tspDoubling = (doubling?: string | null): string | undefined => {
  if (!allDoublings.includes(doubling as Doubling)) {
    return `unexpected doubling ${doubling}`;
  }
  return;
};
export const typeSafeDoubling = (doubling?: string): Doubling => {
  typeSafetyError(tspDoubling(doubling));
  return doubling as Doubling;
};

const tspDirectionLetter = (direction?: string | null): string | undefined => {
  if (!allDirections.includes(direction as DirectionLetter)) {
    return `unexpected direction ${direction}`;
  }
  return;
};
export const typeSafeDirectionLetter = (
  direction?: string
): DirectionLetter => {
  typeSafetyError(tspDirectionLetter(direction));
  return direction as DirectionLetter;
};

const tspRank = (rank?: string | null): string | undefined => {
  if (!allRanks.includes(rank as Rank)) {
    return `unexpected rank ${rank}`;
  }
  return;
};
export const typeSafeRank = (rank?: string): Rank => {
  typeSafetyError(tspRank(rank));
  return rank as Rank;
};

const tspSuit = (suit?: string | null): string | undefined => {
  if (!allSuits.includes(suit as Suit)) {
    return `unexpected suit ${suit}`;
  }
  return;
};
export const typeSafeSuit = (suit?: string): Suit => {
  typeSafetyError(tspSuit(suit));
  return suit as Suit;
};

const tspWonTrickCount = (
  wonTrickCount?: number | null
): string | undefined => {
  if (!allWonTrickCounts.includes(wonTrickCount as WonTrickCount)) {
    return `unexpected wonTrickCount ${wonTrickCount}`;
  }
  return;
};
export const typeSafeWonTrickCount = (wonTrickCount?: number) => {
  typeSafetyError(tspWonTrickCount(wonTrickCount));
  return wonTrickCount as WonTrickCount;
};

const tspMovement = (movement?: string | null): string | undefined => {
  if (!allMovements.includes(movement as Movement)) {
    return `unexpected movement ${movement}`;
  }
  return;
};
export const typeSafeMovement = (movement?: string) => {
  typeSafetyError(tspMovement(movement));
  return movement as Movement;
};

const tspBoolean = (aBoolean?: boolean | null): string | undefined => {
  if (aBoolean === undefined) {
    return "boolean is undefined";
  }
  if (aBoolean === null) {
    return "boolean is null";
  }
  return;
};
export const typeSafeConfirmed = (confirmed?: boolean) => {
  typeSafetyError(tspBoolean(confirmed));
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return confirmed!;
};

const tspRound = (round?: number | null): string | undefined => {
  if (round === undefined) {
    return "round is undefined";
  }
  if (round === null) {
    return "round is null";
  }
  if (Math.floor(round) !== round || Math.ceil(round) !== round) {
    return `round ${round} is not an integer`;
  }
  if (round < 0) {
    return `round ${round} is negative`;
  }
  return;
};
export const typeSafeRound = (round?: number) => {
  typeSafetyError(tspRound(round));
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return round!;
};
