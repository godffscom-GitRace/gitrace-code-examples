# [129] CSV 처리 (CSV Processing)
# 레벨: 3 | CSV 파일을 읽고, 쓰고, 분석하는 방법입니다

import csv
import os
from io import StringIO

# === CSV 파일 쓰기 ===
print("=== CSV 파일 쓰기 ===")

filepath = "temp_students.csv"
headers = ["이름", "국어", "영어", "수학"]
students = [
    ["홍길동", 85, 90, 78],
    ["김영희", 92, 88, 95],
    ["이철수", 76, 82, 88],
    ["박지민", 95, 91, 87],
    ["정수연", 88, 79, 93],
]

with open(filepath, "w", newline="", encoding="utf-8-sig") as f:
    writer = csv.writer(f)
    writer.writerow(headers)
    writer.writerows(students)
print(f"  {filepath} 저장 완료 ({len(students)}명)")

# === CSV 파일 읽기 ===
print("\n=== CSV 파일 읽기 (리스트) ===")
with open(filepath, "r", encoding="utf-8-sig") as f:
    reader = csv.reader(f)
    header = next(reader)  # 헤더 건너뛰기
    print(f"  헤더: {header}")
    for row in reader:
        name = row[0]
        scores = list(map(int, row[1:]))
        avg = sum(scores) / len(scores)
        print(f"  {name}: {scores} → 평균 {avg:.1f}")

# === DictReader / DictWriter ===
print("\n=== CSV DictReader ===")
with open(filepath, "r", encoding="utf-8-sig") as f:
    reader = csv.DictReader(f)
    for row in reader:
        name = row["이름"]
        total = int(row["국어"]) + int(row["영어"]) + int(row["수학"])
        print(f"  {name}: 총점 {total}")

print("\n=== CSV DictWriter ===")
filepath2 = "temp_products.csv"
products = [
    {"상품명": "노트북", "가격": 1500000, "재고": 10},
    {"상품명": "마우스", "가격": 35000, "재고": 50},
    {"상품명": "키보드", "가격": 89000, "재고": 30},
]

with open(filepath2, "w", newline="", encoding="utf-8-sig") as f:
    writer = csv.DictWriter(f, fieldnames=["상품명", "가격", "재고"])
    writer.writeheader()
    writer.writerows(products)
print(f"  {filepath2} 저장 완료")

# === CSV 데이터 분석 ===
print("\n=== CSV 데이터 분석 ===")
with open(filepath, "r", encoding="utf-8-sig") as f:
    reader = csv.DictReader(f)
    data = list(reader)

# 과목별 평균
subjects = ["국어", "영어", "수학"]
for subj in subjects:
    scores = [int(row[subj]) for row in data]
    avg = sum(scores) / len(scores)
    top = max(scores)
    low = min(scores)
    print(f"  {subj}: 평균 {avg:.1f}, 최고 {top}, 최저 {low}")

# 수석
print("\n  성적 순위:")
ranked = sorted(data, key=lambda r: sum(int(r[s]) for s in subjects), reverse=True)
for i, row in enumerate(ranked, 1):
    total = sum(int(row[s]) for s in subjects)
    print(f"    {i}등: {row['이름']} (총점 {total})")

# === StringIO로 메모리에서 CSV 처리 ===
print("\n=== 메모리 CSV (StringIO) ===")
csv_text = """이름,점수
Alice,95
Bob,87
Charlie,92"""

reader = csv.DictReader(StringIO(csv_text))
for row in reader:
    print(f"  {row['이름']}: {row['점수']}점")

# 임시 파일 정리
os.remove(filepath)
os.remove(filepath2)
print("\n  임시 파일 정리 완료")
