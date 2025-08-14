import { Alias } from "./Types/Alias";
import { AliasType } from "./Enums/AliasType";
import { PLAYER_INFO_PROPERTIES } from "./Views/PlayerInfo";
import { PLAYER_GAME_INFO_PROPERTIES } from "./Views/PlayerGameInfo";
import { PLAYER_SEASON_INFO_PROPERTIES } from "./Views/PlayerSeasonInfo";
import { PLAY_INFO_PROPERTIES } from "./Views/PlayInfo";
import { PASSING_STATS } from "./Views/PassingStats";
import { FLEX_STATS, RECEIVING_STATS, RUSHING_STATS } from "./Views/FlexStats";
import { FANTASY_STATS } from "./Views/FantasyStats";

// For RESULTS building...
// Helper function to get properties for a given label
const getPropertiesByAliasType = (aliasType: AliasType, position: string): string[] => {
  const stats = getStatsByPosition(position);
  switch (aliasType) {
    case AliasType.Player:
      return PLAYER_INFO_PROPERTIES;

    case AliasType.PlayerGame:
      return [...PLAYER_GAME_INFO_PROPERTIES, ...stats, ...FANTASY_STATS.map(x => x.key)];

    case AliasType.PlayerSeason:
      return [...PLAYER_SEASON_INFO_PROPERTIES, ...stats, ...FANTASY_STATS.map(x => x.key)]

    case AliasType.Play:
      return ["desc"]; // Just return play description for now

    case AliasType.Game:
      return ["game_id", "week", "season", "home_team", "away_team"];

    case AliasType.Season:
      return ["season"];

    default:
      return ["*"]; // Fallback for unknown labels
  }
};

const getStatsByPosition = (position: string): string[] => {
  switch (position) {
    case "RB":
      return [...RUSHING_STATS, ...RECEIVING_STATS].map(x => x.key)
    case "WR":
      return [...RECEIVING_STATS, ...RUSHING_STATS].map(x => x.key)
    case "TE":
      return [...RECEIVING_STATS, ...RUSHING_STATS].map(x => x.key)
    case "QB":
      return [...PASSING_STATS, ...RUSHING_STATS].map(x => x.key)
    default:
      return [...FLEX_STATS, ...PASSING_STATS].map(x => x.key)
  }

}

// TODO: When multiple aliases of same type exist (e.g., p1, p2 for player comparisons),
// column headers will show duplicate names like "Display Name", "Position" because
// formatColumnHeader() strips the alias prefix. Need to enhance header logic to
// preserve alias context for better UX (e.g., "Player 1: Display Name" vs "Player 2: Display Name")
export const buildSmartReturnClause = (aliases: Alias[], position: string): string => {
  if (aliases.length === 0) {
    return "RETURN *";
  }

  const returnParts: string[] = [];

  // Process each alias individually to support multiples of same type
  aliases.forEach((alias) => {
    const properties = getPropertiesByAliasType(alias.AliasType, position);

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

  if (aliases.length === 1) {

    return `RETURN DISTINCT ${returnParts.join(", ")}`;
  }
  return `RETURN ${returnParts.join(", ")}`;
};
