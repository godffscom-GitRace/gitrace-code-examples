# [6] 딕셔너리 기초 - Dictionary Basics
# 레벨: 2 | 키-값 쌍으로 데이터를 저장하는 딕셔너리를 학습합니다

# 딕셔너리 생성 {key: value}
scores = {
    "Tom": 85,
    "Jane": 92,
    "Mike": 78
}

print("Tom:", scores["Tom"])
print("NoName:", scores.get("NoName", 0))

scores["Anna"] = 95
scores["Tom"] = 90
del scores["Mike"]

print("\n=== report ===")
for name, score in scores.items():
    grade = "A" if score >= 90 else "B" if score >= 80 else "C"
    print(f"{name}: {score} ({grade})")

avg = sum(scores.values()) / len(scores)
print("\navg:", round(avg, 1))
