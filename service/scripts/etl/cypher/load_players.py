import sys
from src.neo4j_client import driver

create_constraint = """
CREATE CONSTRAINT gsis_id_Player_uniq IF NOT EXISTS
FOR (p:Player) REQUIRE (p.gsis_id) IS UNIQUE
"""

load_2025_rookies = """
// Load 2025 rookies from NFLVerse players CSV
LOAD CSV WITH HEADERS FROM
'https://github.com/nflverse/nflverse-data/releases/download/players/players.csv'
AS line

WITH line
WHERE toInteger(line.rookie_season) = 2025
  AND line.gsis_id IS NOT NULL
  AND line.gsis_id <> ''

// 1) MERGE on gsis_id (stable identifier)
MERGE (p:Player {gsis_id: line.gsis_id})

// 2) Build properties map with safe type conversions
WITH
  p,
  line,
  {
    // Core identity fields
    name: line.display_name,
    first_name: line.first_name,
    last_name: line.last_name,
    short_name: line.short_name,
    football_name: line.football_name,

    // Position info
    position: line.position,
    position_group: line.position_group,

    // Physical attributes
    height: toFloatOrNull(line.height),
    weight: toFloatOrNull(line.weight),

    // Visual/media
    headshot: line.headshot,

    // Birth/biographical
    birth_date:
      CASE
        WHEN line.birth_date IS NOT NULL AND line.birth_date <> ''
        THEN datetime(line.birth_date)
      END,

    // College info
    college_name: line.college_name,
    college_conference: line.college_conference,

    // Jersey/uniform
    jersey_number: toFloatOrNull(line.jersey_number),
    uniform_number: line.jersey_number,

    // External IDs
    esb_id: line.esb_id,
    smart_id: line.smart_id,
    nfl_id: toIntegerOrNull(line.nfl_id),
    pfr_id: line.pfr_id,
    pff_id: toIntegerOrNull(line.pff_id),
    otc_id: toIntegerOrNull(line.otc_id),
    espn_id: toIntegerOrNull(line.espn_id),
    gsis_it_id: toFloatOrNull(line.nfl_id),

    // Draft information
    entry_year: toFloatOrNull(line.draft_year),
    draftround: toFloatOrNull(line.draft_round),
    draft_number: toFloatOrNull(line.draft_pick),
    draft_club: line.draft_team,

    // Status fields
    status: line.status,
    status_short_description: line.ngs_status_short_description,
    status_description_abbr: line.ngs_status,
    years_of_experience: toIntegerOrNull(line.years_of_experience),

    // Team info
    team_abbr: line.latest_team,
    current_team_id: toIntegerOrNull(line.latest_team),

    // Season info
    rookie_year: toFloatOrNull(line.rookie_season)
  } AS raw

// 3) Clean nulls and empty strings, then set properties
WITH p, apoc.map.clean(raw, [null, ''], [true]) AS cleaned
SET p += cleaned

RETURN p
"""

try:
    # First, create the constraint
    constraint_result = driver.execute_query(create_constraint)
    print("Constraint creation completed")

    # Then, load the 2025 rookies
    result = driver.execute_query(load_2025_rookies)
    print(f"Successfully loaded players: {len(result.records)} records processed")
    print(result)
except Exception as e:
    print(f"ERROR: Failed to load players: {e}")
    sys.exit(1)
