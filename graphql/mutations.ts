import * as GqlCodegenTypes from "./appsync";
import { Mutation } from "./appsync";

type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const mutationCreateClub = /* GraphQL */ `
  mutation createClub($input: CreateClubInput!) {
    createClub(input: $input) {
      clubId
      userId
    }
  }
` as GeneratedMutation<
  GqlCodegenTypes.MutationCreateClubArgs,
  // SCOR-143 here's the example type from the tutorial:
  // export type UpdateTodoMutation = {
  //   updateTodo?:  {
  //     __typename: "Todo",
  //     id: string,
  //     name: string,
  //     description?: string | null,
  //     createdAt: string,
  //     updatedAt: string,
  //   } | null,
  // };
  // So this should get the same thing:
  Pick<Mutation, "createClub">
>;

export const mutationUpdateClub = /* GraphQL */ `
  mutation updateClub($input: UpdateClubInput!) {
    updateClub(input: $input) {
      id
      name
      createdAt
      updatedAt
    }
  }
` as GeneratedMutation<
  GqlCodegenTypes.MutationUpdateClubArgs,
  Pick<Mutation, "updateClub">
>;

export const mutationCreateClubDevice = /* GraphQL */ `
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
` as GeneratedMutation<
  GqlCodegenTypes.MutationCreateClubDeviceArgs,
  Pick<Mutation, "createClubDevice">
>;

export const mutationUnexpectedError = /* GraphQL */ `
  mutation unexpectedError {
    unexpectedError {
      neverGetsReturned
    }
  }
` as GeneratedMutation<undefined, Pick<Mutation, "unexpectedError">>;

export const mutationDeleteClubAndAdmin = /* GraphQL */ `
  mutation deleteClubAndAdmin($input: DeleteClubAndAdminInput!) {
    deleteClubAndAdmin(input: $input) {
      status
    }
  }
` as GeneratedMutation<
  GqlCodegenTypes.MutationDeleteClubAndAdminArgs,
  Pick<Mutation, "deleteClubAndAdmin">
>;

export const mutationDeleteClubDevice = /* GraphQL */ `
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
  Pick<Mutation, "deleteClubDevice">
>;
