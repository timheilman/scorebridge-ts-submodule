import {
  Mutation,
  MutationAssignPlayerArgs,
  MutationAssignTableArgs,
  MutationChangeRoundArgs,
  MutationCreateClubArgs,
  MutationCreateClubDeviceArgs,
  MutationCreateGameArgs,
  MutationDeleteClubAndAdminArgs,
  MutationDeleteClubDeviceArgs,
  MutationDeleteGameArgs,
  MutationUnassignTableArgs,
  MutationUpdateClubNameArgs,
  MutationUpdateCurrentGameIdArgs,
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
          newCurrentGameId
        }
      }
    `,
    "updateCurrentGameId",
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
        }
      }
    `,
    "createClubDevice",
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
        }
      }
    `,
    "deleteClubDevice",
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
          label
          movement
          boardsPerRound
          tableAssignments {
            tableNumber
            clubDeviceId
          }
          tableCount
          roundCount
          boardsPerRound
          createdAt
        }
      }
    `,
    "createGame",
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
          label
          movement
          tableCount
          roundCount
          boardsPerRound
          createdAt
        }
      }
    `,
    "deleteGame",
  ),
  assignTable: createKeyedGeneratedMutation<
    "assignTable",
    MutationAssignTableArgs
  >(
    /* GraphQL */ `
      mutation assignTable(
        $clubId: String!
        $clubDeviceId: String!
        $gameId: String!
        $tableNumber: Int!
      ) {
        assignTable(
          clubId: $clubId
          clubDeviceId: $clubDeviceId
          gameId: $gameId
          tableNumber: $tableNumber
        ) {
          clubId
          clubDeviceId
          gameId
          tableNumber
          round
          playerAssignments {
            directionLetter
            playerId
            playerDisplayName
          }
          results {
            board
            level
            strain
            doubling
            declarer
            leadRank
            leadSuit
            result
          }
        }
      }
    `,
    "assignTable",
  ),
  unassignTable: createKeyedGeneratedMutation<
    "unassignTable",
    MutationUnassignTableArgs
  >(
    /* GraphQL */ `
      mutation unassignTable(
        $clubId: String!
        $clubDeviceId: String!
        $gameId: String!
        $tableNumber: Int!
      ) {
        unassignTable(
          clubId: $clubId
          clubDeviceId: $clubDeviceId
          gameId: $gameId
          tableNumber: $tableNumber
        ) {
          clubId
          clubDeviceId
          gameId
          tableNumber
        }
      }
    `,
    "unassignTable",
  ),
  assignPlayer: createKeyedGeneratedMutation<
    "assignPlayer",
    MutationAssignPlayerArgs
  >(
    /* GraphQL */ `
      mutation assignPlayer(
        $clubId: String!
        $clubDeviceId: String!
        $gameId: String!
        $tableNumber: Int!
        $directionLetter: DirectionLetter!
        $playerId: String!
        $playerDisplayName: String!
      ) {
        assignPlayer(
          clubId: $clubId
          clubDeviceId: $clubDeviceId
          gameId: $gameId
          tableNumber: $tableNumber
          directionLetter: $directionLetter
          playerId: $playerId
          playerDisplayName: $playerDisplayName
        ) {
          clubId
          clubDeviceId
          gameId
          tableNumber
          directionLetter
          playerId
          playerDisplayName
        }
      }
    `,
    "assignPlayer",
  ),
  changeRound: createKeyedGeneratedMutation<
    "changeRound",
    MutationChangeRoundArgs
  >(
    /* GraphQL */ `
      mutation changeRound(
        $clubId: String!
        $clubDeviceId: String!
        $gameId: String!
        $tableNumber: Int!
        $round: Int!
      ) {
        changeRound(
          clubId: $clubId
          clubDeviceId: $clubDeviceId
          gameId: $gameId
          tableNumber: $tableNumber
          round: $round
        ) {
          clubId
          clubDeviceId
          gameId
          tableNumber
          round
        }
      }
    `,
    "changeRound",
  ),
};
