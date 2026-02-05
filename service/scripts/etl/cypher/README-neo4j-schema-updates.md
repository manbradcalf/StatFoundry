# Neo4j Schema Updates

## Queries to Run in Production

### 1. TeamSeason → Season
Creates `OF` relationship linking team seasons to their season node.

```cypher
MATCH (ts:TeamSeason)
WITH ts, ts.season AS year
MATCH (s:Season {season: year})
CREATE (ts)-[:OF]->(s)
```

### 2. TeamGame → TeamSeason
Creates `OF` relationship linking team game stats to the team's season aggregate.

```cypher
MATCH (tg:TeamGame)
WITH tg, tg.team AS team, tg.season AS year, tg.season_type AS st
MATCH (ts:TeamSeason {team: team, season: year, season_type: st})
CREATE (tg)-[:OF]->(ts)
```

### 3. Team → TeamSeason
Creates `HAD` relationship linking teams to their season records.

```cypher
MATCH (t:Team)
WITH t, t.team_abbr AS abbr
MATCH (ts:TeamSeason {team: abbr})
CREATE (t)-[:HAD]->(ts)
```

> **Note:** Verify the property name on Team nodes — could be `team_abbr`, `abbr`, or `name`.

---

## Session Recap

### Schema Exploration
Explored the following node types and their relationships:

| Node | Outgoing Relationships | Incoming Relationships |
|------|------------------------|------------------------|
| `Player` | `HAD` → PlayerSeason, PlayerGame | |
| `PlayerSeason` | `OF` → Season | `HAD` ← Player |
| `PlayerGame` | `OF` → Game, `HAD` → Player | `HAD` ← Player, Game |
| `Game` | `OF` → Season | `OF` ← PlayerGame, TeamGame |
| `TeamGame` | `OF` → Game, TeamSeason | |
| `TeamSeason` | `OF` → Season | `OF` ← TeamGame |
| `Season` | | `OF` ← PlayerSeason, Game, TeamSeason |
| `Team` | | (none currently) |

### Identified Schema Gaps
- `TeamSeason` had no relationship to `Season` (some now exist)
- `TeamGame` had no relationship to `TeamSeason` (some now exist)
- `Team` has no relationship to `TeamSeason`
- `PlayerGame` connects to `Game`, not directly to `TeamGame`

### Relationships Backfilled (Dev)
- `Game -[:OF]-> Season` — backfilled missing relationships

### Path Analysis
Shortest path from `Player` to `TeamSeason`:
```
(Player)-[:HAD]->(PlayerSeason)-[:OF]->(Season)<-[:OF]-(TeamSeason)
```
3 hops via Season.

With `PlayerGame` included:
```
Player -> PlayerGame -> Game <- TeamGame -> TeamSeason
```
4 hops (requires `TeamGame -[:OF]-> TeamSeason` relationship).

### Sample Query: Sam Darnold 2024 Stats
```cypher
MATCH (ps:PlayerSeason)
WHERE ps.player_name CONTAINS 'Darnold' AND ps.season = 2024
RETURN ps.player_name, ps.season, ps.passing_yards, ps.teams, ps.passing_tds, ps.interceptions
```

Result: 4,319 passing yards, 35 TDs, 12 INTs (MIN)

### Data Notes
- `PlayerSeason` data goes up to 2024 (no 2025 yet)
- `Game` and `TeamSeason` have 2025 data
- Season nodes exist from 2000-2025
