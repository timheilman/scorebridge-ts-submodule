// THIS IS A GENERATED FILE; SEE scorebridge-cloud/package.json
// Types here are derived from schema.api.graphql
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends Record<string, unknown>> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<T extends Record<string, unknown>, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  AWSDate: { input: string; output: string };
  AWSDateTime: { input: string; output: string };
  AWSEmail: { input: string; output: string };
  AWSIPAddress: { input: string; output: string };
  AWSJSON: { input: string; output: string };
  AWSPhone: { input: string; output: string };
  AWSTime: { input: string; output: string };
  AWSTimestamp: { input: number; output: number };
  AWSURL: { input: string; output: string };
}

export interface AssignBoardToBidInput {
  board: Scalars["Int"]["input"];
  clubDeviceId: Scalars["String"]["input"];
  clubId: Scalars["String"]["input"];
  gameId: Scalars["String"]["input"];
  round: Scalars["Int"]["input"];
  tableNumber: Scalars["Int"]["input"];
}

export interface AssignContractInput {
  board: Scalars["Int"]["input"];
  clubDeviceId: Scalars["String"]["input"];
  clubId: Scalars["String"]["input"];
  declarer: DirectionLetter;
  doubling: Doubling;
  gameId: Scalars["String"]["input"];
  leadRank: Rank;
  leadSuit: Suit;
  level: Scalars["Int"]["input"];
  round: Scalars["Int"]["input"];
  strain: Strain;
  tableNumber: Scalars["Int"]["input"];
}

export interface AssignInitialLeadInput {
  board: Scalars["Int"]["input"];
  clubDeviceId: Scalars["String"]["input"];
  clubId: Scalars["String"]["input"];
  gameId: Scalars["String"]["input"];
  leadRank: Rank;
  leadSuit: Suit;
  round: Scalars["Int"]["input"];
  tableNumber: Scalars["Int"]["input"];
}

export interface AssignOrUnassignTableInput {
  clubDeviceId: Scalars["String"]["input"];
  clubId: Scalars["String"]["input"];
  gameId: Scalars["String"]["input"];
  tableNumber: Scalars["Int"]["input"];
}

export interface AssignPlayerInput {
  clubDeviceId: Scalars["String"]["input"];
  clubId: Scalars["String"]["input"];
  directionLetter: DirectionLetter;
  gameId: Scalars["String"]["input"];
  playerDisplayName: Scalars["String"]["input"];
  playerId: Scalars["String"]["input"];
  tableNumber: Scalars["Int"]["input"];
}

export interface AssignPlayerResponse {
  __typename?: "AssignPlayerResponse";
  clubDeviceId: Scalars["String"]["output"];
  clubId: Scalars["String"]["output"];
  directionLetter: DirectionLetter;
  gameId: Scalars["String"]["output"];
  playerDisplayName: Scalars["String"]["output"];
  playerId: Scalars["String"]["output"];
  tableNumber: Scalars["Int"]["output"];
}

export interface AssignResultInput {
  board: Scalars["Int"]["input"];
  clubDeviceId: Scalars["String"]["input"];
  clubId: Scalars["String"]["input"];
  gameId: Scalars["String"]["input"];
  result?: InputMaybe<Scalars["Int"]["input"]>;
  round: Scalars["Int"]["input"];
  tableNumber: Scalars["Int"]["input"];
  type: BoardResultType;
}

export interface AssignTableResponse {
  __typename?: "AssignTableResponse";
  clubDeviceId: Scalars["String"]["output"];
  clubId: Scalars["String"]["output"];
  gameId: Scalars["String"]["output"];
  playerAssignments: PlayerAssignment[];
  results: BoardResult[];
  tableNumber: Scalars["Int"]["output"];
}

