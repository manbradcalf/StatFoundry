export enum AliasType {
  Player = "Player",
  Team = "Team",
  Game = "Game",
  Season = "Season",
  PlayerGame = "PlayerGame",
  // Sub-types (not real labels in graphs. Used for return clause building)
  QBGame = "QBGame",
  RBGame = "RBGame",
  WRGame = "WRGame",
  TEGame = "TEGame",
  PlayerSeason = "PlayerSeason",
  // Sub-types (not real labels in graphs. Used for return clause building)
  QBSeason = "QBSeason",
  RBSeason = "RBSeason",
  WRSeason = "WRSeason",
  TESeason = "TESeason",
  TeamGame = "TeamGame",
  TeamSeason = "TeamSeason",
}
