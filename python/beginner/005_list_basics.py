# [5] 리스트 기초 - List Basics
# 레벨: 2 | Python의 가장 많이 쓰는 자료구조인 리스트를 배웁니다

# 리스트 생성과 인덱싱
students = ["Tom", "Jane", "Mike"]

print("first:", students[0])
print("last:", students[-1])

students.append("Anna")
students.remove("Mike")

print("\ncurrent list:", students)

print("\nstudent count:", len(students))

print("\n=== students ===")
for i, name in enumerate(students, 1):
    print(f"{i}. {name}")
