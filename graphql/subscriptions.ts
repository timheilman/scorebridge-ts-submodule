import {
  Subscription,
  SubscriptionOnCreateClubDeviceArgs,
  SubscriptionOnCreateGameArgs,
  SubscriptionOnDeleteClubDeviceArgs,
  SubscriptionOnDeleteGameArgs,
  SubscriptionOnUpdateClubArgs,
  SubscriptionOnUpdateClubDeviceArgs,
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
  onCreateClubDevice: createKeyedGeneratedSubscription<
    "onCreateClubDevice",
    SubscriptionOnCreateClubDeviceArgs
  >(
    /* GraphQL */ `
      subscription OnCreateClubDevice($clubId: String!) {
        onCreateClubDevice(clubId: $clubId) {
          clubDeviceId
          clubId
          createdAt
          email
          name
          updatedAt
        }
      }
    `,
    "onCreateClubDevice",
  ),
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
  onDeleteClubDevice: createKeyedGeneratedSubscription<
    "onDeleteClubDevice",
    SubscriptionOnDeleteClubDeviceArgs
  >(
    /* GraphQL */ `
      subscription OnDeleteClubDevice($clubId: String!) {
        onDeleteClubDevice(clubId: $clubId) {
          clubDeviceId
          clubId
          createdAt
          email
          name
          updatedAt
        }
      }
    `,
    "onDeleteClubDevice",
  ),
  onUpdateClub: createKeyedGeneratedSubscription<
    "onUpdateClub",
    SubscriptionOnUpdateClubArgs
  >(
    /* GraphQL */ `
      subscription OnUpdateClub($id: String!) {
        onUpdateClub(id: $id) {
          id
          name
          createdAt
          updatedAt
        }
      }
    `,
    "onUpdateClub",
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
  onUpdateGame: createKeyedGeneratedSubscription<
    "onUpdateGame",
    SubscriptionOnUpdateGameArgs
  >(
    /* GraphQL */ `
      subscription OnUpdateGame($clubId: String!) {
        onUpdateGame(clubId: $clubId) {
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
} as const;
