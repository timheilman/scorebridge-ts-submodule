import type {
  Query,
  QueryGetClubArgs,
  QueryGetGameArgs,
  QueryListClubDeviceRegistrationsArgs,
  QueryListClubDevicesArgs,
  QueryListClubHumansArgs,
  QueryListGamesArgs,
} from "./appsync.js";

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
          createdAt
          currentGameId
        }
      }
    `,
    "getClub",
  ),
  listClubDeviceRegistrations: createKeyedGeneratedQuery<
    "listClubDeviceRegistrations",
    QueryListClubDeviceRegistrationsArgs
  >(
    /* GraphQL */ `
      query listClubDeviceRegistrations(
        $input: ListClubDeviceRegistrationsInput!
      ) {
        listClubDeviceRegistrations(input: $input) {
          items {
            clubId
            createdAt
            deviceName
            regToken
            ttl
            updatedAt
          }
          nextToken
        }
      }
    `,
    "listClubDeviceRegistrations",
  ),
  listClubDevices: createKeyedGeneratedQuery<
    "listClubDevices",
    QueryListClubDevicesArgs
  >(
    /* GraphQL */ `
      query listClubDevices($input: ListClubDevicesInput!) {
        listClubDevices(input: $input) {
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
      query listGames($input: ListGamesInput!) {
        listGames(input: $input) {
          items {
            boardsPerRound
            clubId
            createdAt
            gameId
            label
            movement
            roundCount
            tableAssignments {
              clubDeviceId
              confirmed
              currentAsOf
              playerAssignments {
                directionLetter
                displayName
                clubHumanId
              }
              results {
                board
                confirmed
                currentAsOf
                declarer
                doubling
                leadRank
                leadSuit
                level
                round
                strain
                type
                wonTrickCount
              }
              round
              roundWelcomeConfirmed
              tableNumber
            }
            tableCount
          }
          nextToken
        }
      }
    `,
    "listGames",
  ),
  listClubHumans: createKeyedGeneratedQuery<
    "listClubHumans",
    QueryListClubHumansArgs
  >(
    /* GraphQL */ `
      query listClubHumans($input: ListClubHumansInput!) {
        listClubHumans(input: $input) {
          items {
            clubId
            clubHumanId
            displayName
          }
          nextToken
        }
      }
    `,
    "listClubHumans",
  ),
  getGame: createKeyedGeneratedQuery<"getGame", QueryGetGameArgs>(
    /* GraphQL */ `
      query getGame($input: GetGameInput!) {
        getGame(input: $input) {
          boardsPerRound
          clubId
          createdAt
          gameId
          label
          movement
          roundCount
          tableAssignments {
            clubDeviceId
            confirmed
            currentAsOf
            playerAssignments {
              directionLetter
              displayName
              clubHumanId
            }
            results {
              board
              confirmed
              currentAsOf
              declarer
              doubling
              leadRank
              leadSuit
              level
              round
              strain
              type
              wonTrickCount
            }
            round
            roundWelcomeConfirmed
            tableNumber
          }
          tableCount
        }
      }
    `,
    "getGame",
  ),
};
