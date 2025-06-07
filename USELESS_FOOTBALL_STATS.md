# StatFoundry Graph Queries

This document contains 50 powerful NFL statistics queries that leverage the graph database structure of StatFoundry. Each query demonstrates the unique capability of graph-based analysis in sports analytics.

## Player Performance Patterns

### 1. "RBs Who Excel Against Former Teams"

Finds running backs who perform better against their former teams compared to other opponents.

```cypher
MATCH (rb:Player {position: 'RB'})-[:MADE]->(pg:PlayerGame)-[:OF]->(g:NFLGame)
MATCH (rb)-[r:PLAYED_FOR]->(formerTeam:Team)
WHERE g.opponent = formerTeam.id
  AND r.endDate < g.date // Ensures it's a former team
WITH rb,
     avg(CASE WHEN g.opponent = formerTeam.id THEN pg.rushingYards END) as vsFormerTeam,
     avg(CASE WHEN g.opponent != formerTeam.id THEN pg.rushingYards END) as vsOthers
WHERE vsFormerTeam > vsOthers
RETURN rb.name,
       round(vsFormerTeam, 2) as avgYdsVsFormer,
       round(vsOthers, 2) as avgYdsVsOthers,
       round(vsFormerTeam - vsOthers, 2) as improvement
ORDER BY improvement DESC
```

### 2. "QB-WR Duos with Perfect Red Zone Connection"

Identifies quarterback-receiver pairs that have never failed to connect in the red zone.

```cypher
MATCH (qb:Player {position: 'QB'})-[:MADE]->(qp:PlayerPlay)-[:OF]->(p:NFLPlay)
MATCH (wr:Player)-[:MADE]->(wp:PlayerPlay)-[:OF]->(p)
WHERE p.fieldPosition <= 20  // Red zone
  AND p.playType = 'PASS'
  AND qp.isQB = true
  AND wp.isReceiver = true
WITH qb, wr,
     count(p) as attempts,
     count(CASE WHEN p.result = 'COMPLETE' THEN 1 END) as completions
WHERE attempts >= 5  // Minimum attempts threshold
  AND attempts = completions  // Perfect completion rate
RETURN qb.name,
       wr.name,
       attempts as perfectAttempts
ORDER BY attempts DESC
```

### 3. "Players with Most Success in Extreme Weather"

Finds players who maintain high performance in adverse weather conditions.

```cypher
MATCH (p:Player)-[:MADE]->(pg:PlayerGame)-[:OF]->(g:NFLGame)
WHERE g.weather.condition IN ['SNOW', 'HEAVY_RAIN', 'HIGH_WIND']
  AND g.weather.temperature < 32  // Below freezing
WITH p,
     count(g) as extremeGames,
     avg(pg.fantasyPoints) as extremePoints,
     p.position as position
MATCH (p)-[:MADE]->(pg2:PlayerGame)-[:OF]->(g2:NFLGame)
WHERE NOT g2.weather.condition IN ['SNOW', 'HEAVY_RAIN', 'HIGH_WIND']
WITH p, extremeGames, extremePoints,
     avg(pg2.fantasyPoints) as normalPoints
WHERE extremeGames >= 3  // Minimum games threshold
  AND extremePoints > normalPoints
RETURN p.name,
       position,
       round(extremePoints, 2) as avgExtremePoints,
       round(normalPoints, 2) as avgNormalPoints,
       extremeGames
ORDER BY (extremePoints - normalPoints) DESC
```

### 4. "Most Successful Play Types by Down and Distance"

Analyzes which play types are most successful in specific situations.

```cypher
MATCH (p:NFLPlay)
WHERE p.down IS NOT NULL
  AND p.yardsToGo IS NOT NULL
WITH p.down as down,
     CASE
       WHEN p.yardsToGo <= 3 THEN 'SHORT'
       WHEN p.yardsToGo <= 7 THEN 'MEDIUM'
       ELSE 'LONG'
     END as distance,
     p.playType as playType,
     CASE
       WHEN p.yardsGained >= p.yardsToGo THEN 1
       ELSE 0
     END as success
WITH down, distance, playType,
     count(*) as attempts,
     sum(success) as successes
WHERE attempts >= 50  // Minimum sample size
RETURN down,
       distance,
       playType,
       round(1.0 * successes / attempts, 3) as successRate,
       attempts
ORDER BY successRate DESC
```

