import {
  BoardResult,
  DirectionLetter,
  Doubling,
  Player,
  PlayerAssignment,
  Rank,
  Strain,
  Suit,
  TableAssignment,
} from "./graphql/appsync";

// We cannot take the types from these enumerations, because they are generated
// from the graphql
export const allSuits = ["C", "D", "H", "S"] as const;
export const allStrains = [...allSuits, "NT"] as const;
export const allDoublings = ["NONE", "DOUBLE", "REDOUBLE"] as const;
export const allRanks = [
  "TWO",
  "THREE",
  "FOUR",
  "FIVE",
  "SIX",
  "SEVEN",
  "EIGHT",
  "NINE",
  "TEN",
  "JACK",
  "QUEEN",
  "KING",
  "ACE",
] as const;
export const allDirections = ["N", "W", "E", "S"] as const;
export const allMovements = ["MITCHELL", "HOWELL", "RAINBOW"] as const;

// These cannot be made into GraphQL enums, because they are subsets of the integers
// and so must be validated in the resolvers instead
export const allLevels = [1, 2, 3, 4, 5, 6, 7] as const;
export const allWonTrickCounts = [
  13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0,
] as const;
export type Level = (typeof allLevels)[number];
export type WonTrickCount = (typeof allWonTrickCounts)[number];
export const allMadeResults = [1, 2, 3, 4, 5, 6, 7] as const;
export const allDownResults = [
  -13, -12, -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1,
] as const;
export const allResults = [...allMadeResults, ...allDownResults] as const;
export type MadeResult = (typeof allMadeResults)[number];
export type DownResult = (typeof allDownResults)[number];
export type Result = MadeResult | DownResult;

export const wonTrickCountToResult = ({
  wonTrickCount,
  level,
}: {
  wonTrickCount: WonTrickCount;
  level: Level;
}): Result =>
  (wonTrickCount >= level + 6
    ? wonTrickCount - 6
    : wonTrickCount - level - 6) as Result;
export const resultToWonTrickCount = ({
  result,
  level,
}: {
  result: Result;
  level: Level;
}) => {
  if (result > 0 && result < level) {
    throw new Error(`result ${result} is not possible for level ${level}`);
  }
  return (result > 0 ? result + 6 : result + level + 6) as WonTrickCount;
};
export const possibleResults = (level: Level): Result[] =>
  allWonTrickCounts.map((wonTrickCount) =>
    wonTrickCountToResult({ wonTrickCount, level }),
  );

// these are the values whereas keys are stored as part of the sortKey
export type UnkeyedTableAssignment = Omit<TableAssignment, "tableNumber">;
export type UnkeyedPlayerAssignment = Omit<PlayerAssignment, "directionLetter">;
export type UnkeyedBoardResult = Omit<BoardResult, "board" | "round">;
export type UnkeyedPlayer = Omit<Player, "playerId">;

// the rules for board and round integers relative to movement, roundCount, and boardsPerRound
// are too complicated to be put into the type system, so they are validated in the resolvers
interface BoardAndRound {
  board: number;
  round: number;
}
export type UnkeyedTypeSafeBoardResult =
  | { __typename?: "TypeSafeBoardResult"; type: "PASSED_OUT" }
  | { __typename?: "TypeSafeBoardResult"; type: "NOT_BID_NOT_PLAYED" }
  | {
      __typename?: "TypeSafeBoardResult";
      type: "PLAYED";
      strain: Strain;
      declarer: DirectionLetter;
      doubling: Doubling;
      leadRank: Rank;
      leadSuit: Suit;
      level: Level;
      wonTrickCount: WonTrickCount;
    };

export type TypeSafeBoardResult = BoardAndRound & UnkeyedTypeSafeBoardResult;
export const playedBoardRequiredFields = [
  "level",
  "strain",
  "doubling",
  "declarer",
  "leadRank",
  "leadSuit",
  "wonTrickCount",
] as const;
export type StagedBoardResult =
  | { type: "NOT_BID_NOT_PLAYED" }
  | { type: "PASSED_OUT" }
  | {
      type: "PLAYED";
      level?: Level;
      strain?: Strain;
      doubling?: Doubling;
      declarer?: DirectionLetter;
      leadRank?: Rank;
      leadSuit?: Suit;
      wonTrickCount?: WonTrickCount;
    };
