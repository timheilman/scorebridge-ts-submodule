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

export interface ClearCurrentGameIdResponse {
  __typename?: "ClearCurrentGameIdResponse";
  oldCurrentGameId?: Maybe<Scalars["String"]["output"]>;
}

export interface Club {
  __typename?: "Club";
  createdAt: Scalars["AWSDateTime"]["output"];
  currentGameId?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  updatedAt: Scalars["AWSDateTime"]["output"];
}

export interface ClubDevice {
  __typename?: "ClubDevice";
  clubDeviceId: Scalars["String"]["output"];
  clubId: Scalars["String"]["output"];
  createdAt: Scalars["AWSDateTime"]["output"];
  email: Scalars["AWSEmail"]["output"];
  name: Scalars["String"]["output"];
  table?: Maybe<Scalars["Int"]["output"]>;
  updatedAt: Scalars["AWSDateTime"]["output"];
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
  clubId: Scalars["String"]["input"];
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

export interface Game {
  __typename?: "Game";
  clubId: Scalars["String"]["output"];
  createdAt: Scalars["AWSDateTime"]["output"];
  gameId: Scalars["String"]["output"];
  movement: Scalars["String"]["output"];
  roundCount: Scalars["Int"]["output"];
  tableCount: Scalars["Int"]["output"];
  updatedAt: Scalars["AWSDateTime"]["output"];
}

export interface ListClubDevicesOutput {
  __typename?: "ListClubDevicesOutput";
  items: Maybe<ClubDevice>[];
  nextToken?: Maybe<Scalars["String"]["output"]>;
}

export interface ListGamesOutput {
  __typename?: "ListGamesOutput";
  items: Maybe<Game>[];
  nextToken?: Maybe<Scalars["String"]["output"]>;
}

export interface Mutation {
  __typename?: "Mutation";
  clearCurrentGameId: ClearCurrentGameIdResponse;
  createClub: CreateClubResponse;
  createClubDevice: ClubDevice;
  createGame: Game;
  deleteClubAndAdmin: DeleteClubAndAdminResponse;
  deleteClubDevice: ClubDevice;
  deleteGame: Game;
  unexpectedError: UnexpectedErrorResponse;
  updateClubDevice: ClubDevice;
  updateClubName: UpdateClubNameResponse;
  updateCurrentGameId: UpdateCurrentGameIdResponse;
  updateGame: Game;
}

export interface MutationClearCurrentGameIdArgs {
  clubId: Scalars["String"]["input"];
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

export interface MutationUpdateClubDeviceArgs {
  input: UpdateClubDeviceInput;
}

export interface MutationUpdateClubNameArgs {
  clubId: Scalars["String"]["input"];
  newName: Scalars["String"]["input"];
}

export interface MutationUpdateCurrentGameIdArgs {
  clubId: Scalars["String"]["input"];
  newGameId: Scalars["String"]["input"];
}

export interface MutationUpdateGameArgs {
  input: UpdateGameInput;
}

export interface Query {
  __typename?: "Query";
  getClub?: Maybe<Club>;
  getClubDevice: ClubDevice;
  getGame?: Maybe<Game>;
  listClubDevices: ListClubDevicesOutput;
  listGames: ListGamesOutput;
}

export interface QueryGetClubArgs {
  clubId: Scalars["String"]["input"];
}

export interface QueryGetClubDeviceArgs {
  clubDeviceId: Scalars["String"]["input"];
  clubId: Scalars["String"]["input"];
}

export interface QueryGetGameArgs {
  clubId: Scalars["String"]["input"];
  gameId: Scalars["String"]["input"];
}

export interface QueryListClubDevicesArgs {
  clubId: Scalars["String"]["input"];
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  nextToken?: InputMaybe<Scalars["String"]["input"]>;
}

export interface QueryListGamesArgs {
  clubId: Scalars["String"]["input"];
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  nextToken?: InputMaybe<Scalars["String"]["input"]>;
}

export interface Subscription {
  __typename?: "Subscription";
  onClearCurrentGameId?: Maybe<ClearCurrentGameIdResponse>;
  onCreateClubDevice?: Maybe<ClubDevice>;
  onCreateGame?: Maybe<Game>;
  onDeleteClubDevice?: Maybe<ClubDevice>;
  onDeleteGame?: Maybe<Game>;
  onUpdateClubDevice?: Maybe<ClubDevice>;
  onUpdateClubName?: Maybe<UpdateClubNameResponse>;
  onUpdateCurrentGameId?: Maybe<UpdateCurrentGameIdResponse>;
  onUpdateGame?: Maybe<Game>;
}

export interface SubscriptionOnClearCurrentGameIdArgs {
  clubId: Scalars["String"]["input"];
}

export interface SubscriptionOnCreateClubDeviceArgs {
  clubId: Scalars["String"]["input"];
}

export interface SubscriptionOnCreateGameArgs {
  clubId: Scalars["String"]["input"];
}

export interface SubscriptionOnDeleteClubDeviceArgs {
  clubId: Scalars["String"]["input"];
}

export interface SubscriptionOnDeleteGameArgs {
  clubId: Scalars["String"]["input"];
}

export interface SubscriptionOnUpdateClubDeviceArgs {
  clubDeviceId?: InputMaybe<Scalars["String"]["input"]>;
  clubId: Scalars["String"]["input"];
}

export interface SubscriptionOnUpdateClubNameArgs {
  clubId: Scalars["String"]["input"];
}

export interface SubscriptionOnUpdateCurrentGameIdArgs {
  clubId: Scalars["String"]["input"];
  id: Scalars["String"]["input"];
}

export interface SubscriptionOnUpdateGameArgs {
  clubId: Scalars["String"]["input"];
  gameId?: InputMaybe<Scalars["String"]["input"]>;
}

export interface UnexpectedErrorResponse {
  __typename?: "UnexpectedErrorResponse";
  neverGetsReturned: Scalars["String"]["output"];
}

export interface UpdateClubDeviceInput {
  clubDeviceId: Scalars["String"]["input"];
  clubId: Scalars["String"]["input"];
  deviceName?: InputMaybe<Scalars["String"]["input"]>;
  table?: InputMaybe<Scalars["Int"]["input"]>;
}

export interface UpdateClubNameResponse {
  __typename?: "UpdateClubNameResponse";
  newClubName: Scalars["String"]["output"];
  oldClubName?: Maybe<Scalars["String"]["output"]>;
}

export interface UpdateCurrentGameIdResponse {
  __typename?: "UpdateCurrentGameIdResponse";
  newCurrentGameId: Scalars["String"]["output"];
  oldCurrentGameId?: Maybe<Scalars["String"]["output"]>;
}

export interface UpdateGameInput {
  clubId: Scalars["String"]["input"];
  gameId: Scalars["String"]["input"];
  movement?: InputMaybe<Scalars["String"]["input"]>;
  roundCount?: InputMaybe<Scalars["Int"]["input"]>;
  tableCount?: InputMaybe<Scalars["Int"]["input"]>;
}
