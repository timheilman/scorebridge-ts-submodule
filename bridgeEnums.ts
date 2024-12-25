import {
  BoardResult,
  DiscriminatedBoardResult,
  Player,
  PlayerAssignment,
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
const allResults = [
  -13, -12, -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7,
] as const;
export type Level = (typeof allLevels)[number];
const allLevelsAndResults = [
  { level: 1, result: -7 },
  { level: 1, result: -6 },
  { level: 1, result: -5 },
  { level: 1, result: -4 },
  { level: 1, result: -3 },
  { level: 1, result: -2 },
  { level: 1, result: -1 },
  { level: 1, result: 1 },
  { level: 1, result: 2 },
  { level: 1, result: 3 },
  { level: 1, result: 4 },
  { level: 1, result: 5 },
  { level: 1, result: 6 },
  { level: 1, result: 7 },
  { level: 2, result: -8 },
  { level: 2, result: -7 },
  { level: 2, result: -6 },
  { level: 2, result: -5 },
  { level: 2, result: -4 },
  { level: 2, result: -3 },
  { level: 2, result: -2 },
  { level: 2, result: -1 },
  { level: 2, result: 2 },
  { level: 2, result: 3 },
  { level: 2, result: 4 },
  { level: 2, result: 5 },
  { level: 2, result: 6 },
  { level: 2, result: 7 },
  { level: 3, result: -9 },
  { level: 3, result: -8 },
  { level: 3, result: -7 },
  { level: 3, result: -6 },
  { level: 3, result: -5 },
  { level: 3, result: -4 },
  { level: 3, result: -3 },
  { level: 3, result: -2 },
  { level: 3, result: -1 },
  { level: 3, result: 3 },
  { level: 3, result: 4 },
  { level: 3, result: 5 },
  { level: 3, result: 6 },
  { level: 3, result: 7 },
  { level: 4, result: -10 },
  { level: 4, result: -9 },
  { level: 4, result: -8 },
  { level: 4, result: -7 },
  { level: 4, result: -6 },
  { level: 4, result: -5 },
  { level: 4, result: -4 },
  { level: 4, result: -3 },
  { level: 4, result: -2 },
  { level: 4, result: -1 },
  { level: 4, result: 4 },
  { level: 4, result: 5 },
  { level: 4, result: 6 },
  { level: 4, result: 7 },
  { level: 5, result: -11 },
  { level: 5, result: -10 },
  { level: 5, result: -9 },
  { level: 5, result: -8 },
  { level: 5, result: -7 },
  { level: 5, result: -6 },
  { level: 5, result: -5 },
  { level: 5, result: -4 },
  { level: 5, result: -3 },
  { level: 5, result: -2 },
  { level: 5, result: -1 },
  { level: 5, result: 5 },
  { level: 5, result: 6 },
  { level: 5, result: 7 },
  { level: 6, result: -12 },
  { level: 6, result: -11 },
  { level: 6, result: -10 },
  { level: 6, result: -9 },
  { level: 6, result: -8 },
  { level: 6, result: -7 },
  { level: 6, result: -6 },
  { level: 6, result: -5 },
  { level: 6, result: -4 },
  { level: 6, result: -3 },
  { level: 6, result: -2 },
  { level: 6, result: -1 },
  { level: 6, result: 6 },
  { level: 6, result: 7 },
  { level: 7, result: -13 },
  { level: 7, result: -12 },
  { level: 7, result: -11 },
  { level: 7, result: -10 },
  { level: 7, result: -9 },
  { level: 7, result: -8 },
  { level: 7, result: -7 },
  { level: 7, result: -6 },
  { level: 7, result: -5 },
  { level: 7, result: -4 },
  { level: 7, result: -3 },
  { level: 7, result: -2 },
  { level: 7, result: -1 },
  { level: 7, result: 7 },
] as const;
export type LevelAndResult =
  | {
      level: 1;
      result: -7 | -6 | -5 | -4 | -3 | -2 | -1 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
    }
  | {
      level: 2;
      result: -8 | -7 | -6 | -5 | -4 | -3 | -2 | -1 | 2 | 3 | 4 | 5 | 6 | 7;
    }
  | {
      level: 3;
      result: -9 | -8 | -7 | -6 | -5 | -4 | -3 | -2 | -1 | 3 | 4 | 5 | 6 | 7;
    }
  | {
      level: 4;
      result: -10 | -9 | -8 | -7 | -6 | -5 | -4 | -3 | -2 | -1 | 4 | 5 | 6 | 7;
    }
  | {
      level: 5;
      result:
        | -11
        | -10
        | -9
        | -8
        | -7
        | -6
        | -5
        | -4
        | -3
        | -2
        | -1
        | 5
        | 6
        | 7;
    }
  | {
      level: 6;
      result:
        | -12
        | -11
        | -10
        | -9
        | -8
        | -7
        | -6
        | -5
        | -4
        | -3
        | -2
        | -1
        | 6
        | 7;
    }
  | {
      level: 7;
      result:
        | -13
        | -12
        | -11
        | -10
        | -9
        | -8
        | -7
        | -6
        | -5
        | -4
        | -3
        | -2
        | -1
        | 7;
    };
const computedLevel = 2 + 0;
const computedResult = 4 + 0;
const typeSafeLevelAndResult = ({
  level,
  result,
}: {
  level: number;
  result: number;
}): LevelAndResult => {
  const attempt = allLevelsAndResults.find(
    ({ level: candidateLevel, result: candidateResult }) =>
      candidateLevel === level && candidateResult === result,
  );
  if (!attempt) {
    throw new Error(`Invalid level ${level} with result ${result}`);
  }
  return attempt;
};
// not happy:
// const lAndR: LevelAndResult = { level, result };
// totally happy:
const lAndR = typeSafeLevelAndResult({
  level: computedLevel,
  result: computedResult,
});

console.log(lAndR);
// not happy:
// const thing: DiscriminatedBoardResult = {
//   type: "PLAYED",
//   strain: "NT",
//   doubling: "NOT_DOUBLED",
//   declarer: "N",
//   leadRank: "KING",
//   leadSuit: "H",
//   board: 1,
//   round: 1,
//   level: computedLevel,
//   result: computedResult,
// };
// totally happy:
const thing: DiscriminatedBoardResult = {
  type: "PLAYED",
  strain: "NT",
  doubling: "NOT_DOUBLED",
  declarer: "N",
  leadRank: "KING",
  leadSuit: "H",
  board: 1,
  round: 1,
  ...typeSafeLevelAndResult({ level: computedLevel, result: computedResult }),
};
console.log(thing);
