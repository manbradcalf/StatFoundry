export enum SlotType {
  MultiStatFilter = "MultiStatFilter",
  // entity properties
  SelectPlayerProperty = "SelectPlayerProperty",
  SelectPlayerPosition = "SelectPlayerPosition",
  SelectTeamProperty = "SelectTeamProperty",
  SelectGameProperty = "SelectGameProperty",
  SelectSeasonProperty = "SelectSeasonProperty",
  // compound properties
  SelectPlayerGameProperty = "SelectPlayerGameProperty",
  SelectTeamGameProperty = "SelectTeamGameProperty",
  SelectPlayerSeasonProperty = "SelectPlayerSeasonProperty",
  SelectTeamSeasonProperty = "SelectTeamSeasonProperty",
  // filter properties
  Filter = "Filter",
  FilterCondition = "FilterCondition",
  FilterValue = "FilterValue",
  SelectFlexStats = "SelectFlexStats",
  SelectPassingStats = "SelectPassingStats",

  // value properties
  // these are just string | number | boolean | null
}
