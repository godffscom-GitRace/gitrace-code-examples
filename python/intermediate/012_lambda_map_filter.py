# [12] 람다 함수와 map/filter
# 레벨: 3 | 간단한 함수를 한 줄로 작성하는 람다와 map/filter를 학습합니다

# lambda 익명 함수
square = lambda x: x ** 2
print(square(5))  # 25

add = lambda a, b: a + b
print(add(3, 7))  # 10

# map() - 모든 요소에 함수 적용
numbers = [1, 2, 3, 4, 5]

doubled = list(map(lambda x: x * 2, numbers))
print(doubled)  # [2, 4, 6, 8, 10]

# 문자열 변환에 활용
names = ["kim", "lee", "park"]
upper_names = list(map(lambda s: s.upper(), names))
print(upper_names)  # ['KIM', 'LEE', 'PARK']

# filter() - 조건에 맞는 요소만 선택
scores = [45, 88, 72, 95, 30, 67, 82]

passed = list(filter(lambda x: x >= 60, scores))
print(f"합격: {passed}")  # 합격: [88, 72, 95, 67, 82]

failed = list(filter(lambda x: x < 60, scores))
print(f"불합격: {failed}")  # 불합격: [45, 30]

# map + filter 조합
# 합격 점수만 골라서 10점 가산점 부여
bonus_scores = list(map(lambda x: x + 10, filter(lambda x: x >= 60, scores)))
print(f"가산점 적용: {bonus_scores}")

# sorted()와 lambda - 정렬 기준 지정
students = [("철수", 85), ("영희", 92), ("민수", 78)]
by_score = sorted(students, key=lambda s: s[1], reverse=True)
print(f"성적순: {by_score}")
