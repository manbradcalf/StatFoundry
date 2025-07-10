import { Chunk } from "../Types/Chunk";
import { QueryType } from "../Enums/QueryType";
import { AliasType } from "../Enums/AliasType";
import { SlotType } from "../Enums/SlotType";
import { PLAYER_GAME_INFO_PROPERTIES } from "../Views/PlayerGameInfo";
import { RECEIVING_STATS } from "../Views/ReceivingStats";
import { RUSHING_STATS } from "../Views/RushingStats";
import { PASSING_STATS } from "../Views/PassingStats";

export const PLAYER_GAME_CHUNKS: Chunk[] = [
  {
    English: "return all player game stats",
    Cypher: `RETURN pg.${[...PLAYER_GAME_INFO_PROPERTIES, ...RUSHING_STATS.map(x => x.key), ...RECEIVING_STATS, ...PASSING_STATS].join(", pg.")} LIMIT 10`,
    QueryType: QueryType.RETURN,
    Requires: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
    Provides: [],
    Slots: [],
  },
  {
    English: "return player game rushing stats",
    Cypher: `RETURN pg.${[...PLAYER_GAME_INFO_PROPERTIES, ...RUSHING_STATS.map(x => x.key)].join(", pg.")} LIMIT 10`,
    QueryType: QueryType.RETURN,
    Requires: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
    Provides: [],
    Slots: [],
  },
  {
    English: "return player game receiving stats",
    Cypher: `RETURN pg.${[...PLAYER_GAME_INFO_PROPERTIES, ...RECEIVING_STATS].join(", pg.")} LIMIT 10`,
    QueryType: QueryType.RETURN,
    Requires: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
    Provides: [],
    Slots: [],
  },
  {
    English: "return player game rushing and receiving stats",
    Cypher: `RETURN pg.${[...PLAYER_GAME_INFO_PROPERTIES, ...RUSHING_STATS.map(x => x.key), ...RECEIVING_STATS].join(", pg.")} LIMIT 10`,
    QueryType: QueryType.RETURN,
    Requires: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
    Provides: [],
    Slots: [],
  },
  {
    English: "return player game passing stats",
    Cypher: `RETURN pg.${[...PLAYER_GAME_INFO_PROPERTIES, ...PASSING_STATS].join(", pg.")} LIMIT 10`,
    QueryType: QueryType.RETURN,
    Requires: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
    Provides: [],
    Slots: [],
  },
  {
    English: "who played for [MIN]",
    Cypher:
      "MATCH (p:Player)-[:HAD]->(pg:PlayerGame) WHERE pg.recent_team = 'MIN'",
    EnglishTemplate: "who played for {team} in those games",
    CypherTemplate:
      "MATCH (p:Player)-[:HAD]->(pg:PlayerGame) WHERE pg.recent_team = {team}",
    QueryType: QueryType.FILTER,
    Requires: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
    Provides: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
    Slots: [
      {
        Name: "team",
        Value: "MIN",
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "who played against [GB]",
    Cypher:
      "MATCH (p:Player)-[:HAD]->(pg:PlayerGame) WHERE pg.opponent_team = 'GB'",
    EnglishTemplate: "who played against {team} in those games",
    CypherTemplate:
      "MATCH (p:Player)-[:HAD]->(pg:PlayerGame) WHERE pg.opponent_team = {team}",
    QueryType: QueryType.FILTER,
    Requires: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
    Provides: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
    Slots: [
      {
        Name: "team",
        Value: "GB",
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "in games between the [2020] and [2024] seasons",
    Cypher: "WHERE pg.season >= 2020 AND pg.season <= 2024",
    EnglishTemplate:
      "in games between the {seasonStart} and {seasonEnd} seasons",
    CypherTemplate:
      "WHERE pg.season >= {seasonStart} AND pg.season <= {seasonEnd}",
    QueryType: QueryType.FILTER,
    Requires: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
    Provides: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
    Slots: [
      {
        Name: "seasonStart",
        Value: 2020,
        SlotValueTypes: [SlotType.FilterValue],
      },
      {
        Name: "seasonEnd",
        Value: 2024,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "and won",
    Cypher: `WHERE pg.won = true`,
    QueryType: QueryType.FILTER,
    Requires: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
    Provides: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
    Slots: [],
  },
  {
    English: "and lost",
    Cypher: `WHERE pg.won = false`,
    QueryType: QueryType.FILTER,
    Requires: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
    Provides: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
    Slots: [],
  },
  {
    English: "in a game during the [2024] season",
    Cypher: "MATCH (p:Player)-[:HAD]->(pg:PlayerGame) WHERE pg.season = 2024",
    EnglishTemplate: "in games during the {season} season",
    CypherTemplate:
      "MATCH (p:Player)-[:HAD]->(pg:PlayerGame) WHERE pg.season = {season}",
    QueryType: QueryType.FILTER,
    Requires: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
    Provides: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
    Slots: [
      {
        Name: "season",
        Value: 2024,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
];
