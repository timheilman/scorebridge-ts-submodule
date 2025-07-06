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
  clubId: Scalars["String"]["input"];
  directionLetter: DirectionLetter;
  gameId: Scalars["String"]["input"];
  playerDisplayName: Scalars["String"]["input"];
  playerId: Scalars["String"]["input"];
  tableNumber: Scalars["Int"]["input"];
}

export interface AssignPlayerResponse {
  __typename?: "AssignPlayerResponse";
  clubDeviceId?: Maybe<Scalars["String"]["output"]>;
  clubId: Scalars["String"]["output"];
  directionLetter: DirectionLetter;
  gameId: Scalars["String"]["output"];
  playerDisplayName: Scalars["String"]["output"];
  playerId: Scalars["String"]["output"];
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

export interface CreateClubDeviceRegistrationInput {
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
  movement: Movement;
  roundCount: Scalars["Int"]["input"];
  tableCount: Scalars["Int"]["input"];
}

export interface CreatePlayerInput {
  clubId: Scalars["String"]["input"];
  playerDisplayName: Scalars["String"]["input"];
  playerId?: InputMaybe<Scalars["String"]["input"]>;
}

export interface DeleteClubAndAdminInput {
  clubId: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
}

export interface DeleteClubAndAdminResponse {
  __typename?: "DeleteClubAndAdminResponse";
  status: Scalars["String"]["output"];
}

export interface DeleteGameInput {
  clubId: Scalars["String"]["input"];
  gameId: Scalars["String"]["input"];
}

export interface DeletePlayerInput {
  clubId: Scalars["String"]["input"];
  playerId: Scalars["String"]["input"];
}

export type DirectionLetter = "E" | "N" | "S" | "W";

export type Doubling = "DOUBLE" | "NONE" | "REDOUBLE";

export interface EnqueueClubDeviceDeletionInput {
  clubDeviceId: Scalars["String"]["input"];
  clubId: Scalars["String"]["input"];
}

export interface EnqueueClubDeviceDeletionOutput {
  __typename?: "EnqueueClubDeviceDeletionOutput";
  clubDeviceId: Scalars["String"]["output"];
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

export interface ListPlayersInput {
  clubId: Scalars["String"]["input"];
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  nextToken?: InputMaybe<Scalars["String"]["input"]>;
}

export interface ListPlayersOutput {
  __typename?: "ListPlayersOutput";
  items: Maybe<Player>[];
  nextToken?: Maybe<Scalars["String"]["output"]>;
}

export type Movement = "HOWELL" | "MITCHELL" | "RAINBOW";

export interface Mutation {
  __typename?: "Mutation";
  assignPlayer: AssignPlayerResponse;
  createClub: CreateClubResponse;
  createClubDeviceRegistration: ClubDeviceRegistration;
  createGame: Game;
  createPlayer: Player;
  deleteClubAndAdmin: DeleteClubAndAdminResponse;
  deleteGame: Game;
  deletePlayer: Player;
  enqueueClubDeviceDeletion: ClubDevice;
  notifyClubDeviceCreated: ClubDeviceWithRegToken;
  notifyClubDeviceDeleted: EnqueueClubDeviceDeletionOutput;
  unassignPlayers: UnassignPlayersResponse;
  unexpectedError: UnexpectedErrorResponse;
  updateBoardResult: UpdateBoardResultResponse;
  updateClubName: UpdateClubNameResponse;
  updateCurrentGameId: UpdateCurrentGameIdResponse;
  updatePlayer: Player;
  updateTableAssignment: UpdateTableAssignmentResponse;
}

export interface MutationAssignPlayerArgs {
  input: AssignPlayerInput;
}

export interface MutationCreateClubArgs {
  input: CreateClubInput;
}

export interface MutationCreateClubDeviceRegistrationArgs {
  input: CreateClubDeviceRegistrationInput;
}

export interface MutationCreateGameArgs {
  input: CreateGameInput;
}

export interface MutationCreatePlayerArgs {
  input: CreatePlayerInput;
}

export interface MutationDeleteClubAndAdminArgs {
  input: DeleteClubAndAdminInput;
}

export interface MutationDeleteGameArgs {
  input: DeleteGameInput;
}

export interface MutationDeletePlayerArgs {
  input: DeletePlayerInput;
}

export interface MutationEnqueueClubDeviceDeletionArgs {
  input: EnqueueClubDeviceDeletionInput;
}

export interface MutationNotifyClubDeviceCreatedArgs {
  input: ClubDeviceCreated;
}

export interface MutationNotifyClubDeviceDeletedArgs {
  input: EnqueueClubDeviceDeletionInput;
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

export interface MutationUpdatePlayerArgs {
  input: UpdatePlayerInput;
}

export interface MutationUpdateTableAssignmentArgs {
  input: UpdateTableAssignmentInput;
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

export interface PartialGame {
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

export interface PartialPlayerAssignment {
  directionLetter: DirectionLetter;
  playerDisplayName: Scalars["String"]["input"];
  playerId: Scalars["String"]["input"];
}

export interface Player {
  __typename?: "Player";
  clubId: Scalars["String"]["output"];
  playerDisplayName: Scalars["String"]["output"];
  playerId: Scalars["String"]["output"];
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
  listClubDeviceRegistrations: ListClubDeviceRegistrationsOutput;
  listClubDevices: ListClubDevicesOutput;
  listGames: ListGamesOutput;
  listPlayers: ListPlayersOutput;
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

export interface QueryListGamesArgs {
  input: ListGamesInput;
}

export interface QueryListPlayersArgs {
  input: ListPlayersInput;
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
  onCreateGame?: Maybe<Game>;
  onCreatePlayer?: Maybe<Player>;
  onDeleteGame?: Maybe<Game>;
  onDeletePlayer?: Maybe<Player>;
  onNotifyClubDeviceCreated?: Maybe<ClubDeviceWithRegToken>;
  onNotifyClubDeviceDeleted?: Maybe<ClubDeviceWithRegToken>;
  onUnassignPlayers?: Maybe<UnassignPlayersResponse>;
  onUpdateBoardResult?: Maybe<UpdateBoardResultResponse>;
  onUpdateClubName?: Maybe<UpdateClubNameResponse>;
  onUpdateCurrentGameId?: Maybe<UpdateCurrentGameIdResponse>;
  onUpdatePlayer?: Maybe<Player>;
  onUpdateTableAssignment?: Maybe<UpdateTableAssignmentResponse>;
}

export interface SubscriptionOnAssignPlayerArgs {
  clubId: Scalars["String"]["input"];
}

export interface SubscriptionOnCreateGameArgs {
  clubId: Scalars["String"]["input"];
}

export interface SubscriptionOnCreatePlayerArgs {
  clubId: Scalars["String"]["input"];
}

export interface SubscriptionOnDeleteGameArgs {
  clubId: Scalars["String"]["input"];
}

export interface SubscriptionOnDeletePlayerArgs {
  clubId: Scalars["String"]["input"];
}

export interface SubscriptionOnNotifyClubDeviceCreatedArgs {
  clubId: Scalars["String"]["input"];
}

export interface SubscriptionOnNotifyClubDeviceDeletedArgs {
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

export interface SubscriptionOnUpdatePlayerArgs {
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

export interface UpdatePlayerInput {
  clubId: Scalars["String"]["input"];
  playerDisplayName: Scalars["String"]["input"];
  playerId: Scalars["String"]["input"];
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
