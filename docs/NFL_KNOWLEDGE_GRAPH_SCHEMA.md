# Comprehensive NFL Knowledge Graph Schema with Multi-Hop Relationships

## Core Entity Types from nfl_data_py

### Node Types
```typescript
// Player & Personnel
Player: { gsis_id, display_name, position, college, birthdate, height, weight }
Coach: { coach_id, name, position_coached, years_experience }
Official: { official_id, name, position, years_active }

// Team & Organization  
Team: { team_abbr, team_name, division, conference, city, founded_year }
Franchise: { franchise_id, name, moved_from, moved_year }

// Contract & Business
Contract: { contract_id, value, years, guaranteed, signing_bonus, cap_hit }
Trade: { trade_id, date, teams_involved, compensation }
DraftPick: { draft_year, round, pick, overall_pick, value }

// Performance & Events
Game: { game_id, week, season, home_team, away_team, weather, attendance }
PlayerGame: { /* existing stats */ }
PlayerSeason: { /* existing stats */ }
Play: { /* existing play-by-play data */ }

// Scouting & Development
Combine: { year, player_id, forty_time, bench_press, vertical, broad_jump, ... }
College: { college_name, conference, division }
Draft: { year, team, round, pick, player, college }

// Schedule & Context
Season: { year, playoff_format, rule_changes }
Week: { week_number, season, type } // regular, postseason, preseason
Injury: { injury_id, player, date, type, severity, games_missed }
```

## Relationship Types & Multi-Hop Patterns

### Player Relationships
```cypher
// Basic Career
(Player)-[:PLAYED_FOR {years, jersey_number}]->(Team)
(Player)-[:DRAFTED_BY {year, round, pick}]->(Team) 
(Player)-[:ATTENDED]->(College)
(Player)-[:SIGNED {date, contract_type}]->(Contract)

// Performance
(Player)-[:HAD]->(PlayerGame)-[:IN_GAME]->(Game)
(Player)-[:HAD]->(PlayerSeason)-[:IN_SEASON]->(Season)
(Player)-[:PARTICIPATED_IN]->(Combine)

// Career Events  
(Player)-[:TRADED_FROM {date, compensation}]->(Team)
(Player)-[:TRADED_TO {date, compensation}]->(Team)
(Player)-[:INJURED {date, type, severity}]->(Injury)
(Player)-[:COACHED_BY {years, position}]->(Coach)
```

### Team & Organization Relationships
```cypher
// Team Structure
(Team)-[:IN_DIVISION]->(Division)
(Team)-[:IN_CONFERENCE]->(Conference) 
(Team)-[:PART_OF_FRANCHISE]->(Franchise)
(Team)-[:RELOCATED_FROM {year}]->(Team) // Historical moves

// Roster Management
(Team)-[:EMPLOYED {role, years}]->(Coach)
(Team)-[:DRAFTED {year, round, pick}]->(Player)
(Team)-[:SIGNED {date, type}]->(Player)
(Team)-[:RELEASED {date, reason}]->(Player)
(Team)-[:TRADED_AWAY {date, received}]->(Player)
(Team)-[:TRADED_FOR {date, gave_up}]->(Player)

// Competition
(Team)-[:PLAYED_AGAINST]->(Team) // via Game
(Team)-[:DEFEATED {score, week, season}]->(Team)
(Team)-[:LOST_TO {score, week, season}]->(Team)
```

### Coaching & Personnel Relationships
```cypher
// Coaching Trees & Development
(Coach)-[:MENTORED_BY]->(Coach)
(Coach)-[:COACHED_UNDER]->(Coach)
(Coach)-[:PROMOTED_FROM {previous_role}]->(Coach)
(Coach)-[:HIRED_BY {date, role, salary}]->(Team)
(Coach)-[:FIRED_BY {date, reason}]->(Team)

// Coach-Player Development
(Coach)-[:DEVELOPED]->(Player)
(Coach)-[:RECRUITED]->(Player) // college context
```

### Contract & Business Relationships
```cypher
// Financial & Legal
(Player)-[:SIGNED]->(Contract)-[:WITH_TEAM]->(Team)
(Contract)-[:RESTRUCTURED {date, new_terms}]->(Contract)
(Contract)-[:EXPIRED {date}]->(Team)

// Draft Economics
(Team)-[:TRADED_PICK {compensation}]->(DraftPick)-[:TO_TEAM]->(Team)
(DraftPick)-[:USED_ON]->(Player)
(DraftPick)-[:VALUED_AT {points, equivalent}]->(DraftValue)
```

### Game & Performance Relationships  
```cypher
// Game Context
(Game)-[:OFFICIATED_BY]->(Official)
(Game)-[:PLAYED_AT]->(Stadium)
(Game)-[:IN_WEATHER {conditions, temperature, wind}]->(WeatherCondition)
(Game)-[:PART_OF_WEEK]->(Week)-[:IN_SEASON]->(Season)

// Play-by-Play Connections
(Play)-[:PART_OF_DRIVE]->(Drive)-[:IN_GAME]->(Game)
(Play)-[:INVOLVED_PLAYER {role}]->(Player) // passer, rusher, receiver, etc.
(Play)-[:RESULTED_IN]->(Outcome) // touchdown, interception, etc.
```

