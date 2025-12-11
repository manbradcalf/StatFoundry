import { Alias } from "./Types/Alias";
import { AliasType } from "./Enums/AliasType";
import { ALIAS_TYPE_TO_PROPERTIES_MAP } from "./Views/AliasTypePropertiesMap";

const getPropertiesByType = (aliasType: AliasType): string[] => {
  const properties = ALIAS_TYPE_TO_PROPERTIES_MAP[aliasType];
  if (!properties) {
    return ["*"]; // Fallback for unmapped types
  }
  return properties.map((x) => x.key);
};

export const buildSmartReturnClause = (
  aliases: Alias[],
  position: string,
): string => {
  if (aliases.length === 0) {
    return "RETURN *";
  }

  const returnParts: string[] = [];

  // Process each alias individually to support multiples of same type
  aliases.forEach((alias) => {
    const properties = getPropertiesByType(alias.AliasType);

    if (properties.length === 0 && alias.AliasType === AliasType.NumberLiteral) {
      // For number literals, return the alias itself (no properties)
      returnParts.push(alias.Name);
    } else if (properties.includes("*")) {
      returnParts.push(`${alias.Name}.*`);
    } else {
      const aliasProps = properties.map((prop) => `${alias.Name}.${prop}`);
      returnParts.push(...aliasProps);
    }
  });

  if (aliases.length === 1) {
    return `RETURN DISTINCT ${returnParts.join(", ")}`;
  }
  return `RETURN ${returnParts.join(", ")}`;
};
