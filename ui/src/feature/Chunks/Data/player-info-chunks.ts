import { Chunk } from "../Types/Chunk";
import { QueryType } from "../Enums/QueryType";
import { Label } from "../Enums/Label";
import { SlotType } from "../Enums/SlotType";

export const PLAYER_INFO_CHUNKS: Chunk[] = [
  {
    English: "Player Name",
    Cypher: "named {name}",
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
