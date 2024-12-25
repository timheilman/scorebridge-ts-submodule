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

// These cannot be made into GraphQL enums, because they are subsets of the integers
// and so must be validated in the resolvers instead
export const allLevels = [1, 2, 3, 4, 5, 6, 7] as const;
export const allWonTrickCounts = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
] as const;
export type Level = (typeof allLevels)[number];
export type WonTrickCount = (typeof allWonTrickCounts)[number];

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
