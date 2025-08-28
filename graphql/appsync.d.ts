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
export type MakeEmpty<
  T extends Record<string, unknown>,
  K extends keyof T,
> = Partial<Record<K, never>>;
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

export interface AssignPlayerInput {
  clubDeviceId?: InputMaybe<Scalars["String"]["input"]>;
  clubHumanDisplayName: Scalars["String"]["input"];
  clubHumanId: Scalars["String"]["input"];
  clubId: Scalars["String"]["input"];
  directionLetter: DirectionLetter;
  gameId: Scalars["String"]["input"];
  tableNumber: Scalars["Int"]["input"];
}

export interface AssignPlayerResponse {
  __typename?: "AssignPlayerResponse";
  clubDeviceId?: Maybe<Scalars["String"]["output"]>;
  clubHumanDisplayName: Scalars["String"]["output"];
  clubHumanId: Scalars["String"]["output"];
  clubId: Scalars["String"]["output"];
  directionLetter: DirectionLetter;
  gameId: Scalars["String"]["output"];
  tableNumber: Scalars["Int"]["output"];
}

export interface BoardResult {
  board: Scalars["Int"]["input"];
  confirmed: Scalars["Boolean"]["input"];
  declarer?: InputMaybe<DirectionLetter>;
  doubling?: InputMaybe<Doubling>;
  leadRank?: InputMaybe<Rank>;
  leadSuit?: InputMaybe<Suit>;
  level?: InputMaybe<Scalars["Int"]["input"]>;
  round: Scalars["Int"]["input"];
  strain?: InputMaybe<Strain>;
  type: BoardResultType;
  wonTrickCount?: InputMaybe<Scalars["Int"]["input"]>;
}

export interface BoardResultC {
  __typename?: "BoardResultC";
  board: Scalars["Int"]["output"];
  confirmed: Scalars["Boolean"]["output"];
  currentAsOf: Scalars["AWSDateTime"]["output"];
  declarer?: Maybe<DirectionLetter>;
  doubling?: Maybe<Doubling>;
  leadRank?: Maybe<Rank>;
  leadSuit?: Maybe<Suit>;
  level?: Maybe<Scalars["Int"]["output"]>;
  round: Scalars["Int"]["output"];
  strain?: Maybe<Strain>;
  type: BoardResultType;
  wonTrickCount?: Maybe<Scalars["Int"]["output"]>;
}

export type BoardResultType = "NOT_BID_NOT_PLAYED" | "PASSED_OUT" | "PLAYED";

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

export interface ClubDeviceCreated {
  clubDeviceId: Scalars["String"]["input"];
  clubId: Scalars["String"]["input"];
  createdAt: Scalars["AWSDateTime"]["input"];
  email: Scalars["AWSEmail"]["input"];
  name: Scalars["String"]["input"];
  regToken: Scalars["String"]["input"];
}

export interface ClubDeviceRegistration {
  __typename?: "ClubDeviceRegistration";
  clubId: Scalars["String"]["output"];
  createdAt: Scalars["AWSDateTime"]["output"];
  deviceName: Scalars["String"]["output"];
  regToken: Scalars["String"]["output"];
  ttl: Scalars["Int"]["output"];
  updatedAt: Scalars["AWSDateTime"]["output"];
}

export interface ClubDeviceWithRegToken {
  __typename?: "ClubDeviceWithRegToken";
  clubDeviceId: Scalars["String"]["output"];
  clubId: Scalars["String"]["output"];
  createdAt: Scalars["AWSDateTime"]["output"];
  email: Scalars["AWSEmail"]["output"];
  name: Scalars["String"]["output"];
  regToken: Scalars["String"]["output"];
}

export interface ClubHuman {
  __typename?: "ClubHuman";
  clubHumanDisplayName?: Maybe<Scalars["String"]["output"]>;
  clubHumanId: Scalars["String"]["output"];
  clubId: Scalars["String"]["output"];
}

