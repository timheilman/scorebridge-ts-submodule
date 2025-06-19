import {
  Mutation,
  MutationAssignPlayerArgs,
  MutationCreateClubArgs,
  MutationCreateClubDeviceRegistrationArgs,
  MutationCreateGameArgs,
  MutationCreatePlayerArgs,
  MutationDeleteClubAndAdminArgs,
  MutationDeleteClubDeviceArgs,
  MutationDeleteGameArgs,
  MutationDeletePlayerArgs,
  MutationUnassignPlayersArgs,
  MutationUpdateBoardResultArgs,
  MutationUpdateClubNameArgs,
  MutationUpdateCurrentGameIdArgs,
  MutationUpdatePlayerArgs,
  MutationUpdateTableAssignmentArgs,
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
      mutation updateClubName($input: UpdateClubNameInput!) {
        updateClubName(input: $input) {
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
      mutation updateCurrentGameId($input: UpdateCurrentGameIdInput!) {
        updateCurrentGameId(input: $input) {
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
  createClubDeviceRegistration: createKeyedGeneratedMutation<
    "createClubDeviceRegistration",
    MutationCreateClubDeviceRegistrationArgs
  >(
    /* GraphQL */ `
      mutation createClubDeviceRegistration(
        $input: CreateClubDeviceRegistrationInput!
      ) {
        createClubDeviceRegistration(input: $input) {
          clubId
          clubDeviceId
          name
          email
          createdAt
        }
      }
    `,
    "createClubDeviceRegistration",
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
          boardsPerRound
          clubId
          createdAt
          gameId
          label
          movement
          roundCount
          tableAssignments {
            clubDeviceId
            confirmed
            currentAsOf
            playerAssignments {
              directionLetter
              playerDisplayName
              playerId
            }
            results {
              board
              confirmed
              currentAsOf
              declarer
              doubling
              leadRank
              leadSuit
              level
              round
              strain
              type
              wonTrickCount
            }
            round
            roundWelcomeConfirmed
            tableNumber
          }
          tableCount
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
  createPlayer: createKeyedGeneratedMutation<
    "createPlayer",
    MutationCreatePlayerArgs
  >(
    /* GraphQL */ `
      mutation createPlayer($input: CreatePlayerInput!) {
        createPlayer(input: $input) {
          clubId
          playerId
          playerDisplayName
        }
      }
    `,
    "createPlayer",
  ),
  updatePlayer: createKeyedGeneratedMutation<
    "updatePlayer",
    MutationUpdatePlayerArgs
  >(
    /* GraphQL */ `
      mutation updatePlayer($input: UpdatePlayerInput!) {
        updatePlayer(input: $input) {
          clubId
          playerId
          playerDisplayName
        }
      }
    `,
    "updatePlayer",
  ),
  deletePlayer: createKeyedGeneratedMutation<
    "deletePlayer",
    MutationDeletePlayerArgs
  >(
    /* GraphQL */ `
      mutation deletePlayer($input: DeletePlayerInput!) {
        deletePlayer(input: $input) {
          clubId
          playerId
          playerDisplayName
        }
      }
    `,
    "deletePlayer",
  ),
  updateTableAssignment: createKeyedGeneratedMutation<
    "updateTableAssignment",
    MutationUpdateTableAssignmentArgs
  >(
    /* GraphQL */ `
      mutation updateTableAssignment($input: UpdateTableAssignmentInput!) {
        updateTableAssignment(input: $input) {
          clubId
          gameId
          clientId
          tableAssignment {
            tableNumber
            clubDeviceId
            confirmed
            round
            roundWelcomeConfirmed
            currentAsOf
            playerAssignments {
              directionLetter
              playerId
              playerDisplayName
            }
            results {
              board
              round
              type
              level
              strain
              doubling
              declarer
              leadRank
              leadSuit
              wonTrickCount
              confirmed
              currentAsOf
            }
          }
        }
      }
    `,
    "updateTableAssignment",
  ),
  assignPlayer: createKeyedGeneratedMutation<
    "assignPlayer",
    MutationAssignPlayerArgs
  >(
    /* GraphQL */ `
      mutation assignPlayer($input: AssignPlayerInput!) {
        assignPlayer(input: $input) {
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
  unassignPlayers: createKeyedGeneratedMutation<
    "unassignPlayers",
    MutationUnassignPlayersArgs
  >(
    /* GraphQL */ `
      mutation unassignPlayers($input: UnassignPlayersInput!) {
        unassignPlayers(input: $input) {
          clubId
          clubDeviceId
          gameId
          tableNumber
        }
      }
    `,
    "unassignPlayers",
  ),
  updateBoardResult: createKeyedGeneratedMutation<
    "updateBoardResult",
    MutationUpdateBoardResultArgs
  >(
    /* GraphQL */ `
      mutation updateBoardResult($input: UpdateBoardResultInput!) {
        updateBoardResult(input: $input) {
          clubId
          tableNumber
          gameId
          boardResult {
            board
            round
            type
            level
            strain
            declarer
            doubling
            leadSuit
            leadRank
            wonTrickCount
            confirmed
            currentAsOf
          }
          clientId
        }
      }
    `,
    "updateBoardResult",
  ),
};
