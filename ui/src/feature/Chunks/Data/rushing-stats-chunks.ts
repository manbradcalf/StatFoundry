import { Chunk } from "../Types/Chunk";
import { QueryType } from "../Enums/QueryType";
import { Label } from "../Enums/Label";
import { SlotType } from "../Enums/SlotType";

export const RUSHING_STATS_CHUNKS: Chunk[] = [
  {
    English: "who rushed for more than {yards} yards in a game",
    Cypher:
      "MATCH (p:Player)-[:HAD]->(pg:PlayerGame) WHERE pg.rushing_yards > {yards}",
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
];
