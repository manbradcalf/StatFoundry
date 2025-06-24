/**
 * Types representing the different types of Cypher queries our Chunks use.
 * This is not a 1 to 1 of actual Cypher query types, but is instead specific to our use case
 *
 * MATCH: Matches a single node (EntityType)
 *
 * MATCH_PATH:
 * Matches simple paths like
 * (Entity)-[:RELATIONSHIP]-(Entity) * N
 *
 * or complex subgraphs like
 * (E)-[:R]->(E2)<-[:R2]-(E2)<-[:R3]-(E3)-> ... etc
 *
 * FILTER: Filters properties from aliases
 * ex: WHERE { alias.property } { condition } { value }
 *
 * RETURN: Essentially acts as a View, ViewModel, ResponseModel for the query
 * ex: RETURN p.player_display_name as name, p.position as position, p.
 */
export enum QueryType {
  MATCH = "MATCH",
  MATCH_PATH = "MATCH_PATH",
  FILTER = "FILTER",
  RETURN = "RETURN",
}
