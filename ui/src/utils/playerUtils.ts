import { Player } from '../feature/Chunks/Entities/Player';

/**
 * Converts a player display name to a URL-friendly slug
 */
export const displayNameToSlug = (displayName: string): string => {
  return displayName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
};

/**
 * Converts a player object to a URL-friendly slug
 */
export const playerToSlug = (player: Player): string => {
  return displayNameToSlug(player.properties.display_name);
};

/**
 * Converts a slug back to a display_name for database lookup
 * 
 * This is tricky because we need to reverse the slug transformation.
 * For MVP, we'll store a mapping of common transformations.
 * 
 * Future: Use a proper lookup table or search endpoint.
 */
export const slugToDisplayName = (slug: string): string => {
  // Common transformations to reverse:
  // - apostrophes: omar-ellison -> 'Omar Ellison
  // - periods: j-j-watt -> J.J. Watt
  // - spaces and caps

  // For now, we'll handle the most common case: names with apostrophes
  const words = slug.split('-').map(word => {
    // Capitalize first letter
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  // Handle common apostrophe patterns at the start
  if (words.length > 0 && words[0].length === 1) {
    // Likely an apostrophe name like 'Omar
    return "'" + words.slice(1).join(' ');
  }

  return words.join(' ');
};

export const slugToPlayerId = (slug: string): string => {
  return slugToDisplayName(slug);
};

/**
 * Generates a player URL using gsis_id and display_name for SEO
 * @param playerData - The row data containing player information
 * @returns formatted URL path or null if required data is missing
 */
export const generatePlayerUrl = (playerData: Record<string, any>): string | null => {
  // Look for gsis_id with common prefixes
  const gsisId = playerData['p.gsis_id'] || playerData['gsis_id'] || playerData['player.gsis_id'];
  
  // Look for display_name with common prefixes  
  const displayName = playerData['p.display_name'] || playerData['display_name'] || playerData['player.display_name'];
  
  if (!gsisId || !displayName) {
    return null;
  }
  
  const slug = displayNameToSlug(String(displayName));
  return `/players/${gsisId}/${slug}`;
};
