// TODO: Write labels to this during generation
export enum AliasType {
  Player = "Player",
  Team = "Team",
  Game = "Game",
  Season = "Season",
  PlayerGame = "PlayerGame",
  PlayerSeason = "PlayerSeason",
  Play = "Play",
  Coach = "Coach",
  // Sub-types (not real labels in graphs. Used for return clause building)
  PassingGame = "PassingGame",
  FlexGame = "FlexGame",
  // Sub-types (not real labels in graphs. Used for return clause building)
  PassingSeason = "PassingSeason",
  FlexSeason = "FlexSeason",
  TeamGame = "TeamGame",
  TeamSeason = "TeamSeason",
  // Aggregated types
  NumberLiteral = "NumberLiteral",
  AggregatedRBGame = "AggregatedRBGame",
  AggregatedWRGame = "AggregatedWRGame",
  AggregatedTEGame = "AggregatedTEGame",
  AggregatedPassingGame = "AggregatedPassingGame",
  AggregatedRBSeason = "AggregatedRBSeason",
  AggregatedWRSeason = "AggregatedWRSeason",
  AggregatedTESeason = "AggregatedTESeason",
  AggregatedPassingSeason = "AggregatedPassingSeason",
  College = "College",
  CollegeConference = "CollegeConference",
}
