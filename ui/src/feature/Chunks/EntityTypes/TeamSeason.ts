import { Entity } from "./Entity";
// TODO: Add team season type for real
export interface TeamSeason extends Entity {
  team_id: string;
  season: number;
}
