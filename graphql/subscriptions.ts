import * as GqlCodegenTypes from "./appsync";
import { Subscription } from "./appsync";

type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
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
` as GeneratedSubscription<
  GqlCodegenTypes.SubscriptionOnCreateClubDeviceArgs,
  Pick<Subscription, "onCreateClubDevice">
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
` as GeneratedSubscription<
  GqlCodegenTypes.SubscriptionOnDeleteClubDeviceArgs,
  Pick<Subscription, "onDeleteClubDevice">
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
` as GeneratedSubscription<
  GqlCodegenTypes.SubscriptionOnUpdateClubArgs,
  Pick<Subscription, "onUpdateClub">
>;

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
` as GeneratedSubscription<
  GqlCodegenTypes.SubscriptionOnUpdateClubDeviceArgs,
  Pick<Subscription, "onUpdateClubDevice">
>;
