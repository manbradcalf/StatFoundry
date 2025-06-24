import { Entity } from "./Entity";

// TODO: Add team game type for real
export interface TeamGame extends Entity {
  team_id: string;
  season: number;
  week: number;
}
