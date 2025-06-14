## Use Cases

### Find:

- Player Info
- Player Games
- Player Seasons
- Player Careers
- Team Info
- Team Games
- Team Seasons
- NFL Games
- NFL Seasons
- Weekly Rosters
- Seasonal Rosters
- Combine Data
- Draft Data
- Quarterback Seasonal NGS

## Chunks

### BaseType

- `BaseChunk<QueryChunkType,InputDataType?>`

### InputDataTypes:

- `Entity`
- `Team : Entity`
- `Coach : Entity`
- `Player : Entity`
- `Official : Entity`
- `Stadium : Entity`
- `Game<NFL | Team | Coach | Player> : Entity`
- `Season<NFL | Team | Coach | Player> : Entity`

### QueryChunkTypes:

- `MatchNode`
- `MatchPath`
- `Filter`
- `Aggregate`
- `Logical`
- `Return`

## Chunk Implementations:

### **Query starts with "From ..."**

- MatchPlayerToPlayerGameChunk<MatchPath, Player?>

  - "players who had games with ..."
  - `MATCH (p:Player)-[:HAD]->(pg:PlayerGame)`,

- MatchPlayerToPlayerSeasonChunk<MatchPath, Player?>

  - "players who had seasons with ..."
  - `MATCH (p:Player)-[:HAD]->(pg:PlayerSeason)`,

- MatchTeamToTeamGameChunk<MatchPath, Team?>

  - "teams who had games with ..."
  - `MATCH (t:Team)-[:HAD]->(tg:TeamGame)`,

- MatchTeamToTeamSeasonChunk<MatchPath, Team?>

  - "teams who had seasons with ..."
  - `MATCH (t:Team)-[:HAD]->(tg:TeamSeason)`,

- MatchPlayerGameNodeChunkByProperty<MatchNode,null>

  - "player games with ..."
  - `MATCH (pg:PlayerGame)`,

- MatchPlayerSeasonNodeChunkByProperty<MatchNode,null>

  - "player seasons with ..."
  - `MATCH (pg:PlayerSeason) `,

- FilterOnNodePropertyChunk<Filter,Entity>

  - "{propertyname} {condition} {value}"
  - `WHERE {entity.property} {condition} {value}`

- AndChunk<>

  - "and"
  - `AND`

- OrChunk

  - "or"
  - `OR`

- AggregateAverageChunk<Aggregate,Any>

  - `WITH avg(entity.numericProperty) as avgProperty`
  - "an average of {entity.numericProperty} per { game | season }"

- AggregateSumChunk<Aggregate,Any>

  - `WITH sum(entity.numericProperty) as totalProperty`
  - "a total of {entity.numericProperty} per { game | season }"

- SpanWeeksInSeasonChunk<Filter,Game<T>>

  - "between weeks {x} and {y} of the {z} season
  - `WHERE T.week >= {lowerBound} AND T.week <= {upperBound} AND pg.season = {season}`

- SpanSeasonsChunk<Filter,Seasons<T>>

  - "between seasons {x} and {y}"
  - `WHERE S >= {lowerBound} AND S <= {upperBound}`

- AtLeastChunk<Aggregate,Any>

  - `WITH sum(entity.numericProperty) as totalProperty`
  - "a total of {entity.numericProperty} per { game | season }"

- ReturnEntitiesChunk<Return,List<Entities>>

  - `RETURN ...entities`
  - "return {entities}"

- SortByChunk<Transform,Entity>
  - `ORDER BY {sortDimension} {sortDirection}`

#### WIP

FIND SIMILAR (requires embeddings):
NFL Players
NFL PlayerCombines

NFL Games (and span)
NFL Seasons (and span)
PlayerGames (and span)
PlayerSeasons (and span)
PlayerCareers