export interface CreateClubDeviceRegistrationInput {
  clubId: Scalars["String"]["input"];
  deviceName: Scalars["String"]["input"];
  regToken: Scalars["String"]["input"];
}

export interface DeleteClubAndAdminInput {
  clubId: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
}

export interface DeleteClubAndAdminResponse {
  __typename?: "DeleteClubAndAdminResponse";
  status: Scalars["String"]["output"];
}

export interface DeleteClubHumanInput {
  clubHumanId: Scalars["String"]["input"];
  clubId: Scalars["String"]["input"];
}

export interface DeleteGameInput {
  clubId: Scalars["String"]["input"];
  gameId: Scalars["String"]["input"];
}

export type DirectionLetter = "E" | "N" | "S" | "W";

export type Doubling = "DOUBLE" | "NONE" | "REDOUBLE";

export interface EnqueueCreateClubHumanInput {
  clubHumanDisplayName?: InputMaybe<Scalars["String"]["input"]>;
  clubHumanId: Scalars["String"]["input"];
  clubId: Scalars["String"]["input"];
}

export interface EnqueueCreateClubHumanOutput {
  __typename?: "EnqueueCreateClubHumanOutput";
  clubHumanDisplayName?: Maybe<Scalars["String"]["output"]>;
  clubHumanId: Scalars["String"]["output"];
  clubId: Scalars["String"]["output"];
}

export interface EnqueueCreateGameInput {
  boardsPerRound: Scalars["Int"]["input"];
  clubId: Scalars["String"]["input"];
  label?: InputMaybe<Scalars["String"]["input"]>;
  movement: Movement;
  roundCount: Scalars["Int"]["input"];
  tableCount: Scalars["Int"]["input"];
}

export interface EnqueueCreateGameOutput {
  __typename?: "EnqueueCreateGameOutput";
  boardsPerRound: Scalars["Int"]["output"];
  clubId: Scalars["String"]["output"];
  gameId: Scalars["String"]["output"];
  label?: Maybe<Scalars["String"]["output"]>;
  movement: Movement;
  roundCount: Scalars["Int"]["output"];
  tableCount: Scalars["Int"]["output"];
}

export interface EnqueueDeleteClubDeviceInput {
  clubDeviceId: Scalars["String"]["input"];
  clubId: Scalars["String"]["input"];
}

export interface EnqueueDeleteClubDeviceOutput {
  __typename?: "EnqueueDeleteClubDeviceOutput";
  clubDeviceId: Scalars["String"]["output"];
  clubId: Scalars["String"]["output"];
}

export interface EnqueueUpdateClubHumanInput {
  clubHumanDisplayName?: InputMaybe<Scalars["String"]["input"]>;
  clubHumanId: Scalars["String"]["input"];
  clubId: Scalars["String"]["input"];
}

export interface EnqueueUpdateClubHumanOutput {
  __typename?: "EnqueueUpdateClubHumanOutput";
  clubHumanDisplayName?: Maybe<Scalars["String"]["output"]>;
  clubHumanId: Scalars["String"]["output"];
  clubId: Scalars["String"]["output"];
}

export interface Game {
  __typename?: "Game";
  boardsPerRound: Scalars["Int"]["output"];
  clubId: Scalars["String"]["output"];
  createdAt: Scalars["AWSDateTime"]["output"];
  gameId: Scalars["String"]["output"];
  label?: Maybe<Scalars["String"]["output"]>;
  movement: Movement;
  roundCount: Scalars["Int"]["output"];
  tableAssignments: TableAssignmentCvt[];
  tableCount: Scalars["Int"]["output"];
}

export interface GetGameInput {
  clubId: Scalars["String"]["input"];
  gameId: Scalars["String"]["input"];
}

export interface ListClubDeviceRegistrationsInput {
  clubId: Scalars["String"]["input"];
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  nextToken?: InputMaybe<Scalars["String"]["input"]>;
}