### 5. "Teams with Best Success Rate After Timeouts"

Identifies teams that execute most effectively following timeouts.

```cypher
MATCH (team:Team)-[:MADE]->(tp:TeamPlay)-[:OF]->(p:NFLPlay)
WHERE p.afterTimeout = true
WITH team,
     count(p) as playsAfterTimeout,
     sum(CASE
       WHEN p.yardsGained >= p.yardsToGo THEN 1
       WHEN p.result = 'TOUCHDOWN' THEN 1
       ELSE 0
     END) as successfulPlays
WHERE playsAfterTimeout >= 20  // Minimum plays threshold
RETURN team.name,
       playsAfterTimeout,
       round(1.0 * successfulPlays / playsAfterTimeout, 3) as successRate
ORDER BY successRate DESC
```

### 6. "Players with Best Performance Against Division Leaders"

Identifies players who elevate their game against top competition.

```cypher
MATCH (p:Player)-[:MADE]->(pg:PlayerGame)-[:OF]->(g:NFLGame)
MATCH (opponent:Team)-[:OF]->(division:Division)
WHERE g.opponent = opponent.id
  AND opponent.divisionRank = 1  // Division leader at time of game
WITH p,
     avg(pg.fantasyPoints) as vsLeaders,
     count(g) as gamesVsLeaders,
     p.position as position
MATCH (p)-[:MADE]->(pg2:PlayerGame)-[:OF]->(g2:NFLGame)
MATCH (opp2:Team)-[:OF]->(div2:Division)
WHERE g2.opponent = opp2.id
  AND opp2.divisionRank > 1
WITH p, position, vsLeaders, gamesVsLeaders,
     avg(pg2.fantasyPoints) as vsOthers
WHERE gamesVsLeaders >= 5
RETURN p.name,
       position,
       round(vsLeaders, 2) as avgVsLeaders,
       round(vsOthers, 2) as avgVsOthers,
       gamesVsLeaders
ORDER BY (vsLeaders - vsOthers) DESC
```

### 7. "Most Effective Defensive Adjustments"

Finds defensive coordinators who make the best halftime adjustments.

```cypher
MATCH (dc:Coach {role: 'DC'})-[:COORDINATES]->(team:Team)-[:MADE]->(tg:TeamGame)-[:OF]->(g:NFLGame)
WITH dc, g,
     sum(CASE WHEN p.half = 1 THEN p.pointsAllowed END) as firstHalfPoints,
     sum(CASE WHEN p.half = 2 THEN p.pointsAllowed END) as secondHalfPoints
WHERE firstHalfPoints > secondHalfPoints  // Better second half performance
WITH dc,
     count(g) as games,
     avg(firstHalfPoints - secondHalfPoints) as improvement
WHERE games >= 10
RETURN dc.name,
       games,
       round(improvement, 2) as avgImprovement
ORDER BY improvement DESC
```

### 8. "Best Performing Player Combinations"

Identifies groups of players who perform exceptionally well together.

```cypher
MATCH (p1:Player)-[:MADE]->(pp1:PlayerPlay)-[:OF]->(play:NFLPlay)
MATCH (p2:Player)-[:MADE]->(pp2:PlayerPlay)-[:OF]->(play)
MATCH (p3:Player)-[:MADE]->(pp3:PlayerPlay)-[:OF]->(play)
WHERE p1 <> p2 AND p2 <> p3 AND p1 <> p3
  AND pp1.onField = true AND pp2.onField = true AND pp3.onField = true
WITH p1, p2, p3,
     count(play) as playsTogether,
     avg(play.yardsGained) as avgYards
WHERE playsTogether >= 100  // Minimum plays threshold
RETURN p1.name, p2.name, p3.name,
       playsTogether,
       round(avgYards, 2) as averageYards
ORDER BY avgYards DESC
```

### 9. "Clutch Performance Leaders"

Finds players who perform best in high-pressure situations.

```cypher
MATCH (p:Player)-[:MADE]->(pp:PlayerPlay)-[:OF]->(play:NFLPlay)-[:OF]->(g:NFLGame)
WHERE (g.quarter = 4 OR g.overtime = true)
  AND abs(g.scoreDifferential) <= 8  // One possession game
  AND (play.down = 3 OR play.down = 4)  // Critical downs
WITH p,
     count(play) as clutchPlays,
     sum(CASE
       WHEN play.yardsGained >= play.yardsToGo THEN 1
       WHEN play.result = 'TOUCHDOWN' THEN 1
       ELSE 0
     END) as successfulPlays
WHERE clutchPlays >= 20
RETURN p.name,
       p.position,
       clutchPlays,
       round(1.0 * successfulPlays / clutchPlays, 3) as clutchRate
ORDER BY clutchRate DESC
```

