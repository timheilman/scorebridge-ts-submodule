import {
  Subscription,
  SubscriptionOnAssignPlayerArgs,
  SubscriptionOnAssignResultArgs,
  SubscriptionOnAssignTableArgs,
  SubscriptionOnCreateGameArgs,
  SubscriptionOnDeleteGameArgs,
  SubscriptionOnUnassignTableArgs,
  SubscriptionOnUpdateClubNameArgs,
  SubscriptionOnUpdateCurrentGameIdArgs,
} from "./appsync";

export type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export type SubscriptionNames = keyof Omit<Subscription, "__typename">;

export interface KeyedGeneratedSubscription<
  NAME extends SubscriptionNames,
  ARGS,
> {
  gql: GeneratedSubscription<ARGS, Pick<Subscription, NAME>>;
  __subscriptionName: NAME;
}

export const createKeyedGeneratedSubscription = <
  NAME extends SubscriptionNames,
  ARGS,
>(
  subGql: string,
  subscriptionName: NAME,
) => {
  return {
    gql: subGql,
    __subscriptionName: subscriptionName,
  } as KeyedGeneratedSubscription<NAME, ARGS>;
};
export const subIdToSubGql = {
  onCreateGame: createKeyedGeneratedSubscription<
    "onCreateGame",
    SubscriptionOnCreateGameArgs
  >(
    /* GraphQL */ `
      subscription OnCreateGame($clubId: String!) {
        onCreateGame(clubId: $clubId) {
          gameId
          movement
          tableCount
          roundCount
          label
          boardsPerRound
          tableAssignments {
            tableNumber
            clubDeviceId
          }
          createdAt
        }
      }
    `,
    "onCreateGame",
  ),
  onDeleteGame: createKeyedGeneratedSubscription<
    "onDeleteGame",
    SubscriptionOnDeleteGameArgs
  >(
    /* GraphQL */ `
      subscription OnDeleteGame($clubId: String!) {
        onDeleteGame(clubId: $clubId) {
          gameId
        }
      }
    `,
    "onDeleteGame",
  ),

  onUpdateCurrentGameId: createKeyedGeneratedSubscription<
    "onUpdateCurrentGameId",
    SubscriptionOnUpdateCurrentGameIdArgs
  >(
    /* GraphQL */ `
      subscription OnUpdateCurrentGameId($clubId: String!) {
        onUpdateCurrentGameId(clubId: $clubId) {
          newCurrentGameId
        }
      }
    `,
    "onUpdateCurrentGameId",
  ),

  onUpdateClubName: createKeyedGeneratedSubscription<
    "onUpdateClubName",
    SubscriptionOnUpdateClubNameArgs
  >(
    /* GraphQL */ `
      subscription OnUpdateClubName($clubId: String!) {
        onUpdateClubName(clubId: $clubId) {
          clubId
          newClubName
        }
      }
    `,
    "onUpdateClubName",
  ),
  onAssignTable: createKeyedGeneratedSubscription<
    "onAssignTable",
    SubscriptionOnAssignTableArgs
  >(
    /* GraphQL */ `
      subscription OnAssignTable($clubId: String!) {
        onAssignTable(clubId: $clubId) {
          clubId
          gameId
          clubDeviceId
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
    "onAssignTable",
  ),
  onUnassignTable: createKeyedGeneratedSubscription<
    "onUnassignTable",
    SubscriptionOnUnassignTableArgs
  >(
    /* GraphQL */ `
      subscription OnUnassignTable($clubId: String!) {
        onUnassignTable(clubId: $clubId) {
          clubId
          gameId
          clubDeviceId
          tableNumber
        }
      }
    `,
    "onUnassignTable",
  ),
  onAssignPlayer: createKeyedGeneratedSubscription<
    "onAssignPlayer",
    SubscriptionOnAssignPlayerArgs
  >(
    /* GraphQL */ `
      subscription OnAssignPlayer($clubId: String!) {
        onAssignPlayer(clubId: $clubId) {
          clubId
          gameId
          clubDeviceId
          tableNumber
          directionLetter
          playerId
          playerDisplayName
        }
      }
    `,
    "onAssignPlayer",
  ),
  onAssignResult: createKeyedGeneratedSubscription<
    "onAssignResult",
    SubscriptionOnAssignResultArgs
  >(
    /* GraphQL */ `
      subscription OnAssignResult($clubId: String!) {
        onAssignResult(clubId: $clubId) {
          clubId
          tableNumber
          boardResult {
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
    "onAssignResult",
  ),
} as const;
