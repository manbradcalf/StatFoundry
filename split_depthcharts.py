#!/usr/bin/env python3
import csv
import os

input_file = '/Users/benmedcalf/code/statfoundry/csvs/nfldatapy/depthcharts.csv'
output_dir = '/Users/benmedcalf/code/statfoundry/csvs/nfldatapy/depthcharts_by_year'

# Create output directory if it doesn't exist
os.makedirs(output_dir, exist_ok=True)

# Read the CSV and group by year
year_data = {}
header = None

with open(input_file, 'r', newline='', encoding='utf-8') as csvfile:
    reader = csv.reader(csvfile)
    header = next(reader)
    
    for row in reader:
        if len(row) > 0 and row[0].isdigit():
            year = row[0]
            if year not in year_data:
                year_data[year] = []
            year_data[year].append(row)

# Write separate CSV files for each year
for year, rows in year_data.items():
    output_file = os.path.join(output_dir, f'depthcharts_{year}.csv')
    with open(output_file, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(header)
        writer.writerows(rows)
    print(f'Created {output_file} with {len(rows)} rows')

print(f'Split complete. Created {len(year_data)} files in {output_dir}')