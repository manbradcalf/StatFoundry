import { Chunk } from "../Types/Chunk";
import { QueryType } from "../Enums/QueryType";
import { Label } from "../Enums/Label";
import { SlotType } from "../Enums/SlotType";

export const PLAYER_GAME_CHUNKS: Chunk[] = [
  {
    English: "who played for {team} in those games",
    Cypher:
      "MATCH (p:Player)-[:HAD]->(pg:PlayerGame) WHERE pg.recent_team = {team}",
    QueryType: QueryType.FILTER,
    Inputs: [{ Name: "pg", Label: Label.PlayerGame }],
    Outputs: [{ Name: "pg", Label: Label.PlayerGame }],
    Slots: [
      {
        Name: "team",
        Value: "MIN",
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "who played against {team} in those games",
    Cypher:
      "MATCH (p:Player)-[:HAD]->(pg:PlayerGame) WHERE pg.opponent_team = {team}",
    QueryType: QueryType.FILTER,
    Inputs: [{ Name: "pg", Label: Label.PlayerGame }],
    Outputs: [{ Name: "pg", Label: Label.PlayerGame }],
    Slots: [
      {
        Name: "team",
        Value: "GB",
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "in games between the {2020} and {2024} seasons",
    Cypher: "WHERE pg.season >= {seasonStart} AND pg.season <= {seasonEnd}",
    QueryType: QueryType.FILTER,
    Inputs: [{ Name: "pg", Label: Label.PlayerGame }],
    Outputs: [{ Name: "pg", Label: Label.PlayerGame }],
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
    English: "and won those games",
    Cypher: `WHERE pg.won = true`,
    QueryType: QueryType.FILTER,
    Inputs: [{ Name: "pg", Label: Label.PlayerGame }],
    Outputs: [{ Name: "pg", Label: Label.PlayerGame }],
    Slots: [],
  },
  {
    English: "and lost those games",
    Cypher: `WHERE pg.won = false`,
    QueryType: QueryType.FILTER,
    Inputs: [{ Name: "pg", Label: Label.PlayerGame }],
    Outputs: [{ Name: "pg", Label: Label.PlayerGame }],
    Slots: [],
  },
  {
    English: "in games during the {season} season",
    Cypher:
      "MATCH (p:Player)-[:HAD]->(pg:PlayerGame) WHERE pg.season = {season}",
    QueryType: QueryType.FILTER,
    Inputs: [{ Name: "pg", Label: Label.PlayerGame }],
    Outputs: [{ Name: "pg", Label: Label.PlayerGame }],
    Slots: [
      {
        Name: "season",
        Value: 2024,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
];
