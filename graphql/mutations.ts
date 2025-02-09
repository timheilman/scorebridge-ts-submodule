import {
  Mutation,
  MutationAssignPlayerArgs,
  MutationAssignTableArgs,
  MutationConfirmTableAssignmentArgs,
  MutationCreateClubArgs,
  MutationCreateClubDeviceArgs,
  MutationCreateGameArgs,
  MutationCreatePlayerArgs,
  MutationDeleteClubAndAdminArgs,
  MutationDeleteClubDeviceArgs,
  MutationDeleteGameArgs,
  MutationDeletePlayerArgs,
  MutationSetRoundArgs,
  MutationUnassignPlayersArgs,
  MutationUnassignTableArgs,
  MutationUpdateBoardResultArgs,
  MutationUpdateClubNameArgs,
  MutationUpdateCurrentGameIdArgs,
  MutationUpdatePlayerArgs,
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
            confirmed
            round
            roundWelcomeConfirmed
            clubDeviceId
            playerAssignments {
              directionLetter
              playerId
              playerDisplayName
            }
            results {
              type
              board
              round
              level
              strain
              doubling
              declarer
              leadRank
              leadSuit
              wonTrickCount
            }
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
  assignTable: createKeyedGeneratedMutation<
    "assignTable",
    MutationAssignTableArgs
  >(
    /* GraphQL */ `
      mutation assignTable($input: AssignOrUnassignTableInput!) {
        assignTable(input: $input) {
          clubId
          clubDeviceId
          gameId
          tableNumber
          confirmed
          round
          roundWelcomeConfirmed
          playerAssignments {
            directionLetter
            playerId
            playerDisplayName
          }
          results {
            type
            board
            round
            level
            strain
            doubling
            declarer
            leadRank
            leadSuit
            wonTrickCount
          }
        }
      }
    `,
    "assignTable",
  ),
  confirmTableAssignment: createKeyedGeneratedMutation<
    "confirmTableAssignment",
    MutationConfirmTableAssignmentArgs
  >(
    /* GraphQL */ `
      mutation confirmTableAssignment($input: AssignOrUnassignTableInput!) {
        confirmTableAssignment(input: $input) {
          clubId
          clubDeviceId
          gameId
          tableNumber
          confirmed
        }
      }
    `,
    "confirmTableAssignment",
  ),
  setRound: createKeyedGeneratedMutation<"setRound", MutationSetRoundArgs>(
    /* GraphQL */ `
      mutation setRound($input: SetRoundInput!) {
        setRound(input: $input) {
          clubId
          clubDeviceId
          gameId
          tableNumber
          round
          roundWelcomeConfirmed
        }
      }
    `,
    "setRound",
  ),
  unassignTable: createKeyedGeneratedMutation<
    "unassignTable",
    MutationUnassignTableArgs
  >(
    /* GraphQL */ `
      mutation unassignTable($input: AssignOrUnassignTableInput!) {
        unassignTable(input: $input) {
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
          }
          upsertClientId
          upsertClientTimestamp
        }
      }
    `,
    "updateBoardResult",
  ),
};
