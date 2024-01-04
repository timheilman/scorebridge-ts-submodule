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
> = GeneratedSubscription<InputType, Pick<Subscription, SubscriptionName>> & {
  __subscriptionName: SubscriptionName;
};
export const subscriptionOnCreateClubDevice = /* GraphQL */ `
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
` as KeyedGeneratedSubscription<
  "onCreateClubDevice",
  SubscriptionOnCreateClubDeviceArgs
>;
export const subscriptionOnDeleteClubDevice = /* GraphQL */ `
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
` as KeyedGeneratedSubscription<
  "onDeleteClubDevice",
  SubscriptionOnDeleteClubDeviceArgs
>;

export const subscriptionOnUpdateClub = /* GraphQL */ `
  subscription OnUpdateClub($id: String!) {
    onUpdateClub(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
` as KeyedGeneratedSubscription<"onUpdateClub", SubscriptionOnUpdateClubArgs>;

export const subscriptionOnUpdateClubDevice = /* GraphQL */ `
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
` as KeyedGeneratedSubscription<
  "onUpdateClubDevice",
  SubscriptionOnUpdateClubDeviceArgs
>;