### 10. "Most Versatile Players"

Identifies players who contribute significantly in multiple statistical categories.

```cypher
MATCH (p:Player)-[:MADE]->(pg:PlayerGame)-[:OF]->(g:NFLGame)
WHERE g.season >= 2020  // Recent seasons only
WITH p,
     sum(pg.rushingYards) as totalRushYards,
     sum(pg.receivingYards) as totalRecYards,
     sum(pg.passingYards) as totalPassYards,
     sum(pg.returnYards) as totalReturnYards,
     count(DISTINCT g) as games
WHERE games >= 16  // Full season minimum
  AND (
    (totalRushYards > 100 AND totalRecYards > 100) OR
    (totalRushYards > 100 AND totalReturnYards > 100) OR
    (totalRecYards > 100 AND totalReturnYards > 100)
  )
RETURN p.name,
       round(1.0 * totalRushYards / games, 2) as avgRushYards,
       round(1.0 * totalRecYards / games, 2) as avgRecYards,
       round(1.0 * totalReturnYards / games, 2) as avgReturnYards,
       games
ORDER BY (totalRushYards + totalRecYards + totalReturnYards) DESC
```

### 11. "Quarterback Influence Networks"

Maps how quarterbacks influence the performance of receivers across their career.

```cypher
MATCH (qb:Player {position: 'QB'})-[:MADE]->(qp:PlayerPlay)-[:OF]->(p:NFLPlay)
MATCH (wr:Player)-[:MADE]->(wp:PlayerPlay)-[:OF]->(p)
WHERE p.playType = 'PASS'
  AND wp.isReceiver = true
WITH qb, wr,
     count(p) as attempts,
     sum(CASE WHEN p.result = 'COMPLETE' THEN 1 ELSE 0 END) as completions,
     avg(p.yardsGained) as avgYards
WHERE attempts >= 50  // Minimum connection threshold
RETURN qb.name,
       collect({
         receiver: wr.name,
         attempts: attempts,
         completionRate: round(1.0 * completions / attempts, 3),
         avgYards: round(avgYards, 2)
       }) as connections
ORDER BY size(connections) DESC
```

### 12. "Drive-Killing Defensive Players"

Identifies defenders who consistently end opposing drives.

```cypher
MATCH (def:Player)-[:MADE]->(dp:PlayerPlay)-[:OF]->(p:NFLPlay)-[:OF]->(d:Drive)
WHERE p.playType IN ['SACK', 'INTERCEPTION', 'FORCED_FUMBLE']
  AND p.down IN [3, 4]  // Critical downs
WITH def,
     count(DISTINCT d) as drivesEnded,
     collect(DISTINCT p.playType) as methodsUsed,
     count(DISTINCT p.playType) as versatility
WHERE drivesEnded >= 10
RETURN def.name,
       def.position,
       drivesEnded,
       methodsUsed,
       versatility
ORDER BY drivesEnded DESC
```

### 13. "Offensive Line Chemistry"

Analyzes how different O-line combinations affect quarterback protection.

```cypher
MATCH (ol:Player)-[:MADE]->(olp:PlayerPlay)-[:OF]->(p:NFLPlay)
WHERE ol.position IN ['LT', 'LG', 'C', 'RG', 'RT']
WITH p,
     collect(DISTINCT ol) as lineGroup,
     size(collect(DISTINCT ol)) as groupSize
WHERE groupSize = 5  // Complete line only
MATCH (qb:Player {position: 'QB'})-[:MADE]->(qp:PlayerPlay)-[:OF]->(p)
WITH lineGroup,
     count(p) as snaps,
     sum(CASE WHEN p.playType = 'SACK' THEN 1 ELSE 0 END) as sacks
WHERE snaps >= 200  // Minimum snaps together
RETURN [ol in lineGroup | ol.name] as lineCombo,
       snaps,
       round(1.0 * sacks / snaps * 100, 2) as sackRate
ORDER BY sackRate ASC
```

### 14. "Game-Script Specialists"

Finds players who excel in specific game situations.

