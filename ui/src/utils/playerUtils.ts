import { PlayerProperties } from "../feature/Chunks/Views/PlayerLabelView";

/**
 * Converts a player display name to a URL-friendly slug
 */
export const displayNameToSlug = (displayName: string): string => {
  return displayName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
};

/**
 * Converts a player object to a URL-friendly slug
 */
export const playerToSlug = (player: PlayerProperties): string => {
  const displayName = player.display_name || `${player.first_name || ''} ${player.last_name || ''}`.trim();
  return displayNameToSlug(displayName);
};

/**
 * Generates a player URL using gsis_id and display_name for SEO
 * @param playerData - The row data containing player information
 * @returns formatted URL path or null if required data is missing
 */
export const generatePlayerUrl = (
  playerData: Record<string, any>,
): string | null => {
  // TODO: This sucks. Hardcoded checks aren't gonna work with dynamic schema
  // Look for gsis_id with common prefixes
  const gsisId =
    playerData["p.gsis_id"] ||
    playerData["gsis_id"] ||
    playerData["pg.player_id"] ||
    playerData["ps.player_id"] ||
    playerData["player.gsis_id"];

  // Look for display_name with common prefixes
  const displayName =
    playerData["p.display_name"] ||
    playerData["display_name"] ||
    playerData["player_name"] ||
    playerData["pg.player_name"] ||
    playerData["ps.player_name"] ||
    playerData["player.display_name"];

  if (!gsisId || !displayName) {
    return null;
  }

  const slug = displayNameToSlug(String(displayName));
  return `/players/${slug}/${gsisId}`;
};
