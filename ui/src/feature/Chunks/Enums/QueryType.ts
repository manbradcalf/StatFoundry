/**
 * Types representing the different types of Cypher queries our Chunks use.
 * This is not a 1 to 1 of actual Cypher query types, but is instead specific to our use case
 *
 * MATCH_START: Matches initial nodes
 * ex: MATCH (p:Player)
 *
 * JUNCTION: Traverses relationships to different entity types
 * ex: MATCH (p)-[:HAD]->(pg:PlayerGame)
 *
 * FILTER: Filters properties from existing aliases
 * Query builder automatically uses WHERE for first filter, AND for subsequent filters
 * ex: WHERE pg.season = 2024, AND pg.team = 'MIN'
 *
 * RETURN: Essentially acts as a View, ViewModel, ResponseModel for the query
 * ex: RETURN p.player_display_name as name, p.position as position
 */
export enum QueryType {
  MATCH_START = "MATCH_START",
  JUNCTION = "JUNCTION", 
  FILTER = "FILTER",
  RETURN = "RETURN",
}
