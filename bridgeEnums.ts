import {
  BoardResult,
  BoardResultC,
  DirectionLetter,
  Doubling,
  Game,
  Player,
  PlayerAssignment,
  Rank,
  Strain,
  Suit,
  TableAssignment,
  TableAssignmentCt,
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

interface StrictPlayed {
  type: "PLAYED";
  level: Level;
  strain: Strain;
  doubling: Doubling;
  declarer: DirectionLetter;
  leadRank: Rank;
  leadSuit: Suit;
  wonTrickCount: WonTrickCount;
}

type LoosePlayed = Partial<StrictPlayed> & { type: "PLAYED" };

export type BoardResultUt =
  | { type: "NOT_BID_NOT_PLAYED" }
  | { type: "PASSED_OUT" }
  | StrictPlayed;

export type BoardResultUl =
  | { type: "NOT_BID_NOT_PLAYED" }
  | { type: "PASSED_OUT" }
  | LoosePlayed;

export type BoardResultUct = BoardResultUt & CurrentAsOf;
// type BoardResultUCL = BoardResultUL & CurrentAsOf;
// type BoardResultL = BoardResultUL & BoardAndRound;
// type BoardResultCL = BoardResultUL & BoardAndRound & CurrentAsOf;

export type BoardResultT = BoardResultUt & BoardAndRound;
export type BoardResultCt = BoardResultUt & BoardAndRound & CurrentAsOf;
export type BoardResultUc = Omit<BoardResultC, "board" | "round">;
export type BoardResultU = Omit<BoardResult, "board" | "round">;

export type TableAssignmentC = TableAssignment & CurrentAsOf;
export type TableAssignmentT = Omit<TableAssignmentCt, "currentAsOf">;
export type TableAssignmentU = Omit<TableAssignment, "tableNumber">;
export type TableAssignmentUt = Omit<
  TableAssignmentCt,
  "tableNumber" | "currentAsOf"
>;
export type TableAssignmentUc = Omit<TableAssignment, "tableNumber"> &
  CurrentAsOf;
export type TableAssignmentUct = Omit<TableAssignmentCt, "tableNumber">;

// lambda does not apply currentAsOf; response mapping template does:
export type CreateGameLambdaReturnType = Omit<Game, "tableAssignments"> & {
  tableAssignments: (Omit<TableAssignmentT, "results"> & {
    results: BoardResultT[];
  })[];
};

export const playedBoardRequiredFields = [
  "level",
  "strain",
  "doubling",
  "declarer",
  "leadRank",
  "leadSuit",
  "wonTrickCount",
] as const;

export const anyGameItemLifetimeSeconds = 60 * 60 * 24 * 30; // 30 days
