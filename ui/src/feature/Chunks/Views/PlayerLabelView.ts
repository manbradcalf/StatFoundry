export const PLAYER_LABEL_PROPERTIES = [  { key: "position", type: "String" },
  { key: "position_group", type: "String" },
  { key: "otc_id", type: "Long" },
  { key: "display_name", type: "String" },
  { key: "headshot", type: "String" },
  { key: "draft_club", type: "String" },
  { key: "short_name", type: "String" },
  { key: "espn_id", type: "Long" },
  { key: "team_abbr", type: "String" },
  { key: "college_name", type: "String" },
  { key: "esb_id", type: "String" },
  { key: "first_name", type: "String" },
  { key: "smart_id", type: "String" },
  { key: "entry_year", type: "Double" },
  { key: "jersey_number", type: "Double" },
  { key: "team_seq", type: "Double" },
  { key: "height", type: "Double" },
  { key: "birth_date", type: "DateTime" },
  { key: "draftround", type: "Double" },
  { key: "draft_number", type: "Double" },
  { key: "pff_id", type: "Long" },
  { key: "gsis_id", type: "String" },
  { key: "status_description_abbr", type: "String" },
  { key: "suffix", type: "String" },
  { key: "status_short_description", type: "String" },
  { key: "last_name", type: "String" },
  { key: "football_name", type: "String" },
  { key: "rookie_year", type: "Double" },
  { key: "college_conference", type: "String" },
  { key: "status", type: "String" },
  { key: "uniform_number", type: "String" },
  { key: "current_team_id", type: "Long" },
  { key: "pfr_id", type: "String" },
  { key: "weight", type: "Double" },
  { key: "years_of_experience", type: "Long" },
  { key: "nfl_id", type: "Long" },
  { key: "gsis_it_id", type: "Double" },];
export interface PlayerProperties {
  position: string;
  position_group: string;
  otc_id: number;
  display_name: string;
  headshot: string;
  draft_club: string;
  short_name: string;
  espn_id: number;
  team_abbr: string;
  college_name: string;
  esb_id: string;
  first_name: string;
  smart_id: string;
  entry_year: number;
  jersey_number: number;
  team_seq: number;
  height: number;
  birth_date: string;
  draftround: number;
  draft_number: number;
  pff_id: number;
  gsis_id: string;
  status_description_abbr: string;
  suffix: string;
  status_short_description: string;
  last_name: string;
  football_name: string;
  rookie_year: number;
  college_conference: string;
  status: string;
  uniform_number: string;
  current_team_id: number;
  pfr_id: string;
  weight: number;
  years_of_experience: number;
  nfl_id: number;
  gsis_it_id: number;
}