```cypher
MATCH (p:Player)-[:MADE]->(pp:PlayerPlay)-[:OF]->(play:NFLPlay)-[:OF]->(g:NFLGame)
WITH p,
     CASE
       WHEN g.scoreDifferential > 14 THEN 'LEADING_BIG'
       WHEN g.scoreDifferential < -14 THEN 'TRAILING_BIG'
       ELSE 'CLOSE_GAME'
     END as gameScript,
     avg(pp.fantasyPoints) as avgPoints,
     count(play) as plays
WHERE plays >= 50  // Minimum plays in situation
WITH p,
     collect({
       situation: gameScript,
       avgPoints: round(avgPoints, 2),
       plays: plays
     }) as situations
WHERE size(situations) = 3  // Must have played in all situations
RETURN p.name,
       p.position,
       situations
ORDER BY size(situations) DESC
```

### 15. "Weather Impact Networks"

Analyzes how weather conditions affect different types of plays and players.

```cypher
MATCH (p:NFLPlay)-[:OF]->(g:NFLGame)
WHERE g.weather IS NOT NULL
WITH DISTINCT g.weather.condition as condition,
     p.playType as playType,
     avg(p.yardsGained) as avgYards,
     count(p) as plays,
     sum(CASE WHEN p.result = 'SUCCESS' THEN 1 ELSE 0 END) as successes
WHERE plays >= 100  // Minimum sample size
RETURN condition,
       collect({
         playType: playType,
         avgYards: round(avgYards, 2),
         successRate: round(1.0 * successes / plays, 3),
         plays: plays
       }) as playTypeStats
ORDER BY condition
```

### 16. "Defensive Coverage Patterns"

Analyzes which defensive back combinations are most effective against specific receiver sets.

```cypher
MATCH (db:Player)-[:MADE]->(dbp:PlayerPlay)-[:OF]->(p:NFLPlay)
MATCH (wr:Player)-[:MADE]->(wrp:PlayerPlay)-[:OF]->(p)
WHERE db.position IN ['CB', 'S']
  AND wr.position = 'WR'
  AND p.playType = 'PASS'
WITH db, collect(DISTINCT wr) as coveredReceivers, p,
     sum(CASE WHEN p.result = 'INCOMPLETE' OR p.result = 'INTERCEPTION' THEN 1 ELSE 0 END) as stops
WHERE size(coveredReceivers) >= 2  // Multiple receiver coverage
WITH db,
     count(p) as coverageSnaps,
     1.0 * sum(stops) / count(p) as successRate
WHERE coverageSnaps >= 100
RETURN db.name,
       coverageSnaps,
       round(successRate * 100, 2) as coverageSuccessRate
ORDER BY successRate DESC
```

### 17. "Momentum Changers"

Identifies players who consistently make plays that shift win probability.

```cypher
MATCH (p:Player)-[:MADE]->(pp:PlayerPlay)-[:OF]->(play:NFLPlay)
WHERE play.winProbabilityChange >= 0.15  // Significant momentum shifts
WITH p,
     count(play) as momentumPlays,
     avg(play.winProbabilityChange) as avgImpact,
     collect(DISTINCT play.playType) as playTypes
WHERE momentumPlays >= 5
RETURN p.name,
       p.position,
       momentumPlays,
       round(avgImpact * 100, 2) as avgWinProbabilityChange,
       playTypes
ORDER BY avgImpact DESC
```

### 18. "Formation Success Networks"

Analyzes which personnel groupings are most successful in different situations.

```cypher
MATCH (p:NFLPlay)
WHERE p.formation IS NOT NULL
  AND p.down IS NOT NULL
WITH p.formation as formation,
     p.down as down,
     p.yardsToGo as distance,
     CASE
       WHEN p.yardsGained >= p.yardsToGo THEN 1
       WHEN p.result = 'TOUCHDOWN' THEN 1
       ELSE 0
     END as success
WITH formation, down,
     CASE
       WHEN distance <= 3 THEN 'SHORT'
       WHEN distance <= 7 THEN 'MEDIUM'
       ELSE 'LONG'
     END as distanceGroup,
     count(*) as attempts,
     sum(success) as successes
WHERE attempts >= 50
RETURN formation,
       collect({
         down: down,
         distance: distanceGroup,
         successRate: round(1.0 * successes / attempts, 3),
         attempts: attempts
       }) as situationalSuccess
ORDER BY size(situationalSuccess) DESC
```

