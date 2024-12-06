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
export type MakeEmpty<T extends Record<string, unknown>, K extends keyof T> = Partial<Record<K, never>>;
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

export interface AssignOrUnassignTableInput {
  clubDeviceId: Scalars["String"]["input"];
  clubId: Scalars["String"]["input"];
  gameId: Scalars["String"]["input"];
  tableNumber: Scalars["Int"]["input"];
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

export interface AssignTableResponse {
  __typename?: "AssignTableResponse";
  clubDeviceId: Scalars["String"]["output"];
  clubId: Scalars["String"]["output"];
  confirmed?: Maybe<Scalars["Boolean"]["output"]>;
  gameId: Scalars["String"]["output"];
  playerAssignments: PlayerAssignment[];
  results: BoardResult[];
  round?: Maybe<Scalars["Int"]["output"]>;
  roundWelcomeConfirmed?: Maybe<Scalars["Boolean"]["output"]>;
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
  type?: Maybe<BoardResultType>;
}

export type BoardResultType = "PASSED_OUT";

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

export interface ConfirmTableAssignmentResponse {
  __typename?: "ConfirmTableAssignmentResponse";
  clubDeviceId: Scalars["String"]["output"];
  clubId: Scalars["String"]["output"];
  confirmed: Scalars["Boolean"]["output"];
  gameId: Scalars["String"]["output"];
  tableNumber: Scalars["Int"]["output"];
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

export interface DeleteClubDeviceInput {
  clubDeviceId: Scalars["String"]["input"];
  clubId: Scalars["String"]["input"];
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

export type Doubling = "DOUBLE" | "REDOUBLE";

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

export interface Mutation {
  __typename?: "Mutation";
  assignPlayer: AssignPlayerResponse;
  assignTable: AssignTableResponse;
  confirmTableAssignment: ConfirmTableAssignmentResponse;
  createClub: CreateClubResponse;
  createClubDevice: ClubDevice;
  createGame: Game;
  createPlayer: Player;
  deleteClubAndAdmin: DeleteClubAndAdminResponse;
  deleteClubDevice: ClubDevice;
  deleteGame: Game;
  deletePlayer: Player;
  setRound: SetRoundResponse;
  unassignPlayers: UnassignPlayersResponse;
  unassignTable: UnassignTableResponse;
  unexpectedError: UnexpectedErrorResponse;
  updateClubName: UpdateClubNameResponse;
  updateCurrentGameId: UpdateCurrentGameIdResponse;
  updatePlayer: Player;
  upsertBoardResult: UpsertBoardResultResponse;
}

export interface MutationAssignPlayerArgs {
  input: AssignPlayerInput;
}

export interface MutationAssignTableArgs {
  input: AssignOrUnassignTableInput;
}

export interface MutationConfirmTableAssignmentArgs {
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

export interface MutationCreatePlayerArgs {
  input: CreatePlayerInput;
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

export interface MutationDeletePlayerArgs {
  input: DeletePlayerInput;
}

export interface MutationSetRoundArgs {
  input: SetRoundInput;
}

export interface MutationUnassignPlayersArgs {
  input: UnassignPlayersInput;
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

export interface MutationUpdatePlayerArgs {
  input: UpdatePlayerInput;
}

export interface MutationUpsertBoardResultArgs {
  input: UpsertBoardResultInput;
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
  type?: InputMaybe<BoardResultType>;
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
  clubDeviceId?: InputMaybe<Scalars["String"]["input"]>;
  confirmed?: InputMaybe<Scalars["Boolean"]["input"]>;
  playerAssignments: PartialPlayerAssignment[];
  results: PartialBoardResult[];
  round?: InputMaybe<Scalars["Int"]["input"]>;
  roundWelcomeConfirmed?: InputMaybe<Scalars["Boolean"]["input"]>;
  tableNumber: Scalars["Int"]["input"];
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

export interface SetRoundInput {
  clubDeviceId: Scalars["String"]["input"];
  clubId: Scalars["String"]["input"];
  gameId: Scalars["String"]["input"];
  round: Scalars["Int"]["input"];
  roundWelcomeConfirmed: Scalars["Boolean"]["input"];
  tableNumber: Scalars["Int"]["input"];
}

export interface SetRoundResponse {
  __typename?: "SetRoundResponse";
  clubDeviceId: Scalars["String"]["output"];
  clubId: Scalars["String"]["output"];
  gameId: Scalars["String"]["output"];
  round: Scalars["Int"]["output"];
  roundWelcomeConfirmed: Scalars["Boolean"]["output"];
  tableNumber: Scalars["Int"]["output"];
}

export type Strain = "C" | "D" | "H" | "NT" | "S";

export interface Subscription {
  __typename?: "Subscription";
  onAssignPlayer?: Maybe<AssignPlayerResponse>;
  onAssignTable?: Maybe<AssignTableResponse>;
  onCreateGame?: Maybe<Game>;
  onCreatePlayer?: Maybe<Player>;
  onDeleteGame?: Maybe<Game>;
  onDeletePlayer?: Maybe<Player>;
  onSetRound?: Maybe<SetRoundResponse>;
  onUnassignPlayers?: Maybe<UnassignPlayersResponse>;
  onUnassignTable?: Maybe<UnassignTableResponse>;
  onUpdateClubName?: Maybe<UpdateClubNameResponse>;
  onUpdateCurrentGameId?: Maybe<UpdateCurrentGameIdResponse>;
  onUpdatePlayer?: Maybe<Player>;
  onUpsertBoardResult?: Maybe<UpsertBoardResultResponse>;
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

export interface SubscriptionOnCreatePlayerArgs {
  clubId: Scalars["String"]["input"];
}

export interface SubscriptionOnDeleteGameArgs {
  clubId: Scalars["String"]["input"];
}

export interface SubscriptionOnDeletePlayerArgs {
  clubId: Scalars["String"]["input"];
}

export interface SubscriptionOnSetRoundArgs {
  clubId: Scalars["String"]["input"];
}

export interface SubscriptionOnUnassignPlayersArgs {
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

export interface SubscriptionOnUpdatePlayerArgs {
  clubId: Scalars["String"]["input"];
}

export interface SubscriptionOnUpsertBoardResultArgs {
  clubId: Scalars["String"]["input"];
}

export type Suit = "C" | "D" | "H" | "S";

export interface TableAssignment {
  __typename?: "TableAssignment";
  clubDeviceId?: Maybe<Scalars["String"]["output"]>;
  confirmed?: Maybe<Scalars["Boolean"]["output"]>;
  playerAssignments: PlayerAssignment[];
  results: BoardResult[];
  round?: Maybe<Scalars["Int"]["output"]>;
  roundWelcomeConfirmed?: Maybe<Scalars["Boolean"]["output"]>;
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

export interface UpsertBoardResultInput {
  clubDeviceId?: InputMaybe<Scalars["String"]["input"]>;
  clubId: Scalars["String"]["input"];
  gameId: Scalars["String"]["input"];
  partialBoardResult: PartialBoardResult;
  tableNumber: Scalars["Int"]["input"];
}

export interface UpsertBoardResultResponse {
  __typename?: "UpsertBoardResultResponse";
  boardResult: BoardResult;
  clubId: Scalars["String"]["output"];
  gameId: Scalars["String"]["output"];
  tableNumber: Scalars["Int"]["output"];
}
