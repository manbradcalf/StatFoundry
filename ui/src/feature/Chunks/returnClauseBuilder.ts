import { Alias } from "./Types/Alias";
import { AliasType } from "./Enums/AliasType";
import { PLAYER_INFO_PROPERTIES } from "./Views/PlayerInfo";
import { PLAYER_GAME_INFO_PROPERTIES } from "./Views/PlayerGameInfo";
import { PASSING_STATS } from "./Views/PassingStats";
import { RECEIVING_STATS } from "./Views/ReceivingStats";
import { RUSHING_STATS } from "./Views/RushingStats";
import { PLAYER_SEASON_INFO_PROPERTIES } from "./Views/PlayerSeasonInfo";

// Helper function to get properties for a given label
const getPropertiesByAliasType = (aliasType: AliasType): string[] => {
  switch (aliasType) {
    case AliasType.Player:
      return PLAYER_INFO_PROPERTIES;

    case AliasType.PlayerGame:
      return [...PLAYER_GAME_INFO_PROPERTIES];
    case AliasType.PlayerSeason:
      return [...PLAYER_SEASON_INFO_PROPERTIES];

    case AliasType.QBGame:
      return [...PLAYER_GAME_INFO_PROPERTIES, ...PASSING_STATS];

    case AliasType.RBGame:
      return [
        ...PLAYER_GAME_INFO_PROPERTIES,
        ...RUSHING_STATS.map(x => x.key),
        ...RECEIVING_STATS,
      ];

    case AliasType.WRGame:
      return [
        ...PLAYER_GAME_INFO_PROPERTIES,
        ...RECEIVING_STATS,
        ...RUSHING_STATS.map(x => x.key),
      ];

    case AliasType.TEGame:
      return [...PLAYER_GAME_INFO_PROPERTIES, ...RECEIVING_STATS];

    case AliasType.QBSeason:
      return [...PLAYER_SEASON_INFO_PROPERTIES, ...PASSING_STATS];

    case AliasType.RBSeason:
      return [
        ...PLAYER_SEASON_INFO_PROPERTIES,
        ...RUSHING_STATS.map(x => x.key),
        ...RECEIVING_STATS,
      ];

    case AliasType.WRSeason:
      return [
        ...PLAYER_SEASON_INFO_PROPERTIES,
        ...RECEIVING_STATS,
        ...RUSHING_STATS.map(x => x.key),
      ];

    case AliasType.TESeason:
      return [...PLAYER_SEASON_INFO_PROPERTIES, ...RECEIVING_STATS];

    case AliasType.Game:
      return ["game_id", "week", "season", "home_team", "away_team"];

    case AliasType.Season:
      return ["season"];

    // Aggregated aliases
    case AliasType.AggregatedRBGame:
      return [...RUSHING_STATS.map(x => x.key)];

    case AliasType.AggregatedWRGame:
      return [...RECEIVING_STATS];

    case AliasType.AggregatedTEGame:
      return [...RECEIVING_STATS];

    case AliasType.AggregatedQBGame:
      return [...RECEIVING_STATS];

    case AliasType.AggregatedRBSeason:
      return [...RUSHING_STATS.map(x => x.key)];

    case AliasType.AggregatedWRSeason:
      return [...RECEIVING_STATS];

    case AliasType.AggregatedTESeason:
      return [...RECEIVING_STATS];

    case AliasType.AggregatedQBSeason:
      return [...RECEIVING_STATS];

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