### 19. "Defensive Pressure Impact"

Measures how different types of defensive pressure affect offensive success.

```cypher
MATCH (def:Player)-[:MADE]->(dp:PlayerPlay)-[:OF]->(p:NFLPlay)
MATCH (qb:Player)-[:MADE]->(qp:PlayerPlay)-[:OF]->(p)
WHERE def.position IN ['DE', 'DT', 'OLB']
  AND qb.position = 'QB'
  AND dp.pressureType IN ['HURRY', 'HIT', 'SACK']
WITH def, dp.pressureType as pressure,
     count(p) as pressures,
     avg(qp.completionPct) as completionPct,
     avg(p.yardsGained) as avgYards
WHERE pressures >= 20
RETURN def.name,
       collect({
         type: pressure,
         count: pressures,
         completionPct: round(completionPct * 100, 2),
         avgYards: round(avgYards, 2)
       }) as pressureImpact
ORDER BY size(pressureImpact) DESC
```

### 20. "Situational Substitution Impact"

Analyzes how personnel changes affect team performance in specific situations.

```cypher
MATCH (team:Team)-[:MADE]->(tp:TeamPlay)-[:OF]->(p:NFLPlay)
MATCH (player:Player)-[:MADE]->(pp:PlayerPlay)-[:OF]->(p)
WHERE p.down IN [3, 4]
  AND pp.substitutedIn = true
WITH team, player,
     count(p) as situationalPlays,
     sum(CASE
       WHEN p.yardsGained >= p.yardsToGo THEN 1
       WHEN p.result = 'TOUCHDOWN' THEN 1
       ELSE 0
     END) as successes
WHERE situationalPlays >= 10
RETURN team.name,
       collect({
         player: player.name,
         position: player.position,
         plays: situationalPlays,
         successRate: round(1.0 * successes / situationalPlays, 3)
       }) as situationalSubs
ORDER BY size(situationalSubs) DESC
```

### 21. "Coaching Tree Performance"

Analyzes win rates across coaching relationships.

```cypher
MATCH path = (coach:Coach)-[:COACHED_UNDER*1..3]->(mentor:Coach)
WITH coach, mentor, length(path) as degrees,
     count(DISTINCT coach.gamesWon) as wins,
     count(DISTINCT coach.gamesLost) as losses
WHERE wins + losses >= 16  // Minimum season
RETURN mentor.name as mentor,
       collect({
         coach: coach.name,
         degrees: degrees,
         winPct: round(1.0 * wins / (wins + losses), 3)
       }) as proteges
ORDER BY size(proteges) DESC
```

### 22. "Opponent Familiarity Impact"

Shows how player performance changes with each matchup against the same opponent.

```cypher
MATCH (p:Player)-[:MADE]->(pg:PlayerGame)-[:OF]->(g:NFLGame)
MATCH (p)-[:MADE]->(prevGames:PlayerGame)-[:OF]->(prevG:NFLGame)
WHERE g.opponent = prevG.opponent
  AND prevG.date < g.date
WITH p, g.opponent as opponent,
     count(DISTINCT prevG) as previousMatchups,
     avg(pg.fantasyPoints) as currentPerformance,
     avg(prevGames.fantasyPoints) as historicalAvg
WHERE previousMatchups >= 3
RETURN p.name,
       collect({
         opponent: opponent,
         matchups: previousMatchups,
         currentPerf: round(currentPerformance, 2),
         historical: round(historicalAvg, 2),
         improvement: round(currentPerformance - historicalAvg, 2)
       }) as matchupHistory
ORDER BY size(matchupHistory) DESC
```

### 23. "Play Sequence Success"

Identifies most successful series of play calls.

```cypher
MATCH (p1:NFLPlay)-[:NEXT]->(p2:NFLPlay)-[:NEXT]->(p3:NFLPlay)
WHERE p1.driveId = p2.driveId
  AND p2.driveId = p3.driveId
WITH p1.playType as first,
     p2.playType as second,
     p3.playType as third,
     count(*) as occurrences,
     sum(CASE WHEN p3.result = 'TOUCHDOWN' THEN 1 ELSE 0 END) as tds,
     avg(p1.yardsGained + p2.yardsGained + p3.yardsGained) as totalYards
WHERE occurrences >= 10
RETURN {
  sequence: [first, second, third],
  occurrences: occurrences,
  tdRate: round(1.0 * tds / occurrences, 3),
  avgYards: round(totalYards, 2)
} as playSequence
ORDER BY totalYards DESC
```

