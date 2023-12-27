import gql from "graphql-tag";

import * as APITypes from "../API";
import * as GqlCodegenTypes from "./appsync";

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
` as GeneratedQuery<GqlCodegenTypes.QueryGetClubArgs, APITypes.GetClubQuery>;

export const listClubDevicesGql = /* GraphQL */ `
    query listClubDevices($input: ListClubDevicesInput!) {
        listClubDevices(input: $input) {
            clubDevices {
                clubDeviceId
                name
                table
            }
        }
    }
` as GeneratedQuery<GqlCodegenTypes.QueryListClubDevicesArgs, APITypes.ListClubDevicesQuery>;

export const queryListClubDevices = /* GraphQL */ `
    query listClubDevices($input: ListClubDevicesInput!) {
        listClubDevices(input: $input) {
            clubDevices {
                clubId
                clubDeviceId
                email
                name
                createdAt
                updatedAt
            }
        }
    }
` as GeneratedQuery<GqlCodegenTypes.QueryListClubDevicesArgs, APITypes.ListClubDevicesQuery>;
