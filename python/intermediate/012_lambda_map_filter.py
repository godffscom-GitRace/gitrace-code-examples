# [12] 람다 함수와 map/filter
# 레벨: 3 | 간단한 함수를 한 줄로 작성하는 람다와 map/filter를 학습합니다

# Lambda + Map + Filter Practice

print("⚡ Lambda Game\n")

# 1. Basic lambda
square = lambda x: x * x
print("Square:", square(5))

add = lambda a, b: a + b
print("Add:", add(3, 7))

# 2. map()
numbers = [1, 2, 3, 4, 5]

doubled = list(map(lambda x: x * 2, numbers))
print("Doubled:", doubled)

# 3. filter()
scores = [45, 88, 72, 95, 30]

passed = list(filter(lambda x: x >= 60, scores))
print("Passed:", passed)

# 4. sorted with lambda
students = [("A", 85), ("B", 92), ("C", 78)]

sorted_students = sorted(students, key=lambda s: s[1], reverse=True)
print("Sorted:", sorted_students)

print("\n🎯 Your turn!")
nums = [1, 2, 3, 4]
result = list(map(lambda x: x + 1, nums))
print("Result:", result)