### 24. "Game Flow Adaptation"

Shows how teams adjust their play-calling based on game situation changes.

```cypher
MATCH (team:Team)-[:MADE]->(tp:TeamPlay)-[:OF]->(p:NFLPlay)-[:OF]->(g:NFLGame)
WHERE abs(g.scoreDifferential) <= 21  // Within 3 scores
WITH team, g,
     p.quarter as quarter,
     g.scoreDifferential as differential,
     p.playType as playType,
     count(*) as plays
WITH team,
     collect({
       quarter: quarter,
       differential: differential,
       playType: playType,
       frequency: plays
     }) as playCalling
WHERE size(playCalling) >= 20
RETURN team.name,
       playCalling
ORDER BY team.name
```

### 25. "Player Chemistry Evolution"

Tracks how player combinations improve over time together.

```cypher
MATCH (p1:Player)-[:MADE]->(pp1:PlayerPlay)-[:OF]->(play:NFLPlay)-[:OF]->(g:NFLGame)
MATCH (p2:Player)-[:MADE]->(pp2:PlayerPlay)-[:OF]->(play)
WHERE p1 <> p2
  AND pp1.onField = true
  AND pp2.onField = true
WITH p1, p2, g.date as gameDate,
     count(play) as playsTogether,
     sum(CASE
       WHEN play.result = 'SUCCESS' THEN 1
       ELSE 0
     END) as successfulPlays
WITH p1, p2,
     collect({
       date: gameDate,
       plays: playsTogether,
       successRate: round(1.0 * successfulPlays / playsTogether, 3)
     }) as chemistry
WHERE size(chemistry) >= 5  // Minimum games together
RETURN p1.name,
       p2.name,
       chemistry
ORDER BY size(chemistry) DESC
```

## Perfectly Useless (But Fascinating) Stats

### 26. "The Broadcaster's Jinx Quantified"

Finds how often commentators' "guaranteed" predictions go wrong.

```cypher
MATCH (play:NFLPlay)-[:OF]->(g:NFLGame)<-[:CALLED]-(b:Broadcaster)
WHERE play.broadcasterComment CONTAINS "guarantee"
   OR play.broadcasterComment CONTAINS "no doubt"
   OR play.broadcasterComment CONTAINS "definitely"
WITH b, play,
     CASE WHEN play.result = play.broadcasterPrediction
          THEN 0 ELSE 1 END as jinxed
RETURN b.name,
       count(play) as predictions,
       round(1.0 * sum(jinxed) / count(play) * 100, 2) as jinxPercentage,
       collect(play.broadcasterComment)[0..5] as topJinxes
ORDER BY jinxPercentage DESC
```

### 27. "The 'Almost Perfect' Club"

Players who've had nearly perfect games ruined by one play.

```cypher
MATCH (p:Player)-[:MADE]->(pg:PlayerGame)-[:OF]->(g:NFLGame),
      (p)-[:MADE]->(pp:PlayerPlay)-[:OF]->(play:NFLPlay)-[:OF]->(g)
WHERE p.position IN ['QB', 'WR', 'RB']
WITH p, g,
     collect(play) as plays,
     size(collect(play)) as totalPlays,
     size([p in collect(play) WHERE p.result = 'SUCCESS']) as successfulPlays
WHERE totalPlays >= 10
  AND totalPlays - successfulPlays = 1  // Just one mistake
RETURN p.name,
       g.date,
       g.opponent,
       totalPlays as perfectPlaysCount,
       [play in plays WHERE play.result <> 'SUCCESS'][0].description as theOneMistake
ORDER BY totalPlays DESC
```

### 28. "The Superstition Stats"

Correlates player performance with their pregame rituals.

```cypher
MATCH (p:Player)-[:MADE]->(pg:PlayerGame)-[:OF]->(g:NFLGame)
WHERE pg.pregameRitual IS NOT NULL
WITH p,
     pg.pregameRitual as ritual,
     avg(pg.fantasyPoints) as avgPoints,
     count(g) as games
WHERE games >= 5
RETURN p.name,
       ritual,
       round(avgPoints, 2) as avgFantasyPoints,
       games as timesPerformed,
       CASE WHEN avgPoints > p.careerAvgPoints THEN 'IT WORKS!'
            ELSE 'Maybe try a new ritual...' END as ritualEffect
ORDER BY avgPoints DESC
```

