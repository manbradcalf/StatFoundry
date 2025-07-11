export enum AliasType {
  Player = "Player",
  Team = "Team",
  Game = "Game",
  Season = "Season",
  PlayerGame = "PlayerGame",
  PlayerSeason = "PlayerSeason",
  // Sub-types (not real labels in graphs. Used for return clause building)
  QBGame = "QBGame",
  FlexGame = "FlexGame",
  // Sub-types (not real labels in graphs. Used for return clause building)
  QBSeason = "QBSeason",
  FlexSeason = "FlexSeason",
  TeamGame = "TeamGame",
  TeamSeason = "TeamSeason",
  // Aggregated types
  NumberLiteral = "NumberLiteral",
  AggregatedRBGame = "AggregatedRBGame",
  AggregatedWRGame = "AggregatedWRGame",
  AggregatedTEGame = "AggregatedTEGame",
  AggregatedQBGame = "AggregatedQBGame",
  AggregatedRBSeason = "AggregatedRBSeason",
  AggregatedWRSeason = "AggregatedWRSeason",
  AggregatedTESeason = "AggregatedTESeason",
  AggregatedQBSeason = "AggregatedQBSeason",
}