export interface BoardResult {
  __typename?: "BoardResult";
  board: Scalars["Int"]["output"];
  declarer?: Maybe<DirectionLetter>;
  doubling?: Maybe<Doubling>;
  leadRank?: Maybe<Rank>;
  leadSuit?: Maybe<Suit>;
  level?: Maybe<Scalars["Int"]["output"]>;
  result?: Maybe<Scalars["Int"]["output"]>;
  round: Scalars["Int"]["output"];
  strain?: Maybe<Strain>;
  type: BoardResultType;
}

export enum BoardResultType {
  NotBidNotPlayed = "NOT_BID_NOT_PLAYED",
  PassedOut = "PASSED_OUT",
  Played = "PLAYED",
}

export interface ClearCurrentGameIdResponse {
  __typename?: "ClearCurrentGameIdResponse";
  clubId: Scalars["String"]["output"];
}

export interface Club {
  __typename?: "Club";
  createdAt: Scalars["AWSDateTime"]["output"];
  currentGameId?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
}

export interface ClubDevice {
  __typename?: "ClubDevice";
  clubDeviceId: Scalars["String"]["output"];
  clubId: Scalars["String"]["output"];
  createdAt: Scalars["AWSDateTime"]["output"];
  email: Scalars["AWSEmail"]["output"];
  name: Scalars["String"]["output"];
}

export interface CreateClubDeviceInput {
  clubId: Scalars["String"]["input"];
  deviceName: Scalars["String"]["input"];
  regToken: Scalars["String"]["input"];
}

export interface CreateClubInput {
  newAdminEmail: Scalars["AWSEmail"]["input"];
  newClubName: Scalars["String"]["input"];
  recaptchaToken: Scalars["String"]["input"];
  suppressInvitationEmail?: InputMaybe<Scalars["Boolean"]["input"]>;
}

export interface CreateClubResponse {
  __typename?: "CreateClubResponse";
  clubId: Scalars["String"]["output"];
  userId: Scalars["String"]["output"];
}

export interface CreateGameInput {
  boardsPerRound: Scalars["Int"]["input"];
  clubId: Scalars["String"]["input"];
  label?: InputMaybe<Scalars["String"]["input"]>;
  movement: Scalars["String"]["input"];
  roundCount: Scalars["Int"]["input"];
  tableCount: Scalars["Int"]["input"];
}

export interface DeleteClubAndAdminInput {
  clubId: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
}

export interface DeleteClubAndAdminResponse {
  __typename?: "DeleteClubAndAdminResponse";
  status: Scalars["String"]["output"];
}

export interface DeleteClubDeviceInput {
  clubDeviceId: Scalars["String"]["input"];
  clubId: Scalars["String"]["input"];
}

export interface DeleteGameInput {
  clubId: Scalars["String"]["input"];
  gameId: Scalars["String"]["input"];
}

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

export interface Game {
  __typename?: "Game";
  boardsPerRound: Scalars["Int"]["output"];
  clubId: Scalars["String"]["output"];
  createdAt: Scalars["AWSDateTime"]["output"];
  gameId: Scalars["String"]["output"];
  label?: Maybe<Scalars["String"]["output"]>;
  movement: Scalars["String"]["output"];
  roundCount: Scalars["Int"]["output"];
  tableAssignments: TableAssignment[];
  tableCount: Scalars["Int"]["output"];
}

export interface GetGameInput {
  clubId: Scalars["String"]["input"];
  gameId: Scalars["String"]["input"];
}

export interface ListClubDevicesInput {
  clubId: Scalars["String"]["input"];
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  nextToken?: InputMaybe<Scalars["String"]["input"]>;
}

export interface ListClubDevicesOutput {
  __typename?: "ListClubDevicesOutput";
  items: Maybe<ClubDevice>[];
  nextToken?: Maybe<Scalars["String"]["output"]>;
}

export interface ListGamesInput {
  clubId: Scalars["String"]["input"];
  finalGameFromLastList?: InputMaybe<PartialGame>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  nextToken?: InputMaybe<Scalars["String"]["input"]>;
}

export interface ListGamesOutput {
  __typename?: "ListGamesOutput";
  items: Maybe<Game>[];
  nextToken?: Maybe<Scalars["String"]["output"]>;
}

