import * as APITypes from "../API";
import * as GqlCodegenTypes from "./appsync";

type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const mutationCreateClub = gql`
  mutation createClub($input: CreateClubInput!) {
    createClub(input: $input) {
      clubId
      userId
    }
  }
`;

export const mutationUpdateClub = gql`
  mutation updateClub($input: UpdateClubInput!) {
    updateClub(input: $input) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

export const mutationCreateClubDevice = gql`
  mutation createClubDevice($input: CreateClubDeviceInput!) {
    createClubDevice(input: $input) {
      clubId
      clubDeviceId
      name
      email
      createdAt
      updatedAt
    }
  }
`;

export const mutationUnexpectedError = gql`
  mutation unexpectedError {
    unexpectedError {
      neverGetsReturned
    }
  }
`;

export const mutationDeleteClubAndAdmin = gql`
  mutation deleteClubAndAdmin($input: DeleteClubAndAdminInput!) {
    deleteClubAndAdmin(input: $input) {
      status
    }
  }
`;

// export const deleteTodo = /* GraphQL */ `mutation DeleteTodo(
//   $input: DeleteTodoInput!
//   $condition: ModelTodoConditionInput
// ) {
//   deleteTodo(input: $input, condition: $condition) {
//     id
//     name
//     description
//     createdAt
//     updatedAt
//     __typename
//   }
// }
// ` as GeneratedMutation<
//   APITypes.DeleteTodoMutationVariables,
//   APITypes.DeleteTodoMutation
// >;

export const mutationDeleteClubDevice = /* GraphQL */`
  mutation DeleteClubDevice($input: DeleteClubDeviceInput!) {
    deleteClubDevice(input: $input) {
      clubId
      clubDeviceId
      name
      email
      createdAt
      updatedAt
    }
  }
` as GeneratedMutation<
    GqlCodegenTypes.MutationDeleteClubDeviceArgs,
    APITypes.DeleteClubDeviceMutation
  >;
