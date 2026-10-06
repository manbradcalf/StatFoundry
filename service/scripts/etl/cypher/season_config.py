from datetime import date

FIRST_SEASON = 2000


def current_season(today: date | None = None) -> int:
    """NFL season year. A new season starts in September, so Jan-Aug belong to the prior year."""
    today = today or date.today()
    return today.year if today.month >= 9 else today.year - 1


CURRENT_SEASON = current_season()

# Seasons to load (nflverse has data back to 1999, but team stats format varies)
SEASONS = list(range(FIRST_SEASON, CURRENT_SEASON + 1))
