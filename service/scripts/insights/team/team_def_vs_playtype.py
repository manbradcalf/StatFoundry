import nfl_data_py as nfl


# coaches are generally more important here,
# find the DC history by appending DC data manually to PBP data
# this data is probably available already in nfl data py
def team_pass_def_against_routes(seasons, team):
    pbp = nfl.import_pbp_data(seasons)
    print(pbp.columns)
    stats = (
        pbp.query(f'play_type == "pass" and defteam == "{team}"')
        .groupby("route")["yards_gained"]
        .agg(
            plays="size",  # number of pass plays run with this route
            total_yards="sum",  # cumulative yards
            avg_yards="mean",  # average yards per play
        )
        .reset_index()
        .sort_values("avg_yards", ascending=False)  # or by any column you like
    )

    print(stats.head())
    return stats


def team_rush_def_against_gaps(seasons, team):
    pbp = nfl.import_pbp_data(seasons)
    print(pbp.columns)

    # keep only the rush plays where this team is on defense
    rushing_plays_def = pbp.query(f"play_type == 'run' and defteam == '{team}'").copy()

    print(rushing_plays_def.head())

    # combine run direction & gap → "left tackle", "middle guard", etc.
    rushing_plays_def["dir_gap"] = (
        rushing_plays_def["run_location"]
        .str.cat(rushing_plays_def["run_gap"], sep=" ")
        .str.strip()
    )

    print(f"dir_gap: {rushing_plays_def.dir_gap}")

    stats = (
        rushing_plays_def.groupby("dir_gap")["yards_gained"]
        .agg(
            plays="size",  # number of runs of this type
            total_yards="sum",  # cumulative yards allowed
            avg_yards="mean",  # average yards per play
        )
        .reset_index()
        .sort_values("avg_yards", ascending=False)
    )

    print(stats)
    return stats
