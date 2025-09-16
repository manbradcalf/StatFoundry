import { generatePlayerUrl } from "./playerUtils";

/**
 * Generates clickable URLs for different entity types in table cells
 * @param key - The column key (e.g., "p.display_name", "game_id")
 * @param rowData - The full row data containing all column values
 * @returns URL string or null if not clickable
 */
export const generateClickableUrl = (
  key: string,
  rowData: Record<string, any>,
): string | null => {
  const normalizedKey = key.replace(/^[a-z]+\./, "").toLowerCase();

  switch (normalizedKey) {
    case "display_name":
    case "player_name":
    case "player_display_name":
    case "name":
      return generatePlayerUrl(rowData);

    case "game_id":
      return `https://rbsdm.com/stats/box_scores/?_inputs_&gameID=%22${rowData[key]}%22`;

    default:
      return null;
  }
};

