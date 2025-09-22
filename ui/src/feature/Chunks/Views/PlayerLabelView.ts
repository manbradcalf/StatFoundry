export const PLAYER_LABEL_PROPERTIES = [  { key: "position", type: "String" },
  { key: "position_group", type: "String" },
  { key: "gsis_id", type: "String" },
  { key: "status_description_abbr", type: "String" },
  { key: "name", type: "String" },
  { key: "suffix", type: "String" },
  { key: "headshot", type: "String" },
  { key: "status_short_description", type: "String" },
  { key: "last_name", type: "String" },
  { key: "football_name", type: "String" },
  { key: "draft_club", type: "String" },
  { key: "short_name", type: "String" },
  { key: "rookie_year", type: "Double" },
  { key: "college_conference", type: "String" },
  { key: "status", type: "String" },
  { key: "team_abbr", type: "String" },
  { key: "college_name", type: "String" },
  { key: "esb_id", type: "String" },
  { key: "uniform_number", type: "String" },
  { key: "current_team_id", type: "Long" },
  { key: "first_name", type: "String" },
  { key: "smart_id", type: "String" },
  { key: "entry_year", type: "Double" },
  { key: "jersey_number", type: "Double" },
  { key: "team_seq", type: "Double" },
  { key: "years_of_experience", type: "Long" },
  { key: "birth_date", type: "DateTime" },
  { key: "draftround", type: "Double" },
  { key: "height", type: "Double" },
  { key: "weight", type: "Double" },
  { key: "draft_number", type: "Double" },
  { key: "gsis_it_id", type: "Double" },];
export interface PlayerProperties {
  position: string;
  position_group: string;
  gsis_id: string;
  status_description_abbr: string;
  name: string;
  suffix: string;
  headshot: string;
  status_short_description: string;
  last_name: string;
  football_name: string;
  draft_club: string;
  short_name: string;
  rookie_year: number;
  college_conference: string;
  status: string;
  team_abbr: string;
  college_name: string;
  esb_id: string;
  uniform_number: string;
  current_team_id: number;
  first_name: string;
  smart_id: string;
  entry_year: number;
  jersey_number: number;
  team_seq: number;
  years_of_experience: number;
  birth_date: string;
  draftround: number;
  height: number;
  weight: number;
  draft_number: number;
  gsis_it_id: number;
}