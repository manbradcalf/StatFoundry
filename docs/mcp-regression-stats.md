# MCP regression stats (50)

Questions to ask the StatFoundry MCP, from simple to nuanced. Each one names
the trap it guards. Sources are commits, ETL loaders in
`service/scripts/etl/cypher/`, and `ui/src/data/exampleSearches.ts`.

Expected values: only #1 has a recorded answer (from
`README-neo4j-schema-updates.md`). For the rest, run once against a known-good
DB, review by hand, and pin the result as the golden value.

## Tier 1: simple lookups

1. **Sam Darnold's 2024 passing yards, TDs, INTs.** Golden: 4,319 / 35 / 12 (MIN). Name `CONTAINS` match on PlayerSeason.
2. **100+ yard rushing games in 2024.** Baseline filter + season (example search).
3. **300+ yard passing games in 2024.** Same shape, passing (example search).
4. **150+ yard receiving games in 2024.** Same shape, receiving (example search).
5. **Games with 10+ targets in 2024.** Integer stat filter (example search).
6. **Games with 2+ rushing TDs in 2024.** `>=` on a small integer (example search).
7. **All 1,000-yard rushing seasons.** No season filter; must span 2000 to latest, not just one year.
8. **All 4,000-yard passing seasons.** Same, passing.
9. **Final score of Super Bowl LVIII.** Played Feb 2024 but `season = 2023`; `game_type = 'SB'`; `display_score` (fixes #168, 920262e).
10. **How many games did the Bills play in 2024?** Must say whether playoffs count; `season_type` REG vs POST.

## Tier 2: operators, enums, string handling

11. **RBs and FBs with 100+ rushing yards in a game.** `position IN [...]` (71b0ec5, the IN fix on this branch).
12. **Players whose last name contains "smith".** Lowercase input; case-insensitive contains (the Option B `toLower` work).
13. **Ja'Marr Chase's 2024 receiving yards.** Apostrophe in a name; fillTemplate has no quote escaping.
14. **Amon-Ra St. Brown's 2023 receptions.** Hyphen and period in a name.
15. **Raiders games in 2019 vs 2020.** OAK to LV abbreviation change; asking "Raiders" must hit both.
16. **Rams home games in 2015 vs 2016.** STL to LA; nflverse uses `LA`, not `LAR` (hardcoded team enum, cab8caa).
17. **Chargers games in 2016 vs 2017.** SD to LAC.
18. **2024 plays with KC on offense against BUF.** `posteam` / `defteam` enum seeding (9ead95d).
19. **Games on grass below 20°F.** `surface` enum plus `temp` float; dome games have null temp and must not count.
20. **Games with wind over 20 mph.** Nulls for indoor games; must not error or count as 0.
21. **2024 division games that went to overtime.** `div_game` is boolean, but `overtime` is a float (1.0), so `overtime = true` returns nothing.
22. **RBs over 100 rushing yards in week 5 of 2024.** Week + position + stat in one ask (example from the NL search plan).

## Tier 3: data-model traps

23. **Who led the league in sacks in 2023?** `sacks` on PlayerGame/PlayerSeason means sacks *taken* (renamed from `sacks_suffered`). A naive answer returns QBs. The right answer is a pass rusher or "not in the data".
24. **Most interceptions in a single game, 2024.** PlayerGame `interceptions` merges thrown and defensive INTs via `coalesce`. It should use `passing_interceptions` or `def_interceptions`.
25. **Most passing 2-pt conversions in a season.** PlayerSeason stores this as a boolean (`> 0`), so the count is gone. It should flag the problem, not rank by true/false.
26. **What teams did Amari Cooper play for in 2024?** Traded CLE to BUF, but PlayerSeason `teams` only holds `[recent_team]`. Expect both teams (be87155).
27. **Best yards per carry, min 150 carries, in a season.** Needs the threshold; `yards_per_carry` is 0.0 when carries are 0.
28. **Derrick Henry's 2024 yards per carry.** Average of per-game YPC (zeros included) differs from total yards ÷ total carries. It should use the ratio of sums.
29. **Josh Allen's 2019 sacks.** Two Josh Allens (BUF QB, JAX edge). It must disambiguate by position or gsis_id, and the sacks trap from #23 also applies.
30. **Adrian Peterson's career rushing yards.** Two Adrian Petersons (MIN 2007+, CHI 2002–09). Merging them inflates the total.
31. **Mike Williams' receiving yards in 2012 vs 2019.** Different players (TB vs LAC) share the name.
32. **How many games did Travis Kelce play in 2024?** Count of PlayerGame should match PlayerSeason `games`. Catches orphan or duplicate PlayerGames from the name migration (#163, #186).
33. **Patrick Mahomes' career playoff passing yards.** PlayerSeason is REG only; it must go through PlayerGame with `season_type = 'POST'`.
34. **2025 rushing leaders.** Game/TeamSeason have 2025 but PlayerSeason may not. It must not answer "nobody".
35. **Most rushing yards per game, 2020 vs 2021.** 16- vs 17-game seasons; needs per-game normalization by `games`.

## Tier 4: team and derived stats

36. **Best pass defense in 2023 by yards allowed.** `pass_yards_allowed` is derived from opponent TeamGames; rank is ascending (lower is better).
37. **#1 rush offense in 2024.** `rush_offense_rank` is descending; check tie handling.
38. **Rush yards allowed per game in the 2024 playoffs.** Allowed stats are computed for REG only. It should say unavailable, not return null or 0.
39. **Packers' 2024 home record.** W/L derived from `home_score` / `away_score` (floats); `result` = home − away; ties.
40. **Biggest upset by spread in 2024.** `spread_line` sign convention (positive = home favored). Easy to invert.
41. **2024 games where the over hit.** `total` vs `total_line`, both floats; pushes.
42. **Team passing CPOE leaders, 2024.** `passing_cpoe` exists only on TeamGame, so it must not look on PlayerGame or PlayerSeason.
43. **Neutral-site and Thursday games in 2024.** `location = 'Neutral'`, `weekday`; returns `gameday` DateTime (serialization fix 384bba1).

## Tier 5: play-level, participation, multi-hop

44. **4th-down conversion rate by team, 2024.** Must exclude punts, FGs, `aborted_play`, `play_deleted`, and penalty no-plays.
45. **Red-zone TD passes by QB, 2024.** `yardline_100 <= 20`; easy to flip field-side semantics.
46. **Lamar Jackson's 2024 scramble yards vs designed-run yards.** The `qb_scramble` flag; scrambles count as rushes.
47. **Completion % against Cover 3 in 2022.** Participation is loaded for 2024–2025 only. It should say not available, not return 0%.
48. **Pressure rate and avg time to throw for a QB, 2024.** Participation join (`was_pressure`, `time_to_throw`); plays with no participation row.
49. **Mahomes-to-Kelce TD passes in 2024.** Passer and receiver ids on one Play; two-entity match.
50. **Players with a rushing TD in 3 straight games, 2024.** Ordering by week, bye weeks, sequence logic (from the NL search plan).
