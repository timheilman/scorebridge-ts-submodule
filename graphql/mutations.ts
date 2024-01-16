import {
  Mutation,
  MutationClearCurrentGameIdArgs,
  MutationCreateClubArgs,
  MutationCreateClubDeviceArgs,
  MutationCreateGameArgs,
  MutationDeleteClubAndAdminArgs,
  MutationDeleteClubDeviceArgs,
  MutationDeleteGameArgs,
  MutationUpdateClubDeviceArgs,
  MutationUpdateClubNameArgs,
  MutationUpdateCurrentGameIdArgs,
  MutationUpdateGameArgs,
} from "./appsync";

type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};
export type MutationNames = keyof Omit<Mutation, "__typename">;
export interface KeyedGeneratedMutation<NAME extends MutationNames, ARGS> {
  gql: GeneratedMutation<ARGS, Pick<Mutation, NAME>>;
  __mutationName: NAME;
}

const createKeyedGeneratedMutation = <NAME extends MutationNames, ARGS>(
  mutGql: string,
  mutationName: NAME,
) => {
  return {
    gql: mutGql,
    __mutationName: mutationName,
  } as KeyedGeneratedMutation<NAME, ARGS>;
};

export const mutIdToMutGql = {
  createClub: createKeyedGeneratedMutation<
    "createClub",
    MutationCreateClubArgs
  >(
    /* GraphQL */ `
      mutation createClub($input: CreateClubInput!) {
        createClub(input: $input) {
          clubId
          userId
        }
      }
    `,
    "createClub",
  ),
  updateClubName: createKeyedGeneratedMutation<
    "updateClubName",
    MutationUpdateClubNameArgs
  >(
    /* GraphQL */ `
      mutation updateClubName($clubId: String!, $newName: String!) {
        updateClubName(clubId: $clubId, newName: $newName) {
          clubId
          oldClubName
          newClubName
        }
      }
    `,
    "updateClubName",
  ),
  updateCurrentGameId: createKeyedGeneratedMutation<
    "updateCurrentGameId",
    MutationUpdateCurrentGameIdArgs
  >(
    /* GraphQL */ `
      mutation updateCurrentGameId($clubId: String!, $newGameId: String!) {
        updateCurrentGameId(clubId: $clubId, newGameId: $newGameId) {
          clubId
          oldCurrentGameId
          newCurrentGameId
        }
      }
    `,
    "updateCurrentGameId",
  ),
  clearCurrentGameId: createKeyedGeneratedMutation<
    "clearCurrentGameId",
    MutationClearCurrentGameIdArgs
  >(
    /* GraphQL */ `
      mutation clearCurrentGameId($clubId: String!) {
        clearCurrentGameId(clubId: $clubId) {
          clubId
          oldCurrentGameId
        }
      }
    `,
    "clearCurrentGameId",
  ),
  createClubDevice: createKeyedGeneratedMutation<
    "createClubDevice",
    MutationCreateClubDeviceArgs
  >(
    /* GraphQL */ `
      mutation createClubDevice($input: CreateClubDeviceInput!) {
        createClubDevice(input: $input) {
          clubId
          clubDeviceId
          name
          email
          createdAt
          updatedAt
        }
      }
    `,
    "createClubDevice",
  ),
  unexpectedError: createKeyedGeneratedMutation<"unexpectedError", undefined>(
    /* GraphQL */ `
      mutation unexpectedError {
        unexpectedError {
          neverGetsReturned
        }
      }
    `,
    "unexpectedError",
  ),
  deleteClubAndAdmin: createKeyedGeneratedMutation<
    "deleteClubAndAdmin",
    MutationDeleteClubAndAdminArgs
  >(
    /* GraphQL */ `
      mutation deleteClubAndAdmin($input: DeleteClubAndAdminInput!) {
        deleteClubAndAdmin(input: $input) {
          status
        }
      }
    `,
    "deleteClubAndAdmin",
  ),
  deleteClubDevice: createKeyedGeneratedMutation<
    "deleteClubDevice",
    MutationDeleteClubDeviceArgs
  >(
    /* GraphQL */ `
      mutation DeleteClubDevice($input: DeleteClubDeviceInput!) {
        deleteClubDevice(input: $input) {
          clubId
          clubDeviceId
          name
          email
          createdAt
          updatedAt
        }
      }
    `,
    "deleteClubDevice",
  ),
  updateClubDevice: createKeyedGeneratedMutation<
    "updateClubDevice",
    MutationUpdateClubDeviceArgs
  >(
    /* GraphQL */ `
      mutation updateClubDevice($input: UpdateClubDeviceInput!) {
        updateClubDevice(input: $input) {
          clubId
          clubDeviceId
          email
          name
          table
          createdAt
          updatedAt
        }
      }
    `,
    "updateClubDevice",
  ),
  createGame: createKeyedGeneratedMutation<
    "createGame",
    MutationCreateGameArgs
  >(
    /* GraphQL */ `
      mutation createGame($input: CreateGameInput!) {
        createGame(input: $input) {
          clubId
          gameId
          movement
          tableCount
          roundCount
          createdAt
          updatedAt
        }
      }
    `,
    "createGame",
  ),
  updateGame: createKeyedGeneratedMutation<
    "updateGame",
    MutationUpdateGameArgs
  >(
    /* GraphQL */ `
      mutation updateGame($input: UpdateGameInput!) {
        updateGame(input: $input) {
          clubId
          gameId
          movement
          tableCount
          roundCount
          createdAt
          updatedAt
        }
      }
    `,
    "updateGame",
  ),
  deleteGame: createKeyedGeneratedMutation<
    "deleteGame",
    MutationDeleteGameArgs
  >(
    /* GraphQL */ `
      mutation deleteGame($input: DeleteGameInput!) {
        deleteGame(input: $input) {
          clubId
          gameId
          movement
          tableCount
          roundCount
          createdAt
          updatedAt
        }
      }
    `,
    "deleteGame",
  ),
};
