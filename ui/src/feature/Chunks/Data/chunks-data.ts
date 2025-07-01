import { Chunk } from "../Types/Chunk";
import { QueryType } from "../Enums/QueryType";
import { Label } from "../Enums/Label";
import { SlotType } from "../Enums/SlotType";
import { PLAYER_GAME_INFO_PROPERTIES } from "../Views/PlayerGameInfo";
import { PASSING_STATS } from "../Views/PassingStats";
import { RECEIVING_STATS } from "../Views/ReceivingStats";
import { PLAYER_SEASON_INFO_PROPERTIES } from "../Views/PlayerSeasonInfo";
import { RUSHING_STATS } from "../Views/RushingStats";
import { PLAYER_INFO_CHUNKS } from "./player-info-chunks";
import { PLAYER_GAME_CHUNKS } from "./playergame-chunks";
import { PASSING_STATS_CHUNKS } from "./passing-stats-chunks";
import { RECEIVING_STATS_CHUNKS } from "./receiving-stats-chunks";
import { RUSHING_STATS_CHUNKS } from "./rushing-stats-chunks";
import { MATCH_ENTITY_CHUNKS } from "./match-entity-chunks";

export function getAvailableChunks(): Chunk[] {
  return [
    ...MATCH_ENTITY_CHUNKS,
    ...PLAYER_INFO_CHUNKS,
    ...PLAYER_GAME_CHUNKS,
    ...PASSING_STATS_CHUNKS,
    ...RECEIVING_STATS_CHUNKS,
    ...RUSHING_STATS_CHUNKS,
    // // Generic Filter Chunks
    // {
    //   English: "where player {property} {operator} {value}",
    //   Cypher: "WHERE p.{property} {operator} {value}",
    //   QueryType: QueryType.FILTER,
    //   Inputs: [{ Name: "p", Label: Label.Player }],
    //   Outputs: [{ Name: "p", Label: Label.Player }],
    //   Slots: [
    //     {
    //       Name: "property",
    //       Value: "position",
    //       SlotValueTypes: [SlotType.SelectPlayerProperty],
    //     },
    //     {
    //       Name: "operator",
    //       Value: "=",
    //       SlotValueTypes: [SlotType.FilterOperator],
    //     },
    //     {
    //       Name: "value",
    //       Value: "QB",
    //       SlotValueTypes: [SlotType.FilterValue],
    //     },
    //   ],
    // },
    // {
    //   English: "where player game {property} {operator} {value}",
    //   Cypher: "WHERE pg.{property} {operator} {value}",
    //   QueryType: QueryType.FILTER,
    //   Inputs: [{ Name: "pg", Label: Label.PlayerGame }],
    //   Outputs: [{ Name: "pg", Label: Label.PlayerGame }],
    //   Slots: [
    //     {
    //       Name: "property",
    //       Value: "season",
    //       SlotValueTypes: [
    //         SlotType.SelectPlayerGameProperty,
    //         SlotType.SelectRushingStats,
    //         SlotType.SelectPassingStats,
    //         SlotType.SelectReceivingStats,
    //       ],
    //     },
    //     {
    //       Name: "operator",
    //       Value: "=",
    //       SlotValueTypes: [SlotType.FilterOperator],
    //     },
    //     {
    //       Name: "value",
    //       Value: 2024,
    //       SlotValueTypes: [SlotType.FilterValue],
    //     },
    //   ],
    // },
    // {
    //   English:
    //     "where player had passing stats for season {property} {operator} {value}",
    //   Cypher: "WHERE ps.{property} {operator} {value}",
    //   QueryType: QueryType.FILTER,
    //   Inputs: [{ Name: "ps", Label: Label.PlayerSeason }],
    //   Outputs: [{ Name: "ps", Label: Label.PlayerSeason }],
    //   Slots: [
    //     {
    //       Name: "property",
    //       Value: "season",
    //       SlotValueTypes: [
    //         SlotType.SelectPlayerSeasonProperty,
    //         SlotType.SelectPassingStats,
    //       ],
    //     },
    //     {
    //       Name: "operator",
    //       Value: "=",
    //       SlotValueTypes: [SlotType.FilterOperator],
    //     },
    //     {
    //       Name: "value",
    //       Value: 2024,
    //       SlotValueTypes: [SlotType.FilterValue],
    //     },
    //   ],
    // },
    // {
    //   English: "where team {property} {operator} {value}",
    //   Cypher: "WHERE t.{property} {operator} {value}",
    //   QueryType: QueryType.FILTER,
    //   Inputs: [{ Name: "t", Label: Label.Team }],
    //   Outputs: [{ Name: "t", Label: Label.Team }],
    //   Slots: [
    //     {
    //       Name: "property",
    //       Value: "name",
    //       SlotValueTypes: [SlotType.SelectPlayerProperty],
    //     },
    //     {
    //       Name: "operator",
    //       Value: "=",
    //       SlotValueTypes: [SlotType.FilterOperator],
    //     },
    //     {
    //       Name: "value",
    //       Value: "Bills",
    //       SlotValueTypes: [SlotType.FilterValue],
    //     },
    //   ],
    // },
    // {
    //   English: "where player {property} is between {min} and {max}",
    //   Cypher: "WHERE p.{property} >= {min} AND p.{property} <= {max}",
    //   QueryType: QueryType.FILTER,
    //   Inputs: [{ Name: "p", Label: Label.Player }],
    //   Outputs: [{ Name: "p", Label: Label.Player }],
    //   Slots: [
    //     {
    //       Name: "property",
    //       Value: "weight",
    //       SlotValueTypes: [SlotType.SelectPlayerProperty],
    //     },
    //     {
    //       Name: "min",
    //       Value: 200,
    //       SlotValueTypes: [SlotType.FilterValue],
    //     },
    //     {
    //       Name: "max",
    //       Value: 250,
    //       SlotValueTypes: [SlotType.FilterValue],
    //     },
    //   ],
    // },
    // {
    //   English: "where player game {property} is between {min} and {max}",
    //   Cypher: "WHERE pg.{property} >= {min} AND pg.{property} <= {max}",
    //   QueryType: QueryType.FILTER,
    //   Inputs: [{ Name: "pg", Label: Label.PlayerGame }],
    //   Outputs: [{ Name: "pg", Label: Label.PlayerGame }],
    //   Slots: [
    //     {
    //       Name: "property",
    //       Value: "season",
    //       SlotValueTypes: [SlotType.SelectPlayerProperty],
    //     },
    //     {
    //       Name: "min",
    //       Value: 2023,
    //       SlotValueTypes: [SlotType.FilterValue],
    //     },
    //     {
    //       Name: "max",
    //       Value: 2024,
    //       SlotValueTypes: [SlotType.FilterValue],
    //     },
    //   ],
    // },
    // {
    //   English: "where player {property} contains {value}",
    //   Cypher: "WHERE p.{property} CONTAINS {value}",
    //   QueryType: QueryType.FILTER,
    //   Inputs: [{ Name: "p", Label: Label.Player }],
    //   Outputs: [{ Name: "p", Label: Label.Player }],
    //   Slots: [
    //     {
    //       Name: "property",
    //       Value: "display_name",
    //       SlotValueTypes: [SlotType.SelectPlayerProperty],
    //     },
    //     {
    //       Name: "value",
    //       Value: "Allen",
    //       SlotValueTypes: [SlotType.FilterValue],
    //     },
    //   ],
    // },
    // {
    //   English: "where player {property} is null",
    //   Cypher: "WHERE p.{property} IS NULL",
    //   QueryType: QueryType.FILTER,
    //   Inputs: [{ Name: "p", Label: Label.Player }],
    //   Outputs: [{ Name: "p", Label: Label.Player }],
    //   Slots: [
    //     {
    //       Name: "property",
    //       Value: "team_abbr",
    //       SlotValueTypes: [SlotType.SelectPlayerProperty],
    //     },
    //   ],
    // },
    // {
    //   English: "where player {property} is not null",
    //   Cypher: "WHERE p.{property} IS NOT NULL",
    //   QueryType: QueryType.FILTER,
    //   Inputs: [{ Name: "p", Label: Label.Player }],
    //   Outputs: [{ Name: "p", Label: Label.Player }],
    //   Slots: [
    //     {
    //       Name: "property",
    //       Value: "team_abbr",
    //       SlotValueTypes: [SlotType.SelectPlayerProperty],
    //     },
    //   ],
    // },

    // Legacy specific filters (keeping for backward compatibility)
    // {
    //   English: "who play {position}",
    //   Cypher: "WHERE p.position = {position}",
    //   QueryType: QueryType.FILTER,
    //   Inputs: [{ Name: "p", Label: Label.Player }],
    //   Outputs: [{ Name: "p", Label: Label.Player }],
    //   Slots: [
    //     {
    //       Name: "position",
    //       Value: "RB",
    //       SlotValueTypes: [SlotType.SelectPlayerPosition],
    //     },
    //   ],
    // },
    // {
    //   English: "who played between {s1} and {s2}",
    //   Cypher:
    //     "MATCH (p:Player)-[:HAD]->(ps:PlayerSeason) WHERE ps.season >= {s1} AND ps.season <= {s2}",
    //   QueryType: QueryType.FILTER,
    //   Inputs: [{ Name: "p", Label: Label.Player }],
    //   Outputs: [
    //     { Name: "p", Label: Label.Player },
    //     { Name: "ps", Label: Label.PlayerSeason },
    //   ],
    //   Slots: [
    //     {
    //       Name: "s1",
    //       Value: 2024,
    //       SlotValueTypes: [SlotType.FilterValue],
    //     },
    //     {
    //       Name: "s2",
    //       Value: 2025,
    //       SlotValueTypes: [SlotType.FilterValue],
    //     },
    //   ],
    // },
    // {
    //   English: "between the {s1} and {s2} seasons",
    //   Cypher: "WHERE pg.season >= {s1} AND pg.season <= {s2}",
    //   QueryType: QueryType.FILTER,
    //   Inputs: [{ Name: "pg", Label: Label.PlayerGame }],
    //   Outputs: [{ Name: "pg", Label: Label.PlayerGame }],
    //   Slots: [
    //     {
    //       Name: "s1"
    //       Value: 2024,
    //       SlotValueTypes: [SlotType.FilterValue],
    //     },
    //     {
    //       Name: "s2",
    //       Value: 2025,
    //       SlotValueTypes: [SlotType.FilterValue],
    //     },
    //   ],
    // },
    // {
    //   English: "between the {s1} and {s2} seasons",
    //   Cypher: "WHERE tg.season >= {s1} AND tg.season <= {s2}",
    //   QueryType: QueryType.FILTER,
    //   Inputs: [{ Name: "tg", Label: Label.TeamGame }],
    //   Outputs: [{ Name: "tg", Label: Label.TeamGame }],
    //   Slots: [
    //     {
    //       Name: "s1",
    //       Value: 2024,
    //       SlotValueTypes: [SlotType.FilterValue],
    //     },
    //     {
    //       Name: "s2",
    //       Value: 2025,
    //       SlotValueTypes: [SlotType.FilterValue],
    //     },
    //   ],
    // },

    // RETURN
    // {
    //   English: "return all",
    //   Cypher: "RETURN ",
    //   QueryType: QueryType.RETURN,
    //   Inputs: [],
    //   Outputs: [],
    //   Slots: [],
    // },
    {
      English: "return player games",
      Cypher: `RETURN pg.${[...PLAYER_GAME_INFO_PROPERTIES, ...RUSHING_STATS].join(", pg.")} LIMIT 10`,
      QueryType: QueryType.RETURN,
      Inputs: [{ Name: "pg", Label: Label.PlayerGame }],
      Outputs: [],
      Slots: [],
    },
    {
      English: "return players",
      Cypher: `RETURN p.${[...PLAYER_GAME_INFO_PROPERTIES].join(", p.")} LIMIT 10`,
      QueryType: QueryType.RETURN,
      Inputs: [{ Name: "p", Label: Label.Player }],
      Outputs: [],
      Slots: [],
    },
    {
      English: "return players and their games",
      Cypher: `RETURN p.${[...PLAYER_GAME_INFO_PROPERTIES, ...RUSHING_STATS, ...PASSING_STATS, ...RECEIVING_STATS].join(", p.")} LIMIT 10`,
      QueryType: QueryType.RETURN,
      Inputs: [{ Name: "p", Label: Label.Player }],
      Outputs: [],
      Slots: [],
    },
    {
      English: "return player seasons",
      Cypher: "RETURN p.first_name + ' ' + p.last_name as name LIMIT 10",
      QueryType: QueryType.RETURN,
      Inputs: [{ Name: "pg", Label: Label.PlayerGame }],
      Outputs: [],
      Slots: [],
    },
    // {
    //   English: "return player passing stats by game",
    //   Cypher: `RETURN pg.${[...PLAYER_GAME_INFO_PROPERTIES, ...PASSING_STATS].join(", pg.")} LIMIT 10`,
    //   QueryType: QueryType.RETURN,
    //   Inputs: [{ Name: "pg", Label: Label.PlayerGame }],
    //   Outputs: [],
    //   Slots: [],
    // },
    // {
    //   English: "return player receiving stats by game",
    //   Cypher: `RETURN pg.${[...PLAYER_GAME_INFO_PROPERTIES].join(", pg.")}, ${[...RECEIVING_STATS].join(", pg.")} LIMIT 10`,
    //   QueryType: QueryType.RETURN,
    //   Inputs: [
    //     { Name: "pg", Label: Label.PlayerGame },
    //     { Name: "p", Label: Label.Player },
    //   ],
    //   Outputs: [],
    //   Slots: [],
    // },
    // {
    //   English: "return player rushing stats by game",
    //   Cypher: `RETURN pg.${[...PLAYER_GAME_INFO_PROPERTIES, ...RUSHING_STATS].join(", pg.")} LIMIT 10`,
    //   QueryType: QueryType.RETURN,
    //   Inputs: [{ Name: "pg", Label: Label.PlayerGame }],
    //   Outputs: [],
    //   Slots: [],
    // },
    // {
    //   English: "return player passing stats by season ",
    //   Cypher: `RETURN ps.${[...PLAYER_SEASON_INFO_PROPERTIES, ...PASSING_STATS].join(", ps.")} LIMIT 10`,
    //   QueryType: QueryType.RETURN,
    //   Inputs: [
    //     { Name: "ps", Label: Label.PlayerSeason },
    //     { Name: "p", Label: Label.Player },
    //   ],
    //   Outputs: [],
    //   Slots: [],
    // },
    // {
    //   English: "return player receiving stats by season",
    //   Cypher: `RETURN ps.${[...PLAYER_SEASON_INFO_PROPERTIES, ...RECEIVING_STATS].join(", ps.")} LIMIT 10`,
    //   QueryType: QueryType.RETURN,
    //   Inputs: [
    //     { Name: "ps", Label: Label.PlayerSeason },
    //     { Name: "p", Label: Label.Player },
    //   ],
    //   Outputs: [],
    //   Slots: [],
    // },
    // {
    //   English: "return rushing stats by season",
    //   Cypher: `RETURN ps.${[...PLAYER_SEASON_INFO_PROPERTIES, ...RUSHING_STATS].join(", ps.")} LIMIT 10`,
    //   QueryType: QueryType.RETURN,
    //   Inputs: [{ Name: "ps", Label: Label.PlayerSeason }],
    //   Outputs: [],
    //   Slots: [],
    // },
    // {
    //   English: "return team names",
    //   Cypher: "RETURN t.name LIMIT 10",
    //   QueryType: QueryType.RETURN,
    //   Inputs: [{ Name: "t", Label: Label.Team }],
    //   Outputs: [],
    //   Slots: [],
    // },
    // {
    //   English: "return player names and team names",
    //   Cypher: "RETURN p.name, t.name LIMIT 10",
    //   QueryType: QueryType.RETURN,
    //   Inputs: [
    //     { Name: "p", Label: Label.Player },
    //     { Name: "t", Label: Label.Team },
    //   ],
    //   Outputs: [],
    //   Slots: [],
    // },
  ];
}
