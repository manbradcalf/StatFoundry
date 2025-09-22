export const GAME_LABEL_PROPERTIES = [  { key: "season", type: "Long" },
  { key: "week", type: "Long" },
  { key: "away_qb_id", type: "String" },
  { key: "away_qb_name", type: "String" },
  { key: "location", type: "String" },
  { key: "pff", type: "String" },
  { key: "referee", type: "String" },
  { key: "overtime", type: "Double" },
  { key: "away_moneyline", type: "String" },
  { key: "home_qb_name", type: "String" },
  { key: "home_rest", type: "Long" },
  { key: "away_score", type: "Double" },
  { key: "under_odds", type: "Long" },
  { key: "display_score", type: "String" },
  { key: "total_line", type: "Double" },
  { key: "home_moneyline", type: "String" },
  { key: "surface", type: "String" },
  { key: "wind", type: "Double" },
  { key: "game_type", type: "String" },
  { key: "away_team", type: "String" },
  { key: "temp", type: "Double" },
  { key: "spread_line", type: "Double" },
  { key: "away_rest", type: "Long" },
  { key: "gsis", type: "Long" },
  { key: "home_qb_id", type: "String" },
  { key: "home_coach", type: "String" },
  { key: "ftn", type: "String" },
  { key: "roof", type: "String" },
  { key: "home_team", type: "String" },
  { key: "div_game", type: "Boolean" },
  { key: "total", type: "Double" },
  { key: "home_score", type: "Double" },
  { key: "gametime", type: "String" },
  { key: "winner", type: "String" },
  { key: "gameday", type: "DateTime" },
  { key: "over_odds", type: "Long" },
  { key: "stadium_id", type: "String" },
  { key: "home_spread_odds", type: "Long" },
  { key: "away_spread_odds", type: "Long" },
  { key: "weekday", type: "String" },
  { key: "espn", type: "Long" },
  { key: "away_coach", type: "String" },
  { key: "pfr", type: "String" },
  { key: "result", type: "Double" },
  { key: "game_id", type: "String" },
  { key: "stadium", type: "String" },
  { key: "old_game_id", type: "Long" },
  { key: "nfl_detail_id", type: "String" },];
export interface GameProperties {
  season: number;
  week: number;
  away_qb_id: string;
  away_qb_name: string;
  location: string;
  pff: string;
  referee: string;
  overtime: number;
  away_moneyline: string;
  home_qb_name: string;
  home_rest: number;
  away_score: number;
  under_odds: number;
  display_score: string;
  total_line: number;
  home_moneyline: string;
  surface: string;
  wind: number;
  game_type: string;
  away_team: string;
  temp: number;
  spread_line: number;
  away_rest: number;
  gsis: number;
  home_qb_id: string;
  home_coach: string;
  ftn: string;
  roof: string;
  home_team: string;
  div_game: boolean;
  total: number;
  home_score: number;
  gametime: string;
  winner: string;
  gameday: string;
  over_odds: number;
  stadium_id: string;
  home_spread_odds: number;
  away_spread_odds: number;
  weekday: string;
  espn: number;
  away_coach: string;
  pfr: string;
  result: number;
  game_id: string;
  stadium: string;
  old_game_id: number;
  nfl_detail_id: string;
}