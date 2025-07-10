import {
  Mutation,
  MutationAssignPlayerArgs,
  MutationCreateClubDeviceRegistrationArgs,
  MutationCreatePlayerArgs,
  MutationDeleteClubAndAdminArgs,
  MutationDeleteGameArgs,
  MutationDeletePlayerArgs,
  MutationEnqueueCreateGameArgs,
  MutationEnqueueDeleteClubDeviceArgs,
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
          deviceName
          ttl
          regToken
          createdAt
          updatedAt
        }
      }
    `,
    "createClubDeviceRegistration",
  ),
  enqueueDeleteClubDevice: createKeyedGeneratedMutation<
    "enqueueDeleteClubDevice",
    MutationEnqueueDeleteClubDeviceArgs
  >(
    /* GraphQL */ `
      mutation enqueueDeleteClubDevice($input: EnqueueDeleteClubDeviceInput!) {
        enqueueDeleteClubDevice(input: $input) {
          clubId
          clubDeviceId
        }
      }
    `,
    "enqueueDeleteClubDevice",
  ),
  enqueueCreateGame: createKeyedGeneratedMutation<
    "enqueueCreateGame",
    MutationEnqueueCreateGameArgs
  >(
    /* GraphQL */ `
      mutation enqueueCreateGame($input: EnqueueCreateGameInput!) {
        enqueueCreateGame(input: $input) {
          gameId
          boardsPerRound
          clubId
          label
          movement
          roundCount
          tableCount
        }
      }
    `,
    "enqueueCreateGame",
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
