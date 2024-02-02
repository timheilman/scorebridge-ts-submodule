import {
  Subscription,
  SubscriptionOnClearCurrentGameIdArgs,
  SubscriptionOnCreateGameArgs,
  SubscriptionOnDeleteGameArgs,
  SubscriptionOnUpdateClubDeviceArgs,
  SubscriptionOnUpdateClubNameArgs,
  SubscriptionOnUpdateCurrentGameIdArgs,
  SubscriptionOnUpdateGameArgs,
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
  onUpdateClubDevice: createKeyedGeneratedSubscription<
    "onUpdateClubDevice",
    SubscriptionOnUpdateClubDeviceArgs
  >(
    /* GraphQL */ `
      subscription OnUpdateClubDevice($clubId: String!, $clubDeviceId: String) {
        onUpdateClubDevice(clubId: $clubId, clubDeviceId: $clubDeviceId) {
          clubId
          clubDeviceId
          name
          email
          table
          createdAt
          updatedAt
        }
      }
    `,
    "onUpdateClubDevice",
  ),
  onUpdateGame: createKeyedGeneratedSubscription<
    "onUpdateGame",
    SubscriptionOnUpdateGameArgs
  >(
    /* GraphQL */ `
      subscription OnUpdateGame($clubId: String!, $gameId: String!) {
        onUpdateGame(clubId: $clubId, gameId: $gameId) {
          gameId
          movement
          tableCount
          roundCount
          createdAt
          updatedAt
        }
      }
    `,
    "onUpdateGame",
  ),
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
          createdAt
          updatedAt
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
          movement
          tableCount
          roundCount
          createdAt
          updatedAt
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

  onClearCurrentGameId: createKeyedGeneratedSubscription<
    "onClearCurrentGameId",
    SubscriptionOnClearCurrentGameIdArgs
  >(
    /* GraphQL */ `
      subscription OnClearCurrentGameId($clubId: String!) {
        onClearCurrentGameId(clubId: $clubId) {
          clubId
        }
      }
    `,
    "onClearCurrentGameId",
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
} as const;
