// These are from appsync.d.ts but need to be here as well; see:
// https://github.com/evanw/esbuild/issues/2298

export enum DirectionLetter {
  E = "E",
  N = "N",
  S = "S",
  W = "W",
}

export enum Doubling {
  Double = "DOUBLE",
  None = "NONE",
  Redouble = "REDOUBLE",
}

export enum Strain {
  C = "C",
  D = "D",
  H = "H",
  Nt = "NT",
  S = "S",
}

export enum Suit {
  C = "C",
  D = "D",
  H = "H",
  S = "S",
}
export enum Rank {
  Ace = "ACE",
  Eight = "EIGHT",
  Five = "FIVE",
  Four = "FOUR",
  Jack = "JACK",
  King = "KING",
  Nine = "NINE",
  Queen = "QUEEN",
  Seven = "SEVEN",
  Six = "SIX",
  Ten = "TEN",
  Three = "THREE",
  Two = "TWO",
}
export enum BoardResultType {
  InitialLeadAssigned = "INITIAL_LEAD_ASSIGNED",
  LevelStrainDoublingDeclarerAssigned = "LEVEL_STRAIN_DOUBLING_DECLARER_ASSIGNED",
  NotBidNotPlayed = "NOT_BID_NOT_PLAYED",
  PassedOut = "PASSED_OUT",
  ResultAssigned = "RESULT_ASSIGNED",
  SelectedToBid = "SELECTED_TO_BID",
}
