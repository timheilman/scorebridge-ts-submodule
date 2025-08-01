import {
  Subscription,
  SubscriptionOnAssignPlayerArgs,
  SubscriptionOnCreatePlayerArgs,
  SubscriptionOnDeleteGameArgs,
  SubscriptionOnDeletePlayerArgs,
  SubscriptionOnNotifyCreateClubDeviceArgs,
  SubscriptionOnNotifyCreateGameArgs,
  SubscriptionOnNotifyDeleteClubDeviceArgs,
  SubscriptionOnUnassignPlayersArgs,
  SubscriptionOnUpdateBoardResultArgs,
  SubscriptionOnUpdateClubNameArgs,
  SubscriptionOnUpdateCurrentGameIdArgs,
  SubscriptionOnUpdatePlayerArgs,
  SubscriptionOnUpdateTableAssignmentArgs,
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
  onNotifyCreateGame: createKeyedGeneratedSubscription<
    "onNotifyCreateGame",
    SubscriptionOnNotifyCreateGameArgs
  >(
    /* GraphQL */ `
      subscription OnNotifyCreateGame($clubId: String!) {
        onNotifyCreateGame(clubId: $clubId) {
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
    "onNotifyCreateGame",
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
  onUpdateTableAssignment: createKeyedGeneratedSubscription<
    "onUpdateTableAssignment",
    SubscriptionOnUpdateTableAssignmentArgs
  >(
    /* GraphQL */ `
      subscription OnUpdateTableAssignment($clubId: String!) {
        onUpdateTableAssignment(clubId: $clubId) {
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
    "onUpdateTableAssignment",
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
  onUnassignPlayers: createKeyedGeneratedSubscription<
    "onUnassignPlayers",
    SubscriptionOnUnassignPlayersArgs
  >(
    /* GraphQL */ `
      subscription OnUnassignPlayers($clubId: String!) {
        onUnassignPlayers(clubId: $clubId) {
          clubId
          gameId
          clubDeviceId
          tableNumber
        }
      }
    `,
    "onUnassignPlayers",
  ),
  onUpdateBoardResult: createKeyedGeneratedSubscription<
    "onUpdateBoardResult",
    SubscriptionOnUpdateBoardResultArgs
  >(
    /* GraphQL */ `
      subscription OnUpdateBoardResult($clubId: String!) {
        onUpdateBoardResult(clubId: $clubId) {
          clubId
          tableNumber
          gameId
          boardResult {
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
            confirmed
            currentAsOf
          }
          clientId
        }
      }
    `,
    "onUpdateBoardResult",
  ),
  onCreatePlayer: createKeyedGeneratedSubscription<
    "onCreatePlayer",
    SubscriptionOnCreatePlayerArgs
  >(
    /* GraphQL */ `
      subscription OnCreatePlayer($clubId: String!) {
        onCreatePlayer(clubId: $clubId) {
          playerId
          playerDisplayName
        }
      }
    `,
    "onCreatePlayer",
  ),
  onUpdatePlayer: createKeyedGeneratedSubscription<
    "onUpdatePlayer",
    SubscriptionOnUpdatePlayerArgs
  >(
    /* GraphQL */ `
      subscription OnUpdatePlayer($clubId: String!) {
        onUpdatePlayer(clubId: $clubId) {
          playerId
          playerDisplayName
        }
      }
    `,
    "onUpdatePlayer",
  ),
  onDeletePlayer: createKeyedGeneratedSubscription<
    "onDeletePlayer",
    SubscriptionOnDeletePlayerArgs
  >(
    /* GraphQL */ `
      subscription OnDeletePlayer($clubId: String!) {
        onDeletePlayer(clubId: $clubId) {
          playerId
        }
      }
    `,
    "onDeletePlayer",
  ),
  onNotifyCreateClubDevice: createKeyedGeneratedSubscription<
    "onNotifyCreateClubDevice",
    SubscriptionOnNotifyCreateClubDeviceArgs
  >(
    /* GraphQL */ `
      subscription OnNotifyCreateClubDevice($clubId: String!) {
        onNotifyCreateClubDevice(clubId: $clubId) {
          clubId
          clubDeviceId
          name
          email
          createdAt
          regToken
        }
      }
    `,
    "onNotifyCreateClubDevice",
  ),
  onNotifyDeleteClubDevice: createKeyedGeneratedSubscription<
    "onNotifyDeleteClubDevice",
    SubscriptionOnNotifyDeleteClubDeviceArgs
  >(
    /* GraphQL */ `
      subscription OnNotifyDeleteClubDevice($clubId: String!) {
        onNotifyDeleteClubDevice(clubId: $clubId) {
          clubId
          clubDeviceId
        }
      }
    `,
    "onNotifyDeleteClubDevice",
  ),
} as const;
