import {
  Mutation,
  MutationAssignBoardToBidArgs,
  MutationAssignContractArgs,
  MutationAssignInitialLeadArgs,
  MutationAssignPlayerArgs,
  MutationAssignResultArgs,
  MutationAssignTableArgs,
  MutationCreateClubArgs,
  MutationCreateClubDeviceArgs,
  MutationCreateGameArgs,
  MutationDeleteClubAndAdminArgs,
  MutationDeleteClubDeviceArgs,
  MutationDeleteGameArgs,
  MutationUnassignBoardToBidArgs,
  MutationUnassignContractArgs,
  MutationUnassignInitialLeadArgs,
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
      mutation assignTable($input: AssignOrUnassignTableInput!) {
        assignTable(input: $input) {
          clubId
          clubDeviceId
          gameId
          tableNumber
          playerAssignments {
            directionLetter
            playerId
            playerDisplayName
          }
          results {
            board
            round
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
  assignBoardToBid: createKeyedGeneratedMutation<
    "assignBoardToBid",
    MutationAssignBoardToBidArgs
  >(
    /* GraphQL */ `
      mutation assignBoardToBid($input: AssignBoardToBidInput!) {
        assignBoardToBid(input: $input) {
          board
          round
          type
          level
          strain
          declarer
          doubling
          leadSuit
          leadRank
        }
      }
    `,
    "assignBoardToBid",
  ),
  unassignBoardToBid: createKeyedGeneratedMutation<
    "unassignBoardToBid",
    MutationUnassignBoardToBidArgs
  >(
    /* GraphQL */ `
      mutation unassignBoardToBid($input: UnassignContractInput!) {
        unassignBoardToBid(input: $input) {
          board
          round
          type
          level
          strain
          declarer
          doubling
          leadSuit
          leadRank
        }
      }
    `,
    "unassignBoardToBid",
  ),
  assignContract: createKeyedGeneratedMutation<
    "assignContract",
    MutationAssignContractArgs
  >(
    /* GraphQL */ `
      mutation assignContract($input: AssignContractInput!) {
        assignContract(input: $input) {
          board
          round
          type
          level
          strain
          declarer
          doubling
          leadSuit
          leadRank
        }
      }
    `,
    "assignContract",
  ),
  assignResult: createKeyedGeneratedMutation<
    "assignResult",
    MutationAssignResultArgs
  >(
    /* GraphQL */ `
      mutation assignResult($input: AssignResultInput!) {
        assignResult(input: $input) {
          board
          round
          type
          level
          strain
          declarer
          doubling
          leadSuit
          leadRank
          result
        }
      }
    `,
    "assignResult",
  ),
  unassignContract: createKeyedGeneratedMutation<
    "unassignContract",
    MutationUnassignContractArgs
  >(
    /* GraphQL */ `
      mutation unassignContract($input: UnassignContractInput!) {
        unassignContract(input: $input) {
          board
          round
          type
          level
          strain
          declarer
          doubling
          leadSuit
          leadRank
          result
        }
      }
    `,
    "unassignContract",
  ),
  assignInitialLead: createKeyedGeneratedMutation<
    "assignInitialLead",
    MutationAssignInitialLeadArgs
  >(
    /* GraphQL */ `
      mutation assignInitialLead($input: AssignInitialLeadInput!) {
        assignInitialLead(input: $input) {
          board
          round
          type
          level
          strain
          declarer
          doubling
          leadSuit
          leadRank
        }
      }
    `,
    "assignInitialLead",
  ),
  unassignInitialLead: createKeyedGeneratedMutation<
    "unassignInitialLead",
    MutationUnassignInitialLeadArgs
  >(
    /* GraphQL */ `
      mutation unassignInitialLead($input: UnassignContractInput!) {
        unassignInitialLead(input: $input) {
          board
          round
          type
          level
          strain
          declarer
          doubling
          leadSuit
          leadRank
        }
      }
    `,
    "unassignInitialLead",
  ),
};
