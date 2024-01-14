import {
  Subscription,
  SubscriptionOnCreateClubDeviceArgs,
  SubscriptionOnDeleteClubDeviceArgs,
  SubscriptionOnUpdateClubArgs,
  SubscriptionOnUpdateClubDeviceArgs,
} from "./appsync";

export type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export type SubscriptionNames = keyof Omit<Subscription, "__typename">;

export interface KeyedGeneratedSubscription<
  SubscriptionName extends SubscriptionNames,
  InputType,
> {
  gql: GeneratedSubscription<InputType, Pick<Subscription, SubscriptionName>>;
  __subscriptionName: SubscriptionName;
}

export const createKeyedGeneratedSubscription = <
  SubscriptionName extends SubscriptionNames,
  InputType,
>(
  subGql: string,
  subscriptionName: SubscriptionName,
): KeyedGeneratedSubscription<SubscriptionName, InputType> => {
  return {
    gql: subGql,
    __subscriptionName: subscriptionName,
  } as KeyedGeneratedSubscription<SubscriptionName, InputType>;
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
  // onCreateGame: createKeyedGeneratedSubscription<
  //   "onCreateGame",
  //   SubscriptionOnCreateGameArgs
  // >(
  //   /* GraphQL */ `
  //     subscription OnCreateGame($clubId: String!) {
  //       onCreateGame(clubId: $clubId) {
  //         id
  //         name
  //         createdAt
  //         updatedAt
  //       }
  //     }
  //   `,
  //   "onCreateGame",
  // ),
} as const;
