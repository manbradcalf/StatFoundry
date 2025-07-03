import { Chunk } from "../Types/Chunk";
import { QueryType } from "../Enums/QueryType";
import { Label } from "../Enums/Label";
import { SlotType } from "../Enums/SlotType";

export const PASSING_STATS_CHUNKS: Chunk[] = [
  {
    English: "who had [passing stat] in a game",
    Cypher: "MATCH (p:Player)-[:HAD]->(pg:PlayerGame) WHERE pg.passing_tds > 2",
    EnglishTemplate: "who had {condition} {property} {value} in a game",
    CypherTemplate: "MATCH (p:Player)-[:HAD]->(pg:PlayerGame) WHERE pg.passing_tds > {tds}",
    QueryType: QueryType.FILTER,
    Inputs: [{ Name: "p", Label: Label.Player }],
    Outputs: [
      { Name: "p", Label: Label.Player },
      { Name: "pg", Label: Label.PlayerGame },
    ],
    Slots: [
      {
        Name: "condition",
        Value: ">",
        SlotValueTypes: [SlotType.FilterCondition],
      },
      {
        Name: "value",
        Value: 2,
        SlotValueTypes: [SlotType.FilterValue],
      },
      {
        Name: "passing stat",
        Value: "passing touchdowns",
        SlotValueTypes: [SlotType.SelectPassingStats],
      }
    ],
  }
];
