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

interface SubscriptionOutputMap {
  onUpdateClub: Subscription["onUpdateClub"];
  onUpdateClubDevice: Subscription["onUpdateClubDevice"];
  onDeleteClubDevice: Subscription["onDeleteClubDevice"];
  onCreateClubDevice: Subscription["onCreateClubDevice"];
}
export type SubscriptionOutput<T extends SubscriptionNames> = NonNullable<
  SubscriptionOutputMap[T]
>;
export interface KeyedGeneratedSubscription<
  SubscriptionName extends SubscriptionNames,
  InputType,
> {
  __subscriptionName: SubscriptionName;
  gql: GeneratedSubscription<InputType, Pick<Subscription, SubscriptionName>>;
}

export const createKeyedGeneratedSubscription = <
  SubscriptionName extends SubscriptionNames,
  InputType,
>(
  subName: SubscriptionName,
  subGql: string,
): KeyedGeneratedSubscription<SubscriptionName, InputType> => {
  return {
    __subscriptionName: subName,
    gql: subGql as GeneratedSubscription<
      InputType,
      Pick<Subscription, SubscriptionName>
    >,
  };
};
export const subscriptionOnCreateClubDevice = createKeyedGeneratedSubscription<
  "onCreateClubDevice",
  SubscriptionOnCreateClubDeviceArgs
>(
  "onCreateClubDevice",
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
);
export const subscriptionOnDeleteClubDevice = createKeyedGeneratedSubscription<
  "onDeleteClubDevice",
  SubscriptionOnDeleteClubDeviceArgs
>(
  "onDeleteClubDevice",
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
);

export const subscriptionOnUpdateClub = createKeyedGeneratedSubscription<
  "onUpdateClub",
  SubscriptionOnUpdateClubArgs
>(
  "onUpdateClub",
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
);

export const subscriptionOnUpdateClubDevice = createKeyedGeneratedSubscription<
  "onUpdateClubDevice",
  SubscriptionOnUpdateClubDeviceArgs
>(
  "onUpdateClubDevice",
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
);
