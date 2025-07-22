import pandas as pd
import sys

if len(sys.argv) != 6:
    print("Usage: python script.py <input_csv> <output_csv> <col1> <col2> <new_col>")
    sys.exit(1)

input_csv = sys.argv[1]
output_csv = sys.argv[2]
col1 = sys.argv[3]
col2 = sys.argv[4]
new_col = sys.argv[5]

# Read CSV in chunks if it's large
chunks = pd.read_csv(input_csv, chunksize=100_000)

# Process and write in chunks
with open(output_csv, "w", newline="", encoding="utf-8") as f_out:
    for i, chunk in enumerate(chunks):
        chunk[new_col] = chunk[col1].astype(str) + "_" + chunk[col2].astype(str)
        chunk.to_csv(f_out, index=False, header=(i == 0), mode="a")
