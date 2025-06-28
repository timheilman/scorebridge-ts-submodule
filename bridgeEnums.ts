import {
  BoardResult,
  BoardResultC,
  ClubDevice,
  DirectionLetter,
  Doubling,
  Game,
  Player,
  PlayerAssignment,
  Rank,
  Strain,
  Suit,
  TableAssignment,
  TableAssignmentCvt,
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
export type UnkeyedPlayerAssignment = Omit<PlayerAssignment, "directionLetter">;
export type UnkeyedPlayer = Omit<Player, "playerId">;

// the rules for board and round integers relative to movement, roundCount, and boardsPerRound
// are too complicated to be put into the type system, so they are validated in the resolvers

// https://docs.google.com/spreadsheets/d/1fotK1vf9V7WYQfU_0_dcIdM79r2DtKcGE9QwbEcJ9sw/edit?usp=sharing
interface BoardAndRound {
  board: number;
  round: number;
}

interface CurrentAsOf {
  currentAsOf: string;
}

interface TableAssignmentVectors {
  playerAssignments: PlayerAssignment[];
  results: BoardResultC[];
}

// interface StrictPlayed {
//   type: "PLAYED";
//   level: Level;
//   strain: Strain;
//   doubling: Doubling;
//   declarer: DirectionLetter;
//   leadRank: Rank;
//   leadSuit: Suit;
//   wonTrickCount: WonTrickCount;
//   confirmed: boolean;
// }

// type LoosePlayed = Partial<StrictPlayed> & { type: "PLAYED" };
export interface LoosePlayed {
  type: "PLAYED";
  level?: Level;
  strain?: Strain;
  doubling?: Doubling;
  declarer?: DirectionLetter;
  leadRank?: Rank;
  leadSuit?: Suit;
  wonTrickCount?: WonTrickCount | null;
  confirmed: boolean;
}

// export type BoardResultUt =
//   | { type: "NOT_BID_NOT_PLAYED" }
//   | { type: "PASSED_OUT" }
//   | StrictPlayed;

export type BoardResultUl =
  | { type: "NOT_BID_NOT_PLAYED"; confirmed: boolean }
  | { type: "PASSED_OUT"; confirmed: boolean }
  | LoosePlayed;
export type StagedBoardResult = BoardResultUl | undefined;
// export type BoardResultUct = BoardResultUt & CurrentAsOf;
export type BoardResultUcl = BoardResultUl & CurrentAsOf;
export type BoardResultL = BoardResultUl & BoardAndRound;
export type BoardResultCl = BoardResultUl & BoardAndRound & CurrentAsOf;

// export type BoardResultT = BoardResultUt & BoardAndRound;
// export type BoardResultCt = BoardResultUt & BoardAndRound & CurrentAsOf;
export type BoardResultUc = Omit<BoardResultC, "board" | "round">;
export type BoardResultU = Omit<BoardResult, "board" | "round">;

// TableAssignmentCvt is schema-defined

// remove single: tableNumber, currentAsOf, vectors:
export type TableAssignmentUvct = Omit<TableAssignmentCvt, "tableNumber">;
export type TableAssignmentVt = Omit<TableAssignmentCvt, "currentAsOf">;
export type TableAssignmentCt = Omit<
  TableAssignmentCvt,
  "results" | "playerAssignments"
>;

// remove doubles: tableNumber, currentAsOf, vectors:
export type TableAssignmentUvt = Omit<
  TableAssignmentCvt,
  "tableNumber" | "currentAsOf"
>;
export type TableAssignmentUct = Omit<
  TableAssignmentCvt,
  "tableNumber" | "results" | "playerAssignments"
>;
export type TableAssignmentT = Omit<
  TableAssignmentCvt,
  "currentAsOf" | "results" | "playerAssignments"
>;

// remove all three: tableNumber, currentAsOf, vectors:
export type TableAssignmentUt = Omit<
  TableAssignmentCvt,
  "tableNumber" | "currentAsOf" | "results" | "playerAssignments"
>;

// tableAssignment is schema-defined
// modify singles: tableNumber, currentAsOf, vectors:
export type TableAssignmentU = Omit<TableAssignment, "tableNumber">;
export type TableAssignmentC = TableAssignment & CurrentAsOf;
export type TableAssignmentV = TableAssignment & TableAssignmentVectors;

// modify doubles: tableNumber, currentAsOf, vectors:
export type TableAssignmentUc = Omit<TableAssignment, "tableNumber"> &
  CurrentAsOf;
export type TableAssignmentUv = Omit<TableAssignment, "tableNumber"> &
  TableAssignmentVectors;
export type TableAssignmentCv = TableAssignment &
  CurrentAsOf &
  TableAssignmentVectors;

// modify triples: tableNumber, currentAsOf, vectors:
export type TableAssignmentUcv = Omit<TableAssignment, "tableNumber"> &
  CurrentAsOf &
  TableAssignmentVectors;

// lambda does not apply currentAsOf; response mapping template does:
export type CreateGameLambdaReturnType = Omit<Game, "tableAssignments"> & {
  tableAssignments: (Omit<TableAssignmentVt, "results"> & {
    results: (BoardAndRound & {
      type: "NOT_BID_NOT_PLAYED";
      confirmed: boolean;
    })[];
  })[];
};

export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export const scoringFields = [
  "type",
  "level",
  "strain",
  "doubling",
  "declarer",
  "leadRank",
  "leadSuit",
  "wonTrickCount",
  "confirmed",
] as const;
export type ScoringField = (typeof scoringFields)[number];

export type ClubDeviceWithPassword = ClubDevice & {
  password: string;
};

export const anyGameItemLifetimeSeconds = 60 * 60 * 24 * 30; // 30 days