export interface Mutation {
  __typename?: "Mutation";
  assignBoardToBid: BoardResult;
  assignContract: BoardResult;
  assignInitialLead: BoardResult;
  assignPlayer: AssignPlayerResponse;
  assignResult: BoardResult;
  assignTable: AssignTableResponse;
  createClub: CreateClubResponse;
  createClubDevice: ClubDevice;
  createGame: Game;
  deleteClubAndAdmin: DeleteClubAndAdminResponse;
  deleteClubDevice: ClubDevice;
  deleteGame: Game;
  unassignBoardToBid: BoardResult;
  unassignContract: BoardResult;
  unassignInitialLead: BoardResult;
  unassignTable: UnassignTableResponse;
  unexpectedError: UnexpectedErrorResponse;
  updateClubName: UpdateClubNameResponse;
  updateCurrentGameId: UpdateCurrentGameIdResponse;
}

export interface MutationAssignBoardToBidArgs {
  input: AssignBoardToBidInput;
}

export interface MutationAssignContractArgs {
  input: AssignContractInput;
}

export interface MutationAssignInitialLeadArgs {
  input: AssignInitialLeadInput;
}

export interface MutationAssignPlayerArgs {
  input: AssignPlayerInput;
}

export interface MutationAssignResultArgs {
  input: AssignResultInput;
}

export interface MutationAssignTableArgs {
  input: AssignOrUnassignTableInput;
}

export interface MutationCreateClubArgs {
  input: CreateClubInput;
}

export interface MutationCreateClubDeviceArgs {
  input: CreateClubDeviceInput;
}

export interface MutationCreateGameArgs {
  input: CreateGameInput;
}

export interface MutationDeleteClubAndAdminArgs {
  input: DeleteClubAndAdminInput;
}

export interface MutationDeleteClubDeviceArgs {
  input: DeleteClubDeviceInput;
}

export interface MutationDeleteGameArgs {
  input: DeleteGameInput;
}

export interface MutationUnassignBoardToBidArgs {
  input: UnassignContractInput;
}

export interface MutationUnassignContractArgs {
  input: UnassignContractInput;
}

export interface MutationUnassignInitialLeadArgs {
  input: UnassignContractInput;
}

export interface MutationUnassignTableArgs {
  input: AssignOrUnassignTableInput;
}

export interface MutationUpdateClubNameArgs {
  input: UpdateClubNameInput;
}

export interface MutationUpdateCurrentGameIdArgs {
  input: UpdateCurrentGameIdInput;
}

export interface PartialBoardResult {
  board: Scalars["Int"]["input"];
  declarer?: InputMaybe<DirectionLetter>;
  doubling?: InputMaybe<Doubling>;
  leadRank?: InputMaybe<Rank>;
  leadSuit?: InputMaybe<Suit>;
  level?: InputMaybe<Scalars["Int"]["input"]>;
  result?: InputMaybe<Scalars["Int"]["input"]>;
  round: Scalars["Int"]["input"];
  strain?: InputMaybe<Strain>;
  type: BoardResultType;
}

export interface PartialGame {
  boardsPerRound: Scalars["Int"]["input"];
  clubId: Scalars["String"]["input"];
  createdAt: Scalars["AWSDateTime"]["input"];
  gameId: Scalars["String"]["input"];
  label?: InputMaybe<Scalars["String"]["input"]>;
  movement: Scalars["String"]["input"];
  roundCount: Scalars["Int"]["input"];
  tableAssignments: PartialTableAssignment[];
  tableCount: Scalars["Int"]["input"];
}

export interface PartialPlayerAssignment {
  directionLetter: DirectionLetter;
  playerDisplayName: Scalars["String"]["input"];
  playerId: Scalars["String"]["input"];
}

export interface PartialTableAssignment {
  clubDeviceId: Scalars["String"]["input"];
  playerAssignments: PartialPlayerAssignment[];
  results: PartialBoardResult[];
  tableNumber: Scalars["Int"]["input"];
}

