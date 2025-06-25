export enum SlotType {
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
  FilterOperator = "FilterOperator",
  FilterValue = "FilterValue",

  // value properties
  // these are just string | number | boolean | null
}