export interface ListClubDeviceRegistrationsOutput {
  __typename?: "ListClubDeviceRegistrationsOutput";
  items: Maybe<ClubDeviceRegistration>[];
  nextToken?: Maybe<Scalars["String"]["output"]>;
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

export interface ListClubHumansInput {
  clubId: Scalars["String"]["input"];
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  nextToken?: InputMaybe<Scalars["String"]["input"]>;
}

export interface ListClubHumansOutput {
  __typename?: "ListClubHumansOutput";
  items: Maybe<ClubHuman>[];
  nextToken?: Maybe<Scalars["String"]["output"]>;
}

export interface ListGamesInput {
  clubId: Scalars["String"]["input"];
  finalGameFromLastList?: InputMaybe<PartialGameCvt>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  nextToken?: InputMaybe<Scalars["String"]["input"]>;
}

export interface ListGamesOutput {
  __typename?: "ListGamesOutput";
  items: Maybe<Game>[];
  nextToken?: Maybe<Scalars["String"]["output"]>;
}

export type Movement = "HOWELL" | "MITCHELL" | "RAINBOW";

export interface Mutation {
  __typename?: "Mutation";
  assignPlayer: AssignPlayerResponse;
  createClubDeviceRegistration: ClubDeviceRegistration;
  deleteClubAndAdmin: DeleteClubAndAdminResponse;
  deleteClubHuman: ClubHuman;
  deleteGame: Game;
  enqueueCreateClubHuman: EnqueueCreateClubHumanOutput;
  enqueueCreateGame: EnqueueCreateGameOutput;
  enqueueDeleteClubDevice: ClubDevice;
  enqueueUpdateClubHuman: EnqueueUpdateClubHumanOutput;
  notifyCreateClubDevice: ClubDeviceWithRegToken;
  notifyCreateClubHuman: NotifyClubHuman;
  notifyCreateGame: Game;
  notifyDeleteClubDevice: EnqueueDeleteClubDeviceOutput;
  notifyUpdateClubHuman: NotifyClubHuman;
  unassignPlayers: UnassignPlayersResponse;
  unexpectedError: UnexpectedErrorResponse;
  updateBoardResult: UpdateBoardResultResponse;
  updateClubName: UpdateClubNameResponse;
  updateCurrentGameId: UpdateCurrentGameIdResponse;
  updateTableAssignment: UpdateTableAssignmentResponse;
}

export interface MutationAssignPlayerArgs {
  input: AssignPlayerInput;
}

export interface MutationCreateClubDeviceRegistrationArgs {
  input: CreateClubDeviceRegistrationInput;
}

export interface MutationDeleteClubAndAdminArgs {
  input: DeleteClubAndAdminInput;
}

export interface MutationDeleteClubHumanArgs {
  input: DeleteClubHumanInput;
}

export interface MutationDeleteGameArgs {
  input: DeleteGameInput;
}

export interface MutationEnqueueCreateClubHumanArgs {
  input: EnqueueCreateClubHumanInput;
}

export interface MutationEnqueueCreateGameArgs {
  input: EnqueueCreateGameInput;
}

export interface MutationEnqueueDeleteClubDeviceArgs {
  input: EnqueueDeleteClubDeviceInput;
}

export interface MutationEnqueueUpdateClubHumanArgs {
  input: EnqueueUpdateClubHumanInput;
}

export interface MutationNotifyCreateClubDeviceArgs {
  input: ClubDeviceCreated;
}

export interface MutationNotifyCreateClubHumanArgs {
  input: NotifyClubHumanInput;
}

export interface MutationNotifyCreateGameArgs {
  input: PartialGameVt;
}

export interface MutationNotifyDeleteClubDeviceArgs {
  input: EnqueueDeleteClubDeviceInput;
}

export interface MutationNotifyUpdateClubHumanArgs {
  input: NotifyClubHumanInput;
}

export interface MutationUnassignPlayersArgs {
  input: UnassignPlayersInput;
}

export interface MutationUpdateBoardResultArgs {
  input: UpdateBoardResultInput;
}

export interface MutationUpdateClubNameArgs {
  input: UpdateClubNameInput;
}

export interface MutationUpdateCurrentGameIdArgs {
  input: UpdateCurrentGameIdInput;
}

export interface MutationUpdateTableAssignmentArgs {
  input: UpdateTableAssignmentInput;
}

export interface NotifyClubHuman {
  __typename?: "NotifyClubHuman";
  clubHuman?: Maybe<ClubHuman>;
  error?: Maybe<Scalars["String"]["output"]>;
}

export interface NotifyClubHumanInput {
  clubHuman?: InputMaybe<EnqueueUpdateClubHumanInput>;
  error?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PagingBoardResult {
  board: Scalars["Int"]["input"];
  confirmed: Scalars["Boolean"]["input"];
  declarer?: InputMaybe<DirectionLetter>;
  doubling?: InputMaybe<Doubling>;
  leadRank?: InputMaybe<Rank>;
  leadSuit?: InputMaybe<Suit>;
  level?: InputMaybe<Scalars["Int"]["input"]>;
  round: Scalars["Int"]["input"];
  strain?: InputMaybe<Strain>;
  type: BoardResultType;
  wonTrickCount?: InputMaybe<Scalars["Int"]["input"]>;
}

export interface PagingBoardResultC {
  board: Scalars["Int"]["input"];
  confirmed: Scalars["Boolean"]["input"];
  currentAsOf: Scalars["AWSDateTime"]["input"];
  declarer?: InputMaybe<DirectionLetter>;
  doubling?: InputMaybe<Doubling>;
  leadRank?: InputMaybe<Rank>;
  leadSuit?: InputMaybe<Suit>;
  level?: InputMaybe<Scalars["Int"]["input"]>;
  round: Scalars["Int"]["input"];
  strain?: InputMaybe<Strain>;
  type: BoardResultType;
  wonTrickCount?: InputMaybe<Scalars["Int"]["input"]>;
}

export interface PagingTableAssignmentCvt {
  clubDeviceId?: InputMaybe<Scalars["String"]["input"]>;
  confirmed: Scalars["Boolean"]["input"];
  currentAsOf: Scalars["AWSDateTime"]["input"];
  playerAssignments: PartialPlayerAssignment[];
  results: PagingBoardResultC[];
  round: Scalars["Int"]["input"];
  roundWelcomeConfirmed: Scalars["Boolean"]["input"];
  tableNumber: Scalars["Int"]["input"];
}

export interface PagingTableAssignmentVt {
  clubDeviceId?: InputMaybe<Scalars["String"]["input"]>;
  confirmed: Scalars["Boolean"]["input"];
  playerAssignments: PartialPlayerAssignment[];
  results: PagingBoardResult[];
  round: Scalars["Int"]["input"];
  roundWelcomeConfirmed: Scalars["Boolean"]["input"];
  tableNumber: Scalars["Int"]["input"];
}

export interface PartialGameCvt {
  boardsPerRound: Scalars["Int"]["input"];
  clubId: Scalars["String"]["input"];
  createdAt: Scalars["AWSDateTime"]["input"];
  gameId: Scalars["String"]["input"];
  label?: InputMaybe<Scalars["String"]["input"]>;
  movement: Movement;
  roundCount: Scalars["Int"]["input"];
  tableAssignments: PagingTableAssignmentCvt[];
  tableCount: Scalars["Int"]["input"];
}

export interface PartialGameVt {
  boardsPerRound: Scalars["Int"]["input"];
  clubId: Scalars["String"]["input"];
  createdAt: Scalars["AWSDateTime"]["input"];
  gameId: Scalars["String"]["input"];
  label?: InputMaybe<Scalars["String"]["input"]>;
  movement: Movement;
  roundCount: Scalars["Int"]["input"];
  tableAssignments: PagingTableAssignmentVt[];
  tableCount: Scalars["Int"]["input"];
}

export interface PartialPlayerAssignment {
  clubHumanDisplayName: Scalars["String"]["input"];
  clubHumanId: Scalars["String"]["input"];
  directionLetter: DirectionLetter;
}

export interface PlayerAssignment {
  __typename?: "PlayerAssignment";
  clubHumanDisplayName: Scalars["String"]["output"];
  clubHumanId: Scalars["String"]["output"];
  directionLetter: DirectionLetter;
}

export interface Query {
  __typename?: "Query";
  getClub?: Maybe<Club>;
  getGame?: Maybe<Game>;
  listClubDeviceRegistrations: ListClubDeviceRegistrationsOutput;
  listClubDevices: ListClubDevicesOutput;
  listClubHumans: ListClubHumansOutput;
  listGames: ListGamesOutput;
}

export interface QueryGetClubArgs {
  clubId: Scalars["String"]["input"];
}

export interface QueryGetGameArgs {
  input: GetGameInput;
}

export interface QueryListClubDeviceRegistrationsArgs {
  input: ListClubDeviceRegistrationsInput;
}

export interface QueryListClubDevicesArgs {
  input: ListClubDevicesInput;
}

export interface QueryListClubHumansArgs {
  input: ListClubHumansInput;
}

export interface QueryListGamesArgs {
  input: ListGamesInput;
}

export type Rank =
  | "ACE"
  | "EIGHT"
  | "FIVE"
  | "FOUR"
  | "JACK"
  | "KING"
  | "NINE"
  | "QUEEN"
  | "SEVEN"
  | "SIX"
  | "TEN"
  | "THREE"
  | "TWO";

export type Strain = "C" | "D" | "H" | "NT" | "S";

export interface Subscription {
  __typename?: "Subscription";
  onAssignPlayer?: Maybe<AssignPlayerResponse>;
  onDeleteClubHuman?: Maybe<ClubHuman>;
  onDeleteGame?: Maybe<Game>;
  onNotifyCreateClubDevice?: Maybe<ClubDeviceWithRegToken>;
  onNotifyCreateClubHuman?: Maybe<NotifyClubHuman>;
  onNotifyCreateGame?: Maybe<Game>;
  onNotifyDeleteClubDevice?: Maybe<EnqueueDeleteClubDeviceOutput>;
  onNotifyUpdateClubHuman?: Maybe<NotifyClubHuman>;
  onUnassignPlayers?: Maybe<UnassignPlayersResponse>;
  onUpdateBoardResult?: Maybe<UpdateBoardResultResponse>;
  onUpdateClubName?: Maybe<UpdateClubNameResponse>;
  onUpdateCurrentGameId?: Maybe<UpdateCurrentGameIdResponse>;
  onUpdateTableAssignment?: Maybe<UpdateTableAssignmentResponse>;
}

export interface SubscriptionOnAssignPlayerArgs {
  clubId: Scalars["String"]["input"];
}

export interface SubscriptionOnDeleteClubHumanArgs {
  clubId: Scalars["String"]["input"];
}

export interface SubscriptionOnDeleteGameArgs {
  clubId: Scalars["String"]["input"];
}

export interface SubscriptionOnNotifyCreateClubDeviceArgs {
  clubId: Scalars["String"]["input"];
}

export interface SubscriptionOnNotifyCreateClubHumanArgs {
  clubId: Scalars["String"]["input"];
}

export interface SubscriptionOnNotifyCreateGameArgs {
  clubId: Scalars["String"]["input"];
}

export interface SubscriptionOnNotifyDeleteClubDeviceArgs {
  clubId: Scalars["String"]["input"];
}

export interface SubscriptionOnNotifyUpdateClubHumanArgs {
  clubId: Scalars["String"]["input"];
}

export interface SubscriptionOnUnassignPlayersArgs {
  clubId: Scalars["String"]["input"];
}

export interface SubscriptionOnUpdateBoardResultArgs {
  clubId: Scalars["String"]["input"];
}

export interface SubscriptionOnUpdateClubNameArgs {
  clubId: Scalars["String"]["input"];
}

export interface SubscriptionOnUpdateCurrentGameIdArgs {
  clubId: Scalars["String"]["input"];
}

export interface SubscriptionOnUpdateTableAssignmentArgs {
  clubId: Scalars["String"]["input"];
}

export type Suit = "C" | "D" | "H" | "S";

export interface TableAssignment {
  clearClubDeviceId: Scalars["Boolean"]["input"];
  clubDeviceId?: InputMaybe<Scalars["String"]["input"]>;
  confirmed?: InputMaybe<Scalars["Boolean"]["input"]>;
  round?: InputMaybe<Scalars["Int"]["input"]>;
  roundWelcomeConfirmed?: InputMaybe<Scalars["Boolean"]["input"]>;
  tableNumber: Scalars["Int"]["input"];
}

export interface TableAssignmentCvt {
  __typename?: "TableAssignmentCVT";
  clubDeviceId?: Maybe<Scalars["String"]["output"]>;
  confirmed: Scalars["Boolean"]["output"];
  currentAsOf: Scalars["AWSDateTime"]["output"];
  playerAssignments: PlayerAssignment[];
  results: BoardResultC[];
  round: Scalars["Int"]["output"];
  roundWelcomeConfirmed: Scalars["Boolean"]["output"];
  tableNumber: Scalars["Int"]["output"];
}

export interface UnassignPlayersInput {
  clubDeviceId?: InputMaybe<Scalars["String"]["input"]>;
  clubId: Scalars["String"]["input"];
  gameId: Scalars["String"]["input"];
  tableNumber: Scalars["Int"]["input"];
}

export interface UnassignPlayersResponse {
  __typename?: "UnassignPlayersResponse";
  clubDeviceId?: Maybe<Scalars["String"]["output"]>;
  clubId: Scalars["String"]["output"];
  gameId: Scalars["String"]["output"];
  tableNumber: Scalars["Int"]["output"];
}

export interface UnexpectedErrorResponse {
  __typename?: "UnexpectedErrorResponse";
  neverGetsReturned: Scalars["String"]["output"];
}

export interface UpdateBoardResultInput {
  boardResult: BoardResult;
  clubId: Scalars["String"]["input"];
  gameId: Scalars["String"]["input"];
  tableNumber: Scalars["Int"]["input"];
}

export interface UpdateBoardResultResponse {
  __typename?: "UpdateBoardResultResponse";
  boardResult: BoardResultC;
  clientId: Scalars["String"]["output"];
  clubId: Scalars["String"]["output"];
  gameId: Scalars["String"]["output"];
  tableNumber: Scalars["Int"]["output"];
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
  newGameId?: InputMaybe<Scalars["String"]["input"]>;
}

export interface UpdateCurrentGameIdResponse {
  __typename?: "UpdateCurrentGameIdResponse";
  clubId: Scalars["String"]["output"];
  newCurrentGameId?: Maybe<Scalars["String"]["output"]>;
}

export interface UpdateTableAssignmentInput {
  clubId: Scalars["String"]["input"];
  gameId: Scalars["String"]["input"];
  tableAssignment: TableAssignment;
}

export interface UpdateTableAssignmentResponse {
  __typename?: "UpdateTableAssignmentResponse";
  clientId: Scalars["String"]["output"];
  clubId: Scalars["String"]["output"];
  gameId: Scalars["String"]["output"];
  tableAssignment: TableAssignmentCvt;
}
