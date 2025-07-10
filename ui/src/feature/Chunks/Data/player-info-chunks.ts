import { Chunk } from "../Types/Chunk";
import { QueryType } from "../Enums/QueryType";
import { AliasType } from "../Enums/AliasType";
import { SlotType } from "../Enums/SlotType";
import { PLAYER_INFO_PROPERTIES } from "../Views/PlayerInfo";

// Helper to build slots for a given property
const buildSlots = (property: string): any[] => [
  {
    Name: "property",
    Value: property,
    SlotValueTypes: [SlotType.SelectPlayerProperty],
  },
  {
    Name: "condition",
    Value: "=",
    SlotValueTypes: [SlotType.FilterCondition],
  },
  {
    Name: "value",
    Value: "value",
    SlotValueTypes: [SlotType.FilterValue],
  },
];

const FILTER_AND_AND_CHUNKS: Chunk[] = PLAYER_INFO_PROPERTIES.flatMap((prop) => {
  const slots = buildSlots(prop);

  const filterChunk: Chunk = {
    English: `with [${prop}]`,
    Cypher: "",
    EnglishTemplate: `{property} {condition} {value}`,
    CypherTemplate: `WHERE p.{property} {condition} {value}`,
    QueryType: QueryType.FILTER,
    Requires: [{ Name: "p", AliasType: AliasType.Player }],
    Provides: [{ Name: "p", AliasType: AliasType.Player }],
    Slots: slots,
  };

  const andChunk: Chunk = {
    English: "and ...",
    Cypher: "",
    EnglishTemplate: `and p.{property} {condition} {value}`,
    CypherTemplate: `AND p.{property} {condition} {value}`,
    QueryType: QueryType.FILTER,
    Requires: [{ Name: "p", AliasType: AliasType.Player }],
    Provides: [{ Name: "p", AliasType: AliasType.Player }],
    Slots: slots,
  };

  return [filterChunk, andChunk];
});

export const PLAYER_INFO_CHUNKS: Chunk[] = [...FILTER_AND_AND_CHUNKS];
