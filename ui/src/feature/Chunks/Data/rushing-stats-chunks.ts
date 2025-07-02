import { Chunk } from "../Types/Chunk";
import { QueryType } from "../Enums/QueryType";
import { Label } from "../Enums/Label";
import { SlotType } from "../Enums/SlotType";
import { PLAYER_GAME_INFO_PROPERTIES } from "../Views/PlayerGameInfo";
import { RUSHING_STATS } from "../Views/RushingStats";
import { PLAYER_INFO_PROPERTIES } from "../Views/PlayerInfo";
import { PLAYER_SEASON_INFO_PROPERTIES } from "../Views/PlayerSeasonInfo";

export const RUSHING_STATS_CHUNKS: Chunk[] = [
  {
    English: "who rushed for more than 100 yards in a game",
    Cypher: "MATCH (p:Player)-[:HAD]->(pg:PlayerGame) WHERE pg.rushing_yards > 100",
    EnglishTemplate: "who rushed for more than {yards} yards in a game",
    CypherTemplate: "MATCH (p:Player)-[:HAD]->(pg:PlayerGame) WHERE pg.rushing_yards > {yards}",
    QueryType: QueryType.FILTER,
    Inputs: [{ Name: "p", Label: Label.Player }],
    Outputs: [{ Name: "pg", Label: Label.PlayerGame }],
    Slots: [
      {
        Name: "yards",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "who rushed for more than 2 touchdowns in a game",
    Cypher: "MATCH (p:Player)-[:HAD]->(pg:PlayerGame) WHERE pg.rushing_tds > 2",
    EnglishTemplate: "who rushed for more than {touchdowns} touchdowns in a game",
    CypherTemplate: "MATCH (p:Player)-[:HAD]->(pg:PlayerGame) WHERE pg.rushing_tds > {touchdowns}",
    QueryType: QueryType.FILTER,
    Inputs: [{ Name: "p", Label: Label.Player }],
    Outputs: [{ Name: "pg", Label: Label.PlayerGame }],
    Slots: [
      {
        Name: "touchdowns",
        Value: 2,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "who had a rushing EPA of 5 or higher",
    Cypher: "MATCH (p:Player)-[:HAD]->(pg:PlayerGame) WHERE pg.rushing_epa > 5",
    EnglishTemplate: "who had a rushing EPA of {epa} or higher",
    CypherTemplate: "MATCH (p:Player)-[:HAD]->(pg:PlayerGame) WHERE pg.rushing_epa > {epa}",
    QueryType: QueryType.FILTER,
    Inputs: [{ Name: "p", Label: Label.Player }],
    Outputs: [{ Name: "pg", Label: Label.PlayerGame }],
    Slots: [
      {
        Name: "epa",
        Value: 5.0,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "return rushing stats by game",
    Cypher: `RETURN pg.${[...PLAYER_GAME_INFO_PROPERTIES, ...RUSHING_STATS].join(", pg.")}`,
    QueryType: QueryType.RETURN,
    Inputs: [{ Name: "pg", Label: Label.PlayerGame }],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return rushing stats by season",
    Cypher: `RETURN ps.${[...PLAYER_SEASON_INFO_PROPERTIES, ...RUSHING_STATS].join(", ps.")}`,
    QueryType: QueryType.RETURN,
    Inputs: [{ Name: "ps", Label: Label.PlayerSeason }],
    Outputs: [],
    Slots: [],
  },
];
