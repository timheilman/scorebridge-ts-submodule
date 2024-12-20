import {
  BoardResult,
  Player,
  PlayerAssignment,
  Strain,
  TableAssignment,
} from "./graphql/appsync";

// We cannot take the types from these enumerations, because they are generated
// from the graphql
export const allLevels = [1, 2, 3, 4, 5, 6, 7] as const;
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
export type UnkeyedTableAssignment = Omit<TableAssignment, "tableNumber">;
export type UnkeyedPlayerAssignment = Omit<PlayerAssignment, "directionLetter">;
export type UnkeyedBoardResult = Omit<BoardResult, "board" | "round">;
export type UnkeyedPlayer = Omit<Player, "playerId">;
