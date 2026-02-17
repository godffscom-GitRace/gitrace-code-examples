# [5] 리스트 기초 - List Basics
# 레벨: 2 | Python의 가장 많이 쓰는 자료구조인 리스트를 배웁니다

# 리스트 생성과 인덱싱
students = ["김철수", "이영희", "박민수", "정다은"]
print(students[0])    # 김철수 (첫 번째)
print(students[-1])   # 정다은 (마지막)

# append(), remove(), pop()
students.append("최지훈")       # 끝에 추가
print(students)

students.remove("박민수")       # 값으로 삭제
print(students)

last = students.pop()           # 마지막 꺼내기
print(f"제거된 학생: {last}")

# 슬라이싱 [start:end]
numbers = [10, 20, 30, 40, 50]
print(numbers[1:4])    # [20, 30, 40]
print(numbers[:3])     # [10, 20, 30]
print(numbers[2:])     # [30, 40, 50]

# len() 함수
print(f"학생 수: {len(students)}명")

# 리스트 순회
print("\n=== 학생 명단 ===")
for i, name in enumerate(students, 1):
    print(f"{i}. {name}")
