import { Chunk } from "../Types/Chunk";
import { QueryType } from "../Enums/QueryType";
import { Label } from "../Enums/Label";
import { SlotType } from "../Enums/SlotType";

export const RECEIVING_STATS_CHUNKS: Chunk[] = [
  {
    English: "who caught at least {catches} passes in a game",
    Cypher:
      "MATCH (p:Player)-[:HAD]->(pg:PlayerGame) WHERE pg.receiving_receptions >= {catches}",
    QueryType: QueryType.FILTER,
    Inputs: [{ Name: "pg", Label: Label.PlayerGame }],
    Outputs: [{ Name: "pg", Label: Label.PlayerGame }],
    Slots: [
      {
        Name: "catches",
        Value: 5,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
];
