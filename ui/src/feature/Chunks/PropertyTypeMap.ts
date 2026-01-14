/**
 * Consolidated property type metadata map.
 * Aggregates property type info from all View files to enable
 * type-aware input rendering in the SlotModal.
 *
 * Fixes issue #135: Boolean properties like div_game need to be
 * stored as actual booleans, not strings.
 */

import { PLAYER_LABEL_PROPERTIES } from "./Views/PlayerLabelView";
import { PLAYERGAME_LABEL_PROPERTIES } from "./Views/PlayerGameLabelView";
import { PLAYERSEASON_LABEL_PROPERTIES } from "./Views/PlayerSeasonLabelView";
import { GAME_LABEL_PROPERTIES } from "./Views/GameLabelView";
import { PLAY_LABEL_PROPERTIES } from "./Views/PlayLabelView";
import { TEAMGAME_LABEL_PROPERTIES } from "./Views/TeamGameLabelView";
import { TEAM_LABEL_PROPERTIES } from "./Views/TeamLabelView";
import { COACH_LABEL_PROPERTIES } from "./Views/CoachLabelView";

export type PropertyType =
  | "String"
  | "Long"
  | "Double"
  | "Boolean"
  | "DateTime"
  | "StringArray";

interface PropertyMetadata {
  key: string;
  type: PropertyType;
}

function buildPropertyTypeMap(): Map<string, PropertyType> {
  const map = new Map<string, PropertyType>();

  const allProperties: PropertyMetadata[] = [
    ...PLAYER_LABEL_PROPERTIES,
    ...PLAYERGAME_LABEL_PROPERTIES,
    ...PLAYERSEASON_LABEL_PROPERTIES,
    ...GAME_LABEL_PROPERTIES,
    ...PLAY_LABEL_PROPERTIES,
    ...TEAMGAME_LABEL_PROPERTIES,
    ...TEAM_LABEL_PROPERTIES,
    ...COACH_LABEL_PROPERTIES,
  ] as PropertyMetadata[];

  for (const prop of allProperties) {
    if (!map.has(prop.key)) {
      map.set(prop.key, prop.type);
    }
  }

  return map;
}

export const PROPERTY_TYPE_MAP = buildPropertyTypeMap();

export function isBooleanProperty(propertyName: string): boolean {
  return PROPERTY_TYPE_MAP.get(propertyName) === "Boolean";
}
