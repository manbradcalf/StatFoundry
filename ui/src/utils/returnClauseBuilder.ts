import { Alias } from "../feature/Chunks/Types/Alias";
import { AliasType } from "../feature/Chunks/Enums/AliasType";
import { PLAYER_INFO_PROPERTIES } from "../feature/Chunks/Views/PlayerInfo";
import { PLAYER_GAME_INFO_PROPERTIES } from "../feature/Chunks/Views/PlayerGameInfo";
import { PASSING_STATS } from "../feature/Chunks/Views/PassingStats";
import { RECEIVING_STATS } from "../feature/Chunks/Views/ReceivingStats";
import { RUSHING_STATS } from "../feature/Chunks/Views/RushingStats";

export const buildSmartReturnClause = (aliases: Alias[]): string => {
  if (aliases.length === 0) {
    return "RETURN *";
  }

  const returnParts: string[] = [];

  // Group aliases by label to avoid duplicates
  const aliasesByLabel = aliases.reduce(
    (acc, alias) => {
      if (!acc[alias.Label]) {
        acc[alias.Label] = [];
      }
      acc[alias.Label].push(alias.Name);
      return acc;
    },
    {} as Record<AliasType, string[]>
  );

  // Build return clause based on available entity types
  Object.entries(aliasesByLabel).forEach(([label, names]) => {
    const aliasName = names[0]; // Use first alias of this type

    switch (label as AliasType) {
      case AliasType.Player:
        const playerProps = PLAYER_INFO_PROPERTIES.map(
          (prop) => `${aliasName}.${prop}`
        ).join(", ");
        returnParts.push(playerProps);
        break;

      case AliasType.PlayerGame:
        // For PlayerGame, return basic info plus all stat categories
        const pgBasicProps = PLAYER_GAME_INFO_PROPERTIES.map(
          (prop) => `${aliasName}.${prop}`
        ).join(", ");
        const passingProps = PASSING_STATS.map(
          (prop) => `${aliasName}.${prop}`
        ).join(", ");
        const receivingProps = RECEIVING_STATS.map(
          (prop) => `${aliasName}.${prop}`
        ).join(", ");
        const rushingProps = RUSHING_STATS.map(
          (prop) => `${aliasName}.${prop}`
        ).join(", ");

        returnParts.push(
          pgBasicProps,
          passingProps,
          receivingProps,
          rushingProps
        );
        break;

      case AliasType.Game:
        returnParts.push(
          `${aliasName}.game_id`,
          `${aliasName}.week`,
          `${aliasName}.season`,
          `${aliasName}.home_team`,
          `${aliasName}.away_team`
        );
        break;

      case AliasType.Season:
        returnParts.push(`${aliasName}.season`);
        break;

      // Add more cases as needed
      default:
        returnParts.push(`${aliasName}.*`);
    }
  });

  return `RETURN ${returnParts.join(", ")}`;
};
