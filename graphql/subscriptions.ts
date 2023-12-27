import * as APITypes from "../API";
import * as GqlCodegenTypes from "./appsync";

type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const subscriptionCreatedClubDevice = /* GraphQL */ `
  subscription CreatedClubDevice($clubId: String!) {
    createdClubDevice(clubId: $clubId) {
      clubDeviceId
      clubId
      createdAt
      email
      name
      updatedAt
    }
  }
` as GeneratedSubscription<
  GqlCodegenTypes.SubscriptionCreatedClubDeviceArgs,
  APITypes.OnCreateClubDeviceSubscription
>;
// ` as GeneratedMutation<
//     GqlCodegenTypes.MutationDeleteClubDeviceArgs,
//     APITypes.DeleteClubDeviceMutation
//   >;
export const subscriptionDeletedClubDevice = gql`
  subscription DeletedClubDevice($clubId: String!) {
    deletedClubDevice(clubId: $clubId) {
      clubDeviceId
      clubId
      createdAt
      email
      name
      updatedAt
    }
  }
`;

export const subscriptionUpdatedClub = gql`
  subscription UpdatedClub($id: String!) {
    updatedClub(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

export const subscriptionUpdatedClubDevice = gql`
  subscription UpdatedClubDevice($clubId: String!, $clubDeviceId: String) {
    updatedClubDevice(clubId: $clubId, clubDeviceId: $clubDeviceId) {
      clubId
      clubDeviceId
      name
      email
      table
      createdAt
      updatedAt
    }
  }
`;