export interface PlayerAssignment {
  __typename?: "PlayerAssignment";
  directionLetter: DirectionLetter;
  playerDisplayName: Scalars["String"]["output"];
  playerId: Scalars["String"]["output"];
}

export interface Query {
  __typename?: "Query";
  getClub?: Maybe<Club>;
  getGame?: Maybe<Game>;
  listClubDevices: ListClubDevicesOutput;
  listGames: ListGamesOutput;
}

export interface QueryGetClubArgs {
  clubId: Scalars["String"]["input"];
}

export interface QueryGetGameArgs {
  input: GetGameInput;
}

export interface QueryListClubDevicesArgs {
  input: ListClubDevicesInput;
}

export interface QueryListGamesArgs {
  input: ListGamesInput;
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

export enum Strain {
  C = "C",
  D = "D",
  H = "H",
  Nt = "NT",
  S = "S",
}

export interface Subscription {
  __typename?: "Subscription";
  onAssignPlayer?: Maybe<AssignPlayerResponse>;
  onAssignTable?: Maybe<AssignTableResponse>;
  onCreateGame?: Maybe<Game>;
  onDeleteGame?: Maybe<Game>;
  onUnassignTable?: Maybe<UnassignTableResponse>;
  onUpdateClubName?: Maybe<UpdateClubNameResponse>;
  onUpdateCurrentGameId?: Maybe<UpdateCurrentGameIdResponse>;
}

export interface SubscriptionOnAssignPlayerArgs {
  clubId: Scalars["String"]["input"];
}

export interface SubscriptionOnAssignTableArgs {
  clubId: Scalars["String"]["input"];
}

export interface SubscriptionOnCreateGameArgs {
  clubId: Scalars["String"]["input"];
}

export interface SubscriptionOnDeleteGameArgs {
  clubId: Scalars["String"]["input"];
}

export interface SubscriptionOnUnassignTableArgs {
  clubId: Scalars["String"]["input"];
}

export interface SubscriptionOnUpdateClubNameArgs {
  clubId: Scalars["String"]["input"];
}

export interface SubscriptionOnUpdateCurrentGameIdArgs {
  clubId: Scalars["String"]["input"];
}

export enum Suit {
  C = "C",
  D = "D",
  H = "H",
  S = "S",
}

export interface TableAssignment {
  __typename?: "TableAssignment";
  clubDeviceId: Scalars["String"]["output"];
  playerAssignments: PlayerAssignment[];
  results: BoardResult[];
  tableNumber: Scalars["Int"]["output"];
}

export interface UnassignContractInput {
  board: Scalars["Int"]["input"];
  clubDeviceId: Scalars["String"]["input"];
  clubId: Scalars["String"]["input"];
  gameId: Scalars["String"]["input"];
  round: Scalars["Int"]["input"];
  tableNumber: Scalars["Int"]["input"];
}

export interface UnassignTableResponse {
  __typename?: "UnassignTableResponse";
  clubDeviceId: Scalars["String"]["output"];
  clubId: Scalars["String"]["output"];
  gameId: Scalars["String"]["output"];
  tableNumber: Scalars["Int"]["output"];
}

export interface UnexpectedErrorResponse {
  __typename?: "UnexpectedErrorResponse";
  neverGetsReturned: Scalars["String"]["output"];
}

export interface UpdateClubNameInput {
  clubId: Scalars["String"]["input"];
  newName: Scalars["String"]["input"];
}

export interface UpdateClubNameResponse {
  __typename?: "UpdateClubNameResponse";
  clubId: Scalars["String"]["output"];
  newClubName: Scalars["String"]["output"];
}

export interface UpdateCurrentGameIdInput {
  clubId: Scalars["String"]["input"];
  newGameId: Scalars["String"]["input"];
}

export interface UpdateCurrentGameIdResponse {
  __typename?: "UpdateCurrentGameIdResponse";
  clubId: Scalars["String"]["output"];
  newCurrentGameId: Scalars["String"]["output"];
}
