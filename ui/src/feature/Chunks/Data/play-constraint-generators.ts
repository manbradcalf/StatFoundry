import { Chunk } from "../Types/Chunk";

// Hand-rolled constraints removed - now using auto-generated chunks from PLAY_STATS

// export const PLAY_BOOLEAN_CONSTRAINTS = [
//   {
//     english: "and scored a touchdown",
//     cypher: "AND play.touchdown = true",
//     keywords: ["scored", "touchdown", "td"],
//   },
// ];
//
export function generatePlayConstraintChunks(): Chunk[] {
  // No longer needed - Play filtering now handled by auto-generated chunks from PLAY_STATS
  return [];
}