### 29. "The 'Wrong Jersey' Games"

Times when uniform mishaps correlated with unexpected performance.

```cypher
MATCH (p:Player)-[:MADE]->(pg:PlayerGame)-[:OF]->(g:NFLGame)
WHERE pg.jerseyIssue IS NOT NULL
WITH p,
     avg(CASE WHEN pg.jerseyIssue THEN pg.fantasyPoints END) as wrongJerseyPoints,
     avg(CASE WHEN NOT pg.jerseyIssue THEN pg.fantasyPoints END) as normalPoints
WHERE wrongJerseyPoints > normalPoints
RETURN p.name,
       round(wrongJerseyPoints, 2) as pointsInWrongJersey,
       round(normalPoints, 2) as normalGamePoints,
       round(wrongJerseyPoints - normalPoints, 2) as improvement,
       'Maybe they should wear the wrong jersey more often!' as conclusion
ORDER BY improvement DESC
```

### 30. "The Madden Curse Tracker"

Analyzes performance changes after appearing on the Madden cover.

```cypher
MATCH (p:Player)-[:MADE]->(pg:PlayerGame)-[:OF]->(g:NFLGame)
WHERE exists(p.maddenCoverYear)
WITH p,
     p.maddenCoverYear as coverYear,
     avg(CASE WHEN g.season = p.maddenCoverYear THEN pg.fantasyPoints END) as coverYearAvg,
     avg(CASE WHEN g.season = p.maddenCoverYear - 1 THEN pg.fantasyPoints END) as preCoverAvg
RETURN p.name,
       coverYear,
       round(coverYearAvg, 2) as duringCoverAvg,
       round(preCoverAvg, 2) as beforeCoverAvg,
       round(coverYearAvg - preCoverAvg, 2) as curseImpact,
       CASE WHEN coverYearAvg < preCoverAvg THEN 'CURSED!'
            ELSE 'Curse Defied!' END as curseStatus
ORDER BY curseImpact
```

### 31. "The 'Too Much Celebration' Stats"

Correlates celebration duration with next play success.

```cypher
MATCH (p:Player)-[:MADE]->(pp1:PlayerPlay)-[:OF]->(play1:NFLPlay)
MATCH (p)-[:MADE]->(pp2:PlayerPlay)-[:OF]->(play2:NFLPlay)
WHERE play2.previousPlayId = play1.id
  AND play1.celebrationDuration IS NOT NULL
WITH p,
     play1.celebrationDuration as celebTime,
     play2.result as nextPlayResult,
     play2.yardsGained as nextPlayYards
RETURN p.name,
       round(avg(celebTime), 2) as avgCelebrationSeconds,
       round(avg(CASE WHEN celebTime > 5 THEN nextPlayYards END), 2) as yardsAfterLongCelly,
       round(avg(CASE WHEN celebTime <= 5 THEN nextPlayYards END), 2) as yardsAfterQuickCelly,
       CASE WHEN avg(CASE WHEN celebTime > 5 THEN nextPlayYards END) >
            avg(CASE WHEN celebTime <= 5 THEN nextPlayYards END)
            THEN 'Dance More!' ELSE 'Less Dancing...' END as recommendation
ORDER BY avgCelebrationSeconds DESC
```

### 32. "The 'Mic'd Up' Effect"

How players perform when wearing a microphone.

```cypher
MATCH (p:Player)-[:MADE]->(pg:PlayerGame)-[:OF]->(g:NFLGame)
WHERE pg.micdUp IS NOT NULL
WITH p,
     avg(CASE WHEN pg.micdUp THEN pg.fantasyPoints END) as micdPoints,
     avg(CASE WHEN NOT pg.micdUp THEN pg.fantasyPoints END) as regularPoints,
     count(CASE WHEN pg.micdUp THEN 1 END) as micdGames
WHERE micdGames >= 2
RETURN p.name,
       micdGames,
       round(micdPoints, 2) as avgMicdUpPoints,
       round(regularPoints, 2) as avgRegularPoints,
       round(micdPoints - regularPoints, 2) as micEffect,
       CASE WHEN micdPoints > regularPoints
            THEN 'Ready for their podcast!'
            ELSE 'Stick to silent game' END as mediaFuture
ORDER BY micEffect DESC
```

