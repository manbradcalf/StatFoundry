import { Chunk } from "../Types/Chunk";
import { QueryType } from "../Enums/QueryType";
import { AliasType } from "../Enums/AliasType";
import { SlotType } from "../Enums/SlotType";

export interface FilterableProperty {
  key: string;
  type: "number" | "string" | "boolean";
  defaultValue?: number | string | boolean;
}

/**
 * Generates chunks for filtering on properties of Season and Game type entities
 */
export function generateFilterChunks(
  stats: FilterableProperty[],
  entityType: "season" | "game",
  slotType: SlotType,
): Chunk[] {
  const chunks: Chunk[] = [];

  const entityAlias = entityType === "season" ? "ps" : "pg";
  const aliasType =
    entityType === "season" ? AliasType.PlayerSeason : AliasType.PlayerGame;

  for (const stat of stats) {
    // Single filter chunk for each stat
    chunks.push({
      English: `[${stat.key}]`,
      Cypher: "",
      EnglishTemplate: `{condition} {value} {stat}`,
      CypherTemplate: `${entityAlias}.{stat} {condition} {value}`,
      QueryType: QueryType.FILTER,
      Requires: [{ Name: entityAlias, AliasType: aliasType }],
      Provides: [{ Name: entityAlias, AliasType: aliasType }],
      Slots: [
        {
          Name: "stat",
          Value: stat.key,
          SlotValueTypes: [slotType],
        },
        {
          Name: "condition",
          Value: stat.type === "number" ? ">" : "=",
          SlotValueTypes: [SlotType.FilterCondition],
        },
        {
          Name: "value",
          Value:
            stat.defaultValue ??
            (stat.type === "number"
              ? 100
              : stat.type === "boolean"
                ? true
                : "example"),
          SlotValueTypes: [SlotType.FilterValue],
        },
      ],
      SuggestionKeywords: [stat.key, entityType],
    });
  }

  return chunks;
}

/**
 * Generates chunks for filtering on Play properties
 * Different from game/season stats - these are event-level, not player aggregates
 */
export function generatePlayFilterChunks(
  properties: FilterableProperty[],
  slotType: SlotType,
): Chunk[] {
  const chunks: Chunk[] = [];

  for (const prop of properties) {
    // Single filter chunk for each play property
    chunks.push({
      English: `[${prop.key}]`,
      Cypher: "",
      EnglishTemplate: `with {condition} {value} {property}`,
      CypherTemplate: `play.{property} {condition} {value}`,
      QueryType: QueryType.FILTER,
      Requires: [{ Name: "play", AliasType: AliasType.Play }],
      Provides: [{ Name: "play", AliasType: AliasType.Play }],
      Slots: [
        {
          Name: "property",
          Value: prop.key,
          SlotValueTypes: [slotType],
        },
        {
          Name: "condition",
          Value: prop.type === "number" ? ">" : "=",
          SlotValueTypes: [SlotType.FilterCondition],
        },
        {
          Name: "value",
          Value:
            prop.defaultValue ??
            (prop.type === "number"
              ? 100
              : prop.type === "boolean"
                ? true
                : "example"),
          SlotValueTypes: [SlotType.FilterValue],
        },
      ],
      SuggestionKeywords: [prop.key, "play"],
    });
  }

  return chunks;
}
