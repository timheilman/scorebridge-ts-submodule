import { Query } from "./appsync";

type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

type QueryNames = keyof Omit<Query, "__typename">;

interface KeyedGeneratedQuery<NAME extends QueryNames, ARGS> {
  gql: GeneratedQuery<ARGS, Pick<Query, NAME>>;
  __queryName: NAME;
}

const createKeyedGeneratedQuery = <NAME extends QueryNames, ARGS>(
  queryGql: string,
  queryName: NAME,
) => {
  return {
    gql: queryGql,
    __queryName: queryName,
  } as KeyedGeneratedQuery<NAME, ARGS>;
};
export const qidToQueryGql = {
  getClub: createKeyedGeneratedQuery(
    /* GraphQL */ `
      query getClub($clubId: String!) {
        getClub(clubId: $clubId) {
          id
          name
          createdAt
          updatedAt
        }
      }
    `,
    "getClub",
  ),
  listClubDevices: createKeyedGeneratedQuery(
    /* GraphQL */ `
      query listClubDevices($clubId: String!, $nextToken: String, $limit: Int) {
        listClubDevices(clubId: $clubId, nextToken: $nextToken, limit: $limit) {
          items {
            clubDeviceId
            name
            table
          }
        }
      }
    `,
    "listClubDevices",
  ),
  getClubDevice: createKeyedGeneratedQuery(
    /* GraphQL */ `
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
    `,
    "getClubDevice",
  ),
};
