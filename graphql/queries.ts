import gql from "graphql-tag";

import * as GqlCodegenTypes from "./appsync";
import { Query } from "./appsync";

type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getClubGql = /* GraphQL */ `
    query getClub($clubId: String!) {
        getClub(clubId: $clubId) {
            id
            name
            createdAt
            updatedAt
        }
    }
` as GeneratedQuery<GqlCodegenTypes.QueryGetClubArgs, Pick<Query, "getClub">>;

export const listClubDevicesGql = /* GraphQL */ `
    query listClubDevices($input: ListClubDevicesInput!) {
        listClubDevices(input: $input) {
            items {
                clubDeviceId
                name
                table
            }
        }
    }
` as GeneratedQuery<
  GqlCodegenTypes.QueryListClubDevicesArgs,
  Pick<Query, "listClubDevices">
>;

export const getClubDeviceGql = /* GraphQL */ `
    query getClubDevice($clubId: String!, $clubDeviceId: String!) {
        getClubDevice(clubId: $clubId, clubDeviceId: $clubDeviceId) {
            clubId
            clubDeviceId
            email
            name
            table
            createdAt
            updatedAt
        }
    }
` as GeneratedQuery<
  GqlCodegenTypes.QueryGetClubDeviceArgs,
  Pick<Query, "getClubDevice">
>;
