import { Chunk } from "../Types/Chunk";
import { QueryType } from "../Enums/QueryType";
import { Label } from "../Enums/Label";
import { SlotType } from "../Enums/SlotType";
import { PLAYER_INFO_PROPERTIES } from "../Views/PlayerInfo";

export const PLAYER_INFO_CHUNKS: Chunk[] = [
  {
    English: "return player info",
    Cypher: `RETURN p.${[...PLAYER_INFO_PROPERTIES].join(", p.")} LIMIT 10`,
    QueryType: QueryType.RETURN,
    Inputs: [{ Name: "p", Label: Label.Player }],
    Outputs: [],
    Slots: [],
  },
  {
    English: "named [Alvin Kamara]",
    Cypher: "named 'Alvin Kamara'",
    EnglishTemplate: "named {name}",
    CypherTemplate: "WHERE p.display_name ={name}",
    QueryType: QueryType.FILTER,
    Inputs: [{ Name: "p", Label: Label.Player }],
    Outputs: [{ Name: "p", Label: Label.Player }],
    Slots: [
      {
        Name: "name",
        Value: "John Doe",
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
];