### Scouting & Development Relationships
```cypher
// College to NFL Pipeline
(College)-[:PRODUCED]->(Player)
(College)-[:IN_CONFERENCE]->(CollegeConference)
(College)-[:COMPETED_AGAINST]->(College) // schedule/rivalry data

// Draft & Combine
(Player)-[:TESTED_AT]->(Combine)
(Combine)-[:MEASURED {test_name, result, percentile}]->(CombineResult)
(Player)-[:INVITED_TO]->(Combine)

// Positional Development
(Player)-[:PLAYED_POSITION {years, snaps}]->(Position)
(Player)-[:TRANSITIONED_FROM]->(Position)-[:TO_POSITION]->(Position)
```

## Advanced Multi-Hop Query Patterns Enabled

### Coaching Tree Analysis
```cypher
// Find all coaches in Bill Belichick's coaching tree
CALL apoc.path.expandConfig(
  belicheck_node, 
  {relationshipFilter: 'MENTORED>|COACHED_UNDER>', maxLevel: 4}
) YIELD path
```

### Draft Value Networks
```cypher  
// Teams that frequently trade picks with each other
MATCH (t1:Team)-[:TRADED_PICK]->(pick)-[:TO_TEAM]->(t2:Team)
CALL apoc.path.spanningTree(t1, {relationshipFilter: 'TRADED_PICK'})
```

### Player Development Pathways
```cypher
// SEC players who became Pro Bowl receivers under specific coaches  
MATCH (p:Player)-[:ATTENDED]->(c:College)-[:IN_CONFERENCE]->({name: 'SEC'})
MATCH (p)-[:PLAYED_POSITION]->({name: 'WR'})
MATCH (p)-[:COACHED_BY]->(coach:Coach)
CALL apoc.path.expand(p, {
  relationshipFilter: 'HAD>',
  labelFilter: 'PlayerSeason',
  maxLevel: 10
})
```

### Market & Geographic Analysis
```cypher
// Players from same college who ended up on division rivals
MATCH (p1:Player)-[:ATTENDED]->(college:College)<-[:ATTENDED]-(p2:Player)
MATCH (p1)-[:PLAYED_FOR]->(t1:Team)-[:IN_DIVISION]->(div)<-[:IN_DIVISION]-(t2:Team)<-[:PLAYED_FOR]-(p2)
```

### Performance Correlation Networks
```cypher
// QBs and their favorite targets across multiple teams
CALL apoc.path.expandConfig(
  qb_node,
  {relationshipFilter: 'PLAYED_WITH|THREW_TO', maxLevel: 3}
) YIELD path
```

## APOC-Enhanced Chunk Patterns for NFL Data

### Relationship Discovery Chunks
```typescript
{
  english: "who played with {player} at some point",
  cypher: "CALL apoc.path.expand({player}, {relationshipFilter: 'TEAMMATE|PLAYED_WITH', maxLevel: 2}) YIELD path",
  apocProcedure: "apoc.path.expand"
},

{
  english: "in the coaching tree of {coach}",
  cypher: "CALL apoc.path.expandConfig({coach}, {relationshipFilter: 'MENTORED>|COACHED_UNDER>', maxLevel: 4}) YIELD path",
  queryType: QueryType.COACHING_TREE
},

{
  english: "teams that frequently trade with {team}",
  cypher: "CALL apoc.path.subgraphNodes({team}, {relationshipFilter: 'TRADED_WITH', maxLevel: 2}) YIELD node",
  apocProcedure: "apoc.path.subgraphNodes"
}
```

### Dynamic Statistical Analysis Chunks  
```typescript
{
  english: "with similar {stat} patterns to {player}",
  cypher: "CALL apoc.cypher.run('MATCH (comparison:Player)...[dynamic statistical comparison]', {params}) YIELD value",
  apocProcedure: "apoc.cypher.run",
  requiresDynamicQuery: true
}
```

## Schema Evolution Benefits

### Automatic Relationship Discovery
When new nfl_data_py datasets are added:

1. **Coaching Staff Data** → Generates coaching relationship chunks automatically
2. **Contract Details** → Creates financial analysis chunks  
3. **Injury Reports** → Builds injury correlation chunks
4. **Combine Invites** → Generates scouting pipeline chunks
5. **Trade Compensation** → Creates draft value analysis chunks

### Complex Query Capabilities
```typescript
// These become possible through chunk chaining:

"SEC quarterbacks coached by former Patriots assistants who threw to players now coaching in the NFC"

"Teams that drafted running backs in rounds 2-4 from schools that produced previous Pro Bowl receivers"

"Players who tested poorly at the combine but succeeded under coaches known for developing similar positions"

"Division rivals who consistently trade draft picks and the long-term impact on their rosters"
```

## Implementation Impact

### Current State
- Simple filters: "players with > 300 passing yards"
- Single-hop: "players who played for Minnesota"

### With Full NFL Knowledge Graph  
- Multi-hop discovery: "players connected to Tom Brady within 3 degrees"
- Pattern analysis: "teams that follow New England's draft strategy"  
- Network effects: "coaching trees that produce the most successful coordinators"
- Temporal patterns: "how draft strategies evolved after salary cap changes"

This transforms StatFoundry from a stats filter into a comprehensive NFL relationship explorer, all generated automatically from the discovered schema.