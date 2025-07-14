import { Alias } from "./Types/Alias";
import { AliasType } from "./Enums/AliasType";
import { PLAYER_INFO_PROPERTIES } from "./Views/PlayerInfo";
import { PLAYER_GAME_INFO_PROPERTIES } from "./Views/PlayerGameInfo";
import { PASSING_STATS } from "./Views/PassingStats";
import { FLEX_STATS } from "./Views/FlexStats";
import { PLAYER_SEASON_INFO_PROPERTIES } from "./Views/PlayerSeasonInfo";

// For RESULTS building...
// Helper function to get properties for a given label
const getPropertiesByAliasType = (aliasType: AliasType): string[] => {
  switch (aliasType) {
    case AliasType.Player:
      return PLAYER_INFO_PROPERTIES;

    case AliasType.PlayerGame:
      return [...PLAYER_GAME_INFO_PROPERTIES];

    case AliasType.PlayerSeason:
      return [...PLAYER_SEASON_INFO_PROPERTIES];

    case AliasType.PassingGame:
      return [
        ...PLAYER_GAME_INFO_PROPERTIES,
        ...PASSING_STATS.map((x) => x.key),
      ];

    case AliasType.FlexGame:
      return [...PLAYER_GAME_INFO_PROPERTIES, ...FLEX_STATS.map((x) => x.key)];

    case AliasType.PassingSeason:
      return [
        ...PLAYER_SEASON_INFO_PROPERTIES,
        ...PASSING_STATS.map((x) => x.key),
      ];

    case AliasType.FlexSeason:
      return [
        ...PLAYER_SEASON_INFO_PROPERTIES,
        ...FLEX_STATS.map((x) => x.key),
      ];

    case AliasType.Game:
      return ["game_id", "week", "season", "home_team", "away_team"];

    case AliasType.Season:
      return ["season"];

    // Aggregated aliases
    case AliasType.AggregatedRBGame:
      return [...FLEX_STATS.map((x) => x.key)];

    case AliasType.AggregatedRBSeason:
      return [...FLEX_STATS.map((x) => x.key)];

    default:
      return ["*"]; // Fallback for unknown labels
  }
};

// TODO: When multiple aliases of same type exist (e.g., p1, p2 for player comparisons),
// column headers will show duplicate names like "Display Name", "Position" because
// formatColumnHeader() strips the alias prefix. Need to enhance header logic to
// preserve alias context for better UX (e.g., "Player 1: Display Name" vs "Player 2: Display Name")
export const buildSmartReturnClause = (aliases: Alias[]): string => {
  if (aliases.length === 0) {
    return "RETURN *";
  }

  const returnParts: string[] = [];

  // Process each alias individually to support multiples of same type
  aliases.forEach((alias) => {
    const properties = getPropertiesByAliasType(alias.AliasType);

    if (
      properties.length === 0 &&
      alias.AliasType === AliasType.NumberLiteral
    ) {
      // For number literals, return the alias itself (no properties)
      returnParts.push(alias.Name);
    } else if (properties.includes("*")) {
      returnParts.push(`${alias.Name}.*`);
    } else {
      const aliasProps = properties.map((prop) => `${alias.Name}.${prop}`);
      returnParts.push(...aliasProps);
    }
  });

  return `RETURN ${returnParts.join(", ")}`;
};
