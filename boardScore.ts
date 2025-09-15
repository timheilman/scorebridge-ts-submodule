import type { BoardResultUl, Level, WonTrickCount } from "./bridgeEnums.js";
import type { DirectionLetter, Doubling, Strain } from "./graphql/appsync.js";
import { isVulnerable } from "./movementHelpers.js";

export interface BoardScoreParams {
  declarer: DirectionLetter;
  level: Level;
  strain: Strain;
  vulnerable: boolean;
  doubling: Doubling;
  wonTrickCount: WonTrickCount;
}

const pointsPerTrick = (strain: Strain) =>
  strain === "C" || strain === "D" ? 20 : 30;

const contractPoints = ({ strain, doubling, level }: BoardScoreParams) => {
  const doublingFactor =
    doubling === "NONE" ? 1 : doubling === "REDOUBLE" ? 4 : 2;
  const noTrumpFirstTrickExtra = strain === "NT" ? 10 : 0;
  const toReturn =
    (pointsPerTrick(strain) * level + noTrumpFirstTrickExtra) * doublingFactor;
  return toReturn;
};

const overtrickCount = ({ level, wonTrickCount }: BoardScoreParams) =>
  wonTrickCount - 6 - level;

const overtrickPoints = (params: BoardScoreParams) => {
  const { doubling, strain, vulnerable } = params;
  if (doubling === "NONE") {
    return pointsPerTrick(strain) * overtrickCount(params);
  }
  const doubleFactor = doubling === "DOUBLE" ? 1 : 2;
  const vulnerableFactor = vulnerable ? 2 : 1;

  const toReturn =
    100 * doubleFactor * vulnerableFactor * overtrickCount(params);
  return toReturn;
};

const duplicateBonus = (params: BoardScoreParams) => {
  const { vulnerable } = params;
  const toReturn =
    contractPoints(params) >= 100 ? (vulnerable ? 500 : 300) : 50;
  return toReturn;
};

const slamBonus = ({ level, vulnerable }: BoardScoreParams) => {
  if (level < 6) {
    return 0;
  }

  if (level === 6) {
    return vulnerable ? 750 : 500;
  }

  return vulnerable ? 1500 : 1000;
};

const insultBonus = ({ doubling }: BoardScoreParams) => {
  if (doubling === "NONE") {
    return 0;
  }

  return doubling === "DOUBLE" ? 50 : 100;
};

const penaltyPoints = ({
  doubling,
  vulnerable,
  level,
  wonTrickCount,
}: BoardScoreParams) => {
  const undertricks = level + 6 - wonTrickCount;
  if (doubling === "NONE") {
    const vulnerableFactor = vulnerable ? 2 : 1;
    return -undertricks * 50 * vulnerableFactor;
  }
  const trickCountSecondThird = Math.min(Math.max(undertricks - 1, 0), 2);
  const trickCountFourthBeyond = Math.max(undertricks - 3, 0);
  const doublingFactor = doubling === "DOUBLE" ? 1 : 2;
  if (vulnerable) {
    return (
      doublingFactor *
      (-200 - 300 * (trickCountSecondThird + trickCountFourthBeyond))
    );
  }
  return (
    doublingFactor *
    (-100 - 200 * trickCountSecondThird - 300 * trickCountFourthBeyond)
  );
};

export const biddingBoxScoreForNsDefinitelyPlayed = (
  params: BoardScoreParams,
) => {
  const scoreNorthSouth =
    params.wonTrickCount - 6 >= params.level
      ? contractPoints(params) +
        overtrickPoints(params) +
        duplicateBonus(params) +
        slamBonus(params) +
        insultBonus(params)
      : penaltyPoints(params);
  if (params.declarer === "E" || params.declarer === "W") {
    return -scoreNorthSouth;
  }
  return scoreNorthSouth;
};

export const biddingBoxScoreForPartnershipRegardlessOfPlayed = ({
  boardResult,
  direction,
}: {
  boardResult: BoardResultUl & { board: number };
  direction: DirectionLetter;
}) => {
  if (boardResult.type === "NOT_BID_NOT_PLAYED") {
    return;
  }
  if (boardResult.type === "PASSED_OUT") {
    return 0;
  }
  if (
    !boardResult.level ||
    !boardResult.strain ||
    !boardResult.doubling ||
    !boardResult.declarer ||
    boardResult.wonTrickCount === undefined ||
    boardResult.wonTrickCount === null
  ) {
    return;
  }
  const whichWay = direction === "N" || direction === "S" ? 1 : -1;

  return (
    whichWay *
    biddingBoxScoreForNsDefinitelyPlayed({
      declarer: boardResult.declarer,
      wonTrickCount: boardResult.wonTrickCount,
      doubling: boardResult.doubling,
      level: boardResult.level,
      strain: boardResult.strain,
      vulnerable: isVulnerable({
        board: boardResult.board,
        direction: boardResult.declarer,
      }),
    })
  );
};
