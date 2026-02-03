"""
Migration script for issue #186: Fix Player/PlayerGame name property inconsistencies.

This script:
1. Renames Player.name → Player.display_name
2. Consolidates PlayerGame name properties to just player_name (sourced from Player.display_name)
3. Removes redundant name properties from PlayerGame nodes

Run this migration ONCE on existing data before using the updated ETL scripts.
"""

import sys
from src.neo4j_client import driver

# Step 1: Rename Player.name → Player.display_name
migrate_player_name = """
MATCH (p:Player) WHERE p.name IS NOT NULL AND p.display_name IS NULL
SET p.display_name = p.name
REMOVE p.name
RETURN count(p) as updated_players
"""

# Step 2: Consolidate PlayerGame names - source from Player.display_name
migrate_playergame_names = """
MATCH (p:Player)-[:HAD]->(pg:PlayerGame)
SET pg.player_name = coalesce(pg.player_name, pg.name, pg.player_display_name, pg.display_name, p.display_name)
REMOVE pg.name, pg.player_display_name, pg.display_name
RETURN count(pg) as updated_playergames
"""

# Step 3: Handle any orphaned PlayerGame nodes (no linked Player)
migrate_orphaned_playergames = """
MATCH (pg:PlayerGame) WHERE NOT ((:Player)-[:HAD]->(pg))
SET pg.player_name = coalesce(pg.player_name, pg.name, pg.player_display_name, pg.display_name)
REMOVE pg.name, pg.player_display_name, pg.display_name
RETURN count(pg) as orphaned_playergames
"""


def run_migration() -> None:
    try:
        print("Starting player name migration...")

        # Step 1
        result1 = driver.execute_query(migrate_player_name)
        count1 = result1.records[0]["updated_players"] if result1.records else 0
        print(f"Step 1: Migrated {count1} Player nodes (name → display_name)")

        # Step 2
        result2 = driver.execute_query(migrate_playergame_names)
        count2 = result2.records[0]["updated_playergames"] if result2.records else 0
        print(f"Step 2: Consolidated names for {count2} PlayerGame nodes")

        # Step 3
        result3 = driver.execute_query(migrate_orphaned_playergames)
        count3 = result3.records[0]["orphaned_playergames"] if result3.records else 0
        print(f"Step 3: Handled {count3} orphaned PlayerGame nodes")

        print("Migration completed successfully!")

    except Exception as e:
        print(f"ERROR: Migration failed: {e}")
        sys.exit(1)


if __name__ == "__main__":
    run_migration()
