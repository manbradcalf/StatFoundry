#!/usr/bin/env python3
import csv
import os

input_file = '/Users/benmedcalf/code/statfoundry/csvs/nfldatapy/seasonaldata'
output_dir = '/Users/benmedcalf/code/statfoundry/csvs/nfldatapy/seasonaldata_by_year'

# Create output directory if it doesn't exist
os.makedirs(output_dir, exist_ok=True)

# Read the CSV and group by season
season_data = {}
header = None

with open(input_file, 'r', newline='', encoding='utf-8') as csvfile:
    reader = csv.reader(csvfile)
    header = next(reader)
    
    for row in reader:
        if len(row) > 1:
            season = row[1]  # season is the second column
            if season not in season_data:
                season_data[season] = []
            season_data[season].append(row)

# Write separate CSV files for each season
for season, rows in season_data.items():
    output_file = os.path.join(output_dir, f'seasonaldata_{season}.csv')
    with open(output_file, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(header)
        writer.writerows(rows)
    print(f'Created {output_file} with {len(rows)} rows')

print(f'Split complete. Created {len(season_data)} files in {output_dir}')