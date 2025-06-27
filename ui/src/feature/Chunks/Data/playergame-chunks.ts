import { Chunk } from "../Types/Chunk";
import { QueryType } from "../Enums/QueryType";
import { Label } from "../Enums/Label";
import { SlotType } from "../Enums/SlotType";

export const PLAYER_GAME_CHUNKS: Chunk[] = [
  {
    English: "between the {s1} and {s2} seasons",
    Cypher: "WHERE pg.season >= {s1} AND pg.season <= {s2}",
    QueryType: QueryType.FILTER,
    Inputs: [{ Name: "pg", Label: Label.PlayerGame }],
    Outputs: [{ Name: "pg", Label: Label.PlayerGame }],
    Slots: [
      {
        Name: "s1",
        Value: 2024,
        SlotValueTypes: [SlotType.FilterValue],
      },
      {
        Name: "s2",
        Value: 2025,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "during the {season} season",
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
