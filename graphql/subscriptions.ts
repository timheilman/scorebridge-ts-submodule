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

export type KeyedGeneratedSubscription<
  SubscriptionName extends SubscriptionNames,
  InputType,
> = GeneratedSubscription<InputType, Pick<Subscription, SubscriptionName>>;

export const createKeyedGeneratedSubscription = <
  SubscriptionName extends SubscriptionNames,
  InputType,
>(
  subGql: string,
): KeyedGeneratedSubscription<SubscriptionName, InputType> => {
  return subGql as GeneratedSubscription<
    InputType,
    Pick<Subscription, SubscriptionName>
  >;
};
export const subscriptionOnCreateClubDevice = createKeyedGeneratedSubscription<
  "onCreateClubDevice",
  SubscriptionOnCreateClubDeviceArgs
>(/* GraphQL */ `
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
`);
export const subscriptionOnDeleteClubDevice = createKeyedGeneratedSubscription<
  "onDeleteClubDevice",
  SubscriptionOnDeleteClubDeviceArgs
>(/* GraphQL */ `
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
`);

export const subscriptionOnUpdateClub = createKeyedGeneratedSubscription<
  "onUpdateClub",
  SubscriptionOnUpdateClubArgs
>(/* GraphQL */ `
  subscription OnUpdateClub($id: String!) {
    onUpdateClub(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`);

export const subscriptionOnUpdateClubDevice = createKeyedGeneratedSubscription<
  "onUpdateClubDevice",
  SubscriptionOnUpdateClubDeviceArgs
>(/* GraphQL */ `
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
`);
