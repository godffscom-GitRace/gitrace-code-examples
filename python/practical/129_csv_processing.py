# [129] CSV 처리 (CSV Processing)
# 레벨: 3 | CSV 파일을 읽고, 쓰고, 분석하는 방법입니다

import csv
import os
from io import StringIO


print("=== CSV WRITE ===")

file1 = "students.csv"

header = ["name", "korean", "english", "math"]

students = [
    ["Kim", 90, 80, 70],
    ["Lee", 85, 88, 92],
    ["Park", 75, 95, 89],
]

with open(file1, "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(header)
    writer.writerows(students)

print(file1, "saved")


print("\n=== CSV READ ===")

with open(file1, "r", encoding="utf-8") as f:
    reader = csv.reader(f)
    next(reader)

    for row in reader:
        name = row[0]
        scores = list(map(int, row[1:]))
        avg = sum(scores) / len(scores)
        print(name, scores, avg)


print("\n=== DICT READER ===")

with open(file1, "r", encoding="utf-8") as f:
    reader = csv.DictReader(f)

    for row in reader:
        total = int(row["korean"]) + int(row["english"]) + int(row["math"])
        print(row["name"], total)


print("\n=== DICT WRITER ===")

file2 = "products.csv"

products = [
    {"name": "laptop", "price": 1000, "stock": 5},
    {"name": "mouse", "price": 50, "stock": 20},
]

with open(file2, "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["name", "price", "stock"])
    writer.writeheader()
    writer.writerows(products)

print(file2, "saved")


print("\n=== ANALYSIS ===")

with open(file1, "r", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    data = list(reader)

subjects = ["korean", "english", "math"]

for s in subjects:
    vals = [int(r[s]) for r in data]
    print(s, sum(vals) / len(vals), max(vals), min(vals))

rank = sorted(
    data,
    key=lambda r: sum(int(r[s]) for s in subjects),
    reverse=True
)

print("\nRANK")
for i, r in enumerate(rank, 1):
    total = sum(int(r[s]) for s in subjects)
    print(i, r["name"], total)


print("\n=== STRING IO ===")

text = """name,score
A,90
B,80
C,70"""

reader = csv.DictReader(StringIO(text))

for r in reader:
    print(r["name"], r["score"])


os.remove(file1)
os.remove(file2)
