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
  BoardResultU,
  BoardResultUc,
  BoardResultUct,
  BoardResultUt,
  DownResult,
  Level,
  MadeResult,
  playedBoardRequiredFields,
  Result,
  WonTrickCount,
} from "./bridgeEnums";
import {
  DirectionLetter,
  Doubling,
  Movement,
  Rank,
  Strain,
  Suit,
} from "./graphql/appsync";

class BoardResultTypeUnsafe extends Error {}

const uTypeSafetyProblem = (br?: BoardResultU): string | undefined => {
  if (!br) {
    return "UC board result is undefined";
  }
  if (br.type === "PASSED_OUT" || br.type === "NOT_BID_NOT_PLAYED") {
    if (
      playedBoardRequiredFields.some((key) => br[key]) ||
      br.wonTrickCount === 0
    ) {
      return `UC ${br.type} board result has unexpected fields`;
    }
  }
  if (br.type === "PLAYED") {
    if (!allLevels.includes(br.level as Level)) {
      return `UC PLAYED board result unexpected level ${br.level ?? "undefined"}`;
    }
    if (!allWonTrickCounts.includes(br.wonTrickCount as WonTrickCount)) {
      return `UC PLAYED board result unexpected wonTrickCount ${br.wonTrickCount ?? "undefined"}`;
    }
    const remainingRequiredSettings = [
      "strain",
      "doubling",
      "declarer",
      "leadRank",
      "leadSuit",
    ] as const;
    if (remainingRequiredSettings.some((key) => !br[key])) {
      return `PLAYED board is missing required settings: ${JSON.stringify(
        remainingRequiredSettings.filter(
          (requiredSetting) => !br[requiredSetting],
        ),
      )}`;
    }
  }
  return;
};

export const ucToUct = (br?: BoardResultUc): BoardResultUct => {
  const problem = uTypeSafetyProblem(br);
  if (problem) {
    throw new BoardResultTypeUnsafe(problem);
  }
  return br as BoardResultUct;
};

export const uToUt = (br: BoardResultU): BoardResultUt | undefined => {
  const problem = uTypeSafetyProblem(br);
  if (problem) {
    return;
  }
  return br as BoardResultUt;
};

export const typeSafeLevel = (level?: number | "(none)"): Level => {
  if (!allLevels.includes(level as Level)) {
    throw new Error(`unexpected level ${level}`);
  }
  return level as Level;
};

export const typeSafeMadeResult = (madeResult?: number): MadeResult => {
  if (!allMadeResults.includes(madeResult as MadeResult)) {
    throw new Error(`unexpected madeResult ${madeResult}`);
  }
  return madeResult as MadeResult;
};
export const typeSafeDownResult = (downResult?: number): DownResult => {
  if (!allDownResults.includes(downResult as DownResult)) {
    throw new Error(`unexpected downResult ${downResult}`);
  }
  return downResult as DownResult;
};

export const typeSafeResult = (result?: number): Result => {
  if (!allResults.includes(result as Result)) {
    throw new Error(`unexpected result ${result}`);
  }
  return result as Result;
};

export const typeSafeStrain = (strain?: string): Strain => {
  if (!allStrains.includes(strain as Strain)) {
    throw new Error(`unexpected strain ${strain}`);
  }
  return strain as Strain;
};

export const typeSafeDoubling = (doubling?: string): Doubling => {
  if (!allDoublings.includes(doubling as Doubling)) {
    throw new Error(`unexpected doubling ${doubling}`);
  }
  return doubling as Doubling;
};

export const typeSafeDirectionLetter = (
  direction?: string,
): DirectionLetter => {
  if (!allDirections.includes(direction as DirectionLetter)) {
    throw new Error(`unexpected direction ${direction}`);
  }
  return direction as DirectionLetter;
};

export const typeSafeRank = (rank?: string): Rank => {
  if (!allRanks.includes(rank as Rank)) {
    throw new Error(`unexpected rank ${rank}`);
  }
  return rank as Rank;
};

export const typeSafeSuit = (suit?: string): Suit => {
  if (!allSuits.includes(suit as Suit)) {
    throw new Error(`unexpected suit ${suit}`);
  }
  return suit as Suit;
};

export const typeSafeWonTrickCount = (wonTrickCount?: number) => {
  if (!allWonTrickCounts.includes(wonTrickCount as WonTrickCount)) {
    throw new Error(`unexpected wonTrickCount ${wonTrickCount}`);
  }
  return wonTrickCount as WonTrickCount;
};

export const typeSafeMovement = (movement?: string) => {
  if (!allMovements.includes(movement as Movement)) {
    throw new Error(`unexpected movement ${movement}`);
  }
  return movement as Movement;
};
