import { Chunk } from "../Types/Chunk";
import { QueryType } from "../Enums/QueryType";
import { AliasType } from "../Enums/AliasType";

export const RETURN_CHUNKS: Chunk[] = [
  // {
  //   English: "return player and their games",
  //   Cypher: `CALL (p) {
  //       MATCH (p)-[:HAD]-(pg:PlayerGame)
  //       WITH p, collect(pg) as games
  //       RETURN p {.display_name, games: games } AS playerWithGames
  //     } RETURN playerWithGames`,
  //   QueryType: QueryType.RETURN,
  //   Provides: [],
  //   Requires: [{ Name: "p", Label: AliasType.Player }],
  //   Slots: [],
  // },
  // {
  //   English: "return player and their seasons",
  //   Cypher: `CALL (p) {
  //     MATCH (p)-[:HAD]-(ps:PlayerSeason)
  //     WITH p, collect(ps) as seasons
  //     RETURN p {.display_name, seasons: seasons } AS playerWithSeasons
  //   }`,
  //   QueryType: QueryType.RETURN,
  //   Provides: [],
  //   Requires: [{ Name: "p", Label: AliasType.Player }],
  //   Slots: [],
  // },
  // {
  //   English: "return player info",
  //   Cypher: `RETURN DISTINCT p LIMIT 10`,
  //   QueryType: QueryType.RETURN,
  //   Requires: [{ Name: "p", Label: AliasType.Player }],
  //   Provides: [],
  //   Slots: [],
  // },
  // {
  //   English: "return players by games count",
  //   Cypher: `CALL (p) {
  //     MATCH (p)-[:HAD]-(pg:PlayerGame)
  //     WITH p, collect(pg) as games
  //     RETURN DISTINCT p {.display_name, .position, .college_name, .draft_number, .rookie_year }, size(games) as count
  //     ORDER BY count DESC LIMIT 10
  //   }`,
  //   QueryType: QueryType.RETURN,
  //   Requires: [{ Name: "p", Label: AliasType.Player }],
  //   Provides: [],
  //   Slots: [],
  // },
  // {
  //   English: "return player rushing stats by season",
  //   Cypher: `RETURN ps.${[...PLAYER_SEASON_INFO_PROPERTIES, ...RUSHING_STATS].join(", ps.")} LIMIT 10`,
  //   QueryType: QueryType.RETURN,
  //   Inputs: [{ Name: "ps", Label: Label.PlayerSeason }],
  //   Outputs: [],
  //   Slots: [],
  // },
  // {
  //   English: "return player receiving stats by season",
  //   Cypher: `RETURN ps.${[...PLAYER_SEASON_INFO_PROPERTIES, ...RECEIVING_STATS].join(", ps.")} LIMIT 10`,
  //   QueryType: QueryType.RETURN,
  //   Inputs: [{ Name: "ps", Label: Label.PlayerSeason }],
  //   Outputs: [],
  //   Slots: [],
  // },
  // {
  //   English: "return player rushing and receiving stats by season",
  //   Cypher: `RETURN ps.${[...PLAYER_SEASON_INFO_PROPERTIES, ...RUSHING_STATS, ...RECEIVING_STATS].join(", ps.")} LIMIT 10`,
  //   QueryType: QueryType.RETURN,
  //   Inputs: [{ Name: "ps", Label: Label.PlayerSeason }],
  //   Outputs: [],
  //   Slots: [],
  // },
  // {
  //   English: "return player passing stats by game",
  //   Cypher: `RETURN pg.${[...PLAYER_SEASON_INFO_PROPERTIES, ...PASSING_STATS].join(", pg.")} LIMIT 10`,
  //   QueryType: QueryType.RETURN,
  //   Inputs: [{ Name: "pg", Label: Label.PlayerGame }],
  //   Outputs: [],
  //   Slots: [],
  // },
  // {
  //   English: "return player passing stats by season",
  //   Cypher: `RETURN ps.${[...PLAYER_SEASON_INFO_PROPERTIES, ...PASSING_STATS].join(", ps.")} LIMIT 10`,
  //   QueryType: QueryType.RETURN,
  //   Inputs: [{ Name: "ps", Label: Label.PlayerSeason }],
  //   Outputs: [],
  //   Slots: [],
  // },
];
