import { Chunk } from "../Types/Chunk";
import { QueryType } from "../Enums/QueryType";
import { Label } from "../Enums/Label";
import { SlotType } from "../Enums/SlotType";

export const PASSING_STATS_CHUNKS: Chunk[] = [
  {
    English: "who threw more than {tds} touchdown passes in a game",
    Cypher:
      "MATCH (p:Player)-[:HAD]->(pg:PlayerGame) WHERE pg.passing_tds > {tds}",
    QueryType: QueryType.FILTER,
    Inputs: [{ Name: "p", Label: Label.Player }],
    Outputs: [
      { Name: "p", Label: Label.Player },
      { Name: "pg", Label: Label.PlayerGame },
    ],
    Slots: [
      {
        Name: "tds",
        Value: 2,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "more than {tds} touchdown passes in a game",
    Cypher: "WHERE pg.passing_tds > {tds}",
    QueryType: QueryType.FILTER,
    Inputs: [{ Name: "pg", Label: Label.PlayerGame }],
    Outputs: [{ Name: "pg", Label: Label.PlayerGame }],
    Slots: [
      {
        Name: "tds",
        Value: 2,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
];
