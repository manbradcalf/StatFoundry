"""
Basic load test for StatFoundry API using Locust.

Usage:
    # Start the service first:
    uvicorn src.app:app --reload

    # Run Locust with web UI:
    locust -f locustfile.py --host=http://localhost:8000

    # Run headless (no UI):
    locust -f locustfile.py --host=http://localhost:8000 --headless -u 10 -r 2 -t 60s

Options:
    -u: Number of users to simulate
    -r: Spawn rate (users per second)
    -t: Test duration (e.g., 60s, 5m)
"""

from locust import HttpUser, task, between


class StatFoundryUser(HttpUser):
    """Simulates a typical user interacting with the StatFoundry API."""

    # Wait 1-3 seconds between tasks (simulates realistic user behavior)
    wait_time = between(1, 3)

    # Sample player GSIS IDs for testing (real NFL player IDs)
    SAMPLE_PLAYERS = [
        "00-0033873",  # Patrick Mahomes
        "00-0034857",  # Josh Allen
        "00-0036212",  # Lamar Jackson
        "00-0035228",  # Jalen Hurts
        "00-0037013",  # Justin Herbert
    ]

    def on_start(self):
        """Called when a simulated user starts."""
        self.player_index = 0

    def get_next_player(self) -> str:
        """Rotate through sample players to distribute load."""
        player = self.SAMPLE_PLAYERS[self.player_index % len(self.SAMPLE_PLAYERS)]
        self.player_index += 1
        return player

    @task(1)
    def healthcheck(self):
        """Test the health check endpoint."""
        self.client.get("/api/healthcheck")

    @task(3)
    def get_schema(self):
        """Fetch the database schema."""
        self.client.get("/api/schema")

    @task(5)
    def get_player(self):
        """Fetch player details by GSIS ID."""
        player_id = self.get_next_player()
        self.client.get(f"/api/player/{player_id}", name="/api/player/[gsis_id]")

    @task(5)
    def get_player_games(self):
        """Fetch all games for a player."""
        player_id = self.get_next_player()
        self.client.get(
            f"/api/player/{player_id}/games", name="/api/player/[gsis_id]/games"
        )

    @task(3)
    def get_player_seasons(self):
        """Fetch seasonal stats for a player."""
        player_id = self.get_next_player()
        self.client.get(
            f"/api/player/{player_id}/seasons", name="/api/player/[gsis_id]/seasons"
        )

    @task(2)
    def execute_simple_query(self):
        """Execute a simple Cypher query."""
        self.client.post(
            "/api/query",
            json={"cypher_query": "MATCH (p:Player) RETURN p.display_name LIMIT 10"},
        )

    @task(1)
    def execute_complex_query(self):
        """Execute a more complex Cypher query."""
        self.client.post(
            "/api/query",
            json={
                "cypher_query": """
                MATCH (p:Player)-[:HAD]->(pg:PlayerGame)-[:OF]->(g:Game)
                WHERE pg.passing_yards > 300
                RETURN p.display_name, pg.passing_yards, g.game_id
                LIMIT 20
                """
            },
        )


class HighLoadUser(HttpUser):
    """
    Aggressive user for stress testing - minimal wait time.
    Use sparingly to test system limits.
    """

    wait_time = between(0.1, 0.5)
    weight = 1  # Lower weight means fewer of these users

    @task
    def rapid_healthcheck(self):
        """Rapid-fire health checks."""
        self.client.get("/api/healthcheck")

    @task
    def rapid_schema(self):
        """Rapid-fire schema requests."""
        self.client.get("/api/schema")
