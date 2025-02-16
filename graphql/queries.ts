import {
  Query,
  QueryGetClubArgs,
  QueryGetGameArgs,
  QueryListClubDevicesArgs,
  QueryListGamesArgs,
  QueryListPlayersArgs,
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
          createdAt
          currentGameId
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
            clubId
            gameId
            movement
            tableCount
            roundCount
            boardsPerRound
            label
            createdAt
            tableAssignments {
              tableNumber
              confirmed
              round
              roundWelcomeConfirmed
              clubDeviceId
              playerAssignments {
                directionLetter
                playerId
                playerDisplayName
              }
              results {
                type
                board
                round
                level
                strain
                doubling
                declarer
                leadRank
                leadSuit
                wonTrickCount
                currentAsOf
              }
            }
          }
          nextToken
        }
      }
    `,
    "listGames",
  ),
  listPlayers: createKeyedGeneratedQuery<"listPlayers", QueryListPlayersArgs>(
    /* GraphQL */ `
      query listPlayers($input: ListPlayersInput!) {
        listPlayers(input: $input) {
          items {
            clubId
            playerId
            playerDisplayName
          }
          nextToken
        }
      }
    `,
    "listPlayers",
  ),
  getGame: createKeyedGeneratedQuery<"getGame", QueryGetGameArgs>(
    /* GraphQL */ `
      query getGame($input: GetGameInput!) {
        getGame(input: $input) {
          clubId
          gameId
          tableCount
          movement
          roundCount
          boardsPerRound
          label
          createdAt
          tableAssignments {
            tableNumber
            confirmed
            round
            roundWelcomeConfirmed
            clubDeviceId
            playerAssignments {
              directionLetter
              playerId
              playerDisplayName
            }
            results {
              type
              board
              round
              level
              strain
              doubling
              declarer
              leadRank
              leadSuit
              wonTrickCount
              currentAsOf
            }
          }
        }
      }
    `,
    "getGame",
  ),
};
