import { Entity } from "./Entity";

// TODO: Add team type for real
export interface Team extends Entity {
  team_id: string;
  team_name: string;
}
