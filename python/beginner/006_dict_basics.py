# [6] 딕셔너리 기초 - Dictionary Basics
# 레벨: 2 | 키-값 쌍으로 데이터를 저장하는 딕셔너리를 학습합니다

# 딕셔너리 생성 {key: value}
scores = {
    "김철수": 85,
    "이영희": 92,
    "박민수": 78
}

# 키로 값 접근하기
print(scores["김철수"])         # 85
print(scores.get("정다은", 0)) # 0 (없으면 기본값)

# 딕셔너리 수정과 삭제
scores["정다은"] = 95          # 추가
scores["김철수"] = 90          # 수정
del scores["박민수"]           # 삭제

# keys(), values(), items()
print(f"학생들: {list(scores.keys())}")
print(f"점수들: {list(scores.values())}")

print("\n=== 성적표 ===")
for name, score in scores.items():
    grade = "A" if score >= 90 else "B" if score >= 80 else "C"
    print(f"{name}: {score}점 ({grade})")

# 평균 계산
avg = sum(scores.values()) / len(scores)
print(f"\n평균 점수: {avg:.1f}점")
