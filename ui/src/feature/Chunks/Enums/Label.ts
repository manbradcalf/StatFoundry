/**
 * Enum for Neo4j node labels used in the StatFoundry graph database
 */
export type Label = string;

// Common Neo4j labels in the StatFoundry schema
export const Labels = {
  Player: 'Player',
  PlayerGame: 'PlayerGame', 
  PlayerSeason: 'PlayerSeason',
  Team: 'Team',
  TeamGame: 'TeamGame',
  TeamSeason: 'TeamSeason',
  Game: 'Game',
  Season: 'Season',
  Play: 'Play',
} as const;

export type KnownLabel = typeof Labels[keyof typeof Labels];