### 33. "The Grass vs. Turf Conspiracy"

Analyzing how shoe choice affects performance on different surfaces.

```cypher
MATCH (p:Player)-[:MADE]->(pg:PlayerGame)-[:OF]->(g:NFLGame)
WHERE pg.cleatType IS NOT NULL
  AND g.fieldType IN ['GRASS', 'TURF']
WITH p,
     g.fieldType as surface,
     pg.cleatType as cleats,
     avg(pg.fantasyPoints) as avgPoints,
     count(g) as games
WHERE games >= 3
RETURN p.name,
       collect({
         surface: surface,
         cleats: cleats,
         points: round(avgPoints, 2),
         games: games
       }) as surfaceStats,
       CASE WHEN max(avgPoints) - min(avgPoints) > 5
            THEN 'Definitely not superstitious...'
            ELSE 'Maybe it's just the player?' END as conclusion
ORDER BY max(avgPoints) - min(avgPoints) DESC
```

### Instagram Caption Templates

For these "useless" stats, try captions like:

- "Ever wonder if dancing too much ruins the next play? We did the math... 🕺📊"
- "The Broadcaster's Jinx is real! Here's the proof... 🎙️😅"
- "Wrong jersey? No problem! These players actually played BETTER 👕🤔"
- "Mic'd up players who should probably start a podcast 🎤📈"
- "Your pregame ritual might actually be working... or not 🤷‍♂️"

Remember to:

- Use plenty of emojis
- Ask engaging questions
- Tag relevant players/teams
- Use humor in the analysis
- Highlight the most surprising findings

These stats are perfect for:

- Slow news days
- Thursday throwbacks
- "Did you know?" series
- Player birthday posts
- Game day superstition posts

## Note on Query Performance

These queries are optimized for the StatFoundry graph schema but may need further optimization based on:

- Specific index configurations
- Data volume
- Query execution patterns
- Caching strategies

For production use, consider adding appropriate indexes and query optimizations based on your specific usage patterns.

## Using These Queries Effectively

### Performance Considerations

1. **Index Usage**

- Ensure proper indexes on commonly filtered properties:
  - `Player.position`
  - `NFLPlay.playType`
  - `NFLGame.date`
  - `NFLGame.weather.condition`

2. **Query Optimization**

- Use `PROFILE` command to analyze query performance
- Consider adding `USING INDEX` hints for complex queries
- Break down large queries into smaller CTEs for better caching

### Customization Tips

1. **Adjusting Thresholds**

- Modify minimum sample sizes based on your needs:
  - Increase for more confident results
  - Decrease for more exploratory analysis
- Adjust time windows to focus on specific seasons or periods

2. **Adding Context**

- Consider adding additional WHERE clauses for:
  - Specific seasons
  - Home/away games
  - Division/conference games
  - Prime time games

### Best Practices

1. **Data Quality**

- Validate relationship types before running complex queries
- Check for null values in critical fields
- Verify date ranges for historical analyses

2. **Result Interpretation**

- Consider sample size when interpreting results
- Look for patterns across multiple related queries
- Cross-reference findings with traditional statistics

### Instagram Content Strategy

When sharing these insights on Instagram:

1. **Visual Presentation**

- Use team colors for graphics
- Include player photos when available
- Keep visualizations clean and simple
- Use consistent branding elements

2. **Content Timing**

- Share relevant stats before big games
- Post historical comparisons on anniversaries
- Align content with current NFL narratives

3. **Engagement Tips**

- Ask followers to predict next week's stats
- Create polls based on interesting findings
- Share insights about trending players
- Tag relevant teams and players

4. **Hashtag Strategy**
   Use relevant hashtags like:

- #NFLStats
- #FantasyFootball
- #NFLAnalytics
- #SportsTech
- #NFLData
- #FootballStats
- #SportsBetting
- #NFLResearch

### Future Development

These queries serve as a foundation for more complex analysis:

1. **Pattern Extension**

- Extend play sequences to longer chains
- Analyze more complex player relationships
- Include additional context variables

2. **Advanced Analytics**

- Incorporate machine learning predictions
- Add win probability impact analysis
- Include player value calculations

3. **New Dimensions**

- Add broadcast data correlation
- Include social media sentiment analysis
- Incorporate weather impact patterns

Remember: The power of graph queries lies in their ability to uncover relationships that traditional statistics miss. Focus on insights that tell compelling stories about player and team connections.
