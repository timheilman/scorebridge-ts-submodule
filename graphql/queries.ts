import {
  Query,
  QueryGetClubArgs,
  QueryGetGameArgs,
  QueryListClubDevicesArgs,
  QueryListGamesArgs,
} from "./appsync";

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
  getClub: createKeyedGeneratedQuery<"getClub", QueryGetClubArgs>(
    /* GraphQL */ `
      query getClub($clubId: String!) {
        getClub(clubId: $clubId) {
          id
          name
          currentGameId
          createdAt
        }
      }
    `,
    "getClub",
  ),
  listClubDevices: createKeyedGeneratedQuery<
    "listClubDevices",
    QueryListClubDevicesArgs
  >(
    /* GraphQL */ `
      query listClubDevices($clubId: String!, $nextToken: String, $limit: Int) {
        listClubDevices(clubId: $clubId, nextToken: $nextToken, limit: $limit) {
          items {
            clubDeviceId
            name
          }
          nextToken
        }
      }
    `,
    "listClubDevices",
  ),
  listGames: createKeyedGeneratedQuery<"listGames", QueryListGamesArgs>(
    /* GraphQL */ `
      query listGames($clubId: String!, $nextToken: String, $limit: Int) {
        listGames(clubId: $clubId, nextToken: $nextToken, limit: $limit) {
          items {
            clubId
            gameId
            movement
            tableCount
            roundCount
            createdAt
          }
          nextToken
        }
      }
    `,
    "listGames",
  ),
  getGame: createKeyedGeneratedQuery<"getGame", QueryGetGameArgs>(
    /* GraphQL */ `
      query getGame($clubId: String!, $gameId: String!) {
        getGame(clubId: $clubId, gameId: $gameId) {
          clubId
          gameId
          tableCount
          movement
          roundCount
          createdAt
          tableAssignments {
            tableNumber
            clubDeviceId
          }
        }
      }
    `,
    "getGame",
  ),
};
