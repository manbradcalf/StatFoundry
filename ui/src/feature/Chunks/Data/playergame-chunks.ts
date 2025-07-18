import { Chunk } from "../Types/Chunk";
import { QueryType } from "../Enums/QueryType";
import { AliasType } from "../Enums/AliasType";
import { SlotType } from "../Enums/SlotType";

export const PLAYER_GAME_CHUNKS: Chunk[] = [
  {
    English: "games for [team]",
    Cypher: "MATCH (p:Player)-[:HAD]->(pg:PlayerGame) WHERE pg.recent_team = 'MIN'",
    EnglishTemplate: "who played for {team} in those games",
    CypherTemplate: "MATCH (p:Player)-[:HAD]->(pg:PlayerGame) WHERE pg.recent_team = {team}",
    QueryType: QueryType.FILTER_START,
    Requires: [{ Name: "p", AliasType: AliasType.Player }],
    Provides: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
    Slots: [
      {
        Name: "team",
        Value: "MIN",
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
    SuggestionKeywords: ["games", "game"]
  },
  {
    English: "games against [team]",
    Cypher: "MATCH (p:Player)-[:HAD]->(pg:PlayerGame) WHERE pg.opponent_team = 'MIN'",
    EnglishTemplate: "who played against {team} in those games",
    CypherTemplate: "MATCH (p:Player)-[:HAD]->(pg:PlayerGame) WHERE pg.opponent_team = {team}",
    QueryType: QueryType.FILTER_START,
    Requires: [{ Name: "p", AliasType: AliasType.Player }],
    Provides: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
    Slots: [
      {
        Name: "team",
        Value: "GB",
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
    SuggestionKeywords: ["games", "game"]
  },
  {
    English: "...and played for [team] in those games",
    Cypher: "AND pg.recent_team = {team}",
    EnglishTemplate: "who played for {team} in those games",
    CypherTemplate: "AND pg.recent_team = {team}",
    QueryType: QueryType.FILTER_EXTEND,
    Requires: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
    Provides: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
    Slots: [
      {
        Name: "team",
        Value: "MIN",
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
    SuggestionKeywords: ["games", "game"]
  },
  {
    English: "...and played against [team] in those games",
    Cypher: "AND pg.opponent_team = {team}",
    EnglishTemplate: "who played against {team} in those games",
    CypherTemplate: "AND pg.opponent_team = {team}",
    QueryType: QueryType.FILTER_EXTEND,
    Requires: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
    Provides: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
    Slots: [
      {
        Name: "team",
        Value: "GB",
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
    SuggestionKeywords: ["games", "game", "versus", "vs","against"]
  },
  {
    English: "in games between the [2020] and [2024] seasons",
    Cypher: "AND pg.season >= {seasonStart} AND pg.season <= {seasonEnd}",
    EnglishTemplate: "in games between the {seasonStart} and {seasonEnd} seasons",
    CypherTemplate: "AND pg.season >= {seasonStart} AND pg.season <= {seasonEnd}",
    QueryType: QueryType.FILTER_EXTEND,
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
    SuggestionKeywords: ["games", "game", "between", "between"]
  },
  {
    English: "...and won",
    Cypher: `AND pg.won = true`,
    QueryType: QueryType.FILTER_EXTEND,
    Requires: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
    Provides: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
    Slots: [],
    SuggestionKeywords: ["won", "lost"]
  },
  {
    English: "...and lost",
    Cypher: `AND pg.won <> true`,
    QueryType: QueryType.FILTER_EXTEND,
    Requires: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
    Provides: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
    Slots: [],
    SuggestionKeywords: ["won", "lost"]
  },
  {
    English: "in a game during the [2024] season",
    Cypher: "MATCH (p:Player)-[:HAD]->(pg:PlayerGame) WHERE pg.season = 2024",
    EnglishTemplate: "in games during the {season} season",
    CypherTemplate: "MATCH (p:Player)-[:HAD]->(pg:PlayerGame) WHERE pg.season = {season}",
    QueryType: QueryType.FILTER_START,
    Requires: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
    Provides: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
    Slots: [
      {
        Name: "season",
        Value: 2024,
        SlotValueTypes: [SlotType.FilterValue],
      }
    ],
    SuggestionKeywords: ["games", "game", "during", "during"]
  },
];
