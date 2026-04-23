# [9] 리스트 컴프리헨션 - List Comprehension
# 레벨: 3 | Python의 강력한 기능인 리스트 컴프리헨션으로 간결한 코드를 작성합니다

# 기본 문법: [표현식 for 변수 in 반복가능]
print("⚡ List Comprehension Game\n")

# 1. Basic pattern
squares = [x * x for x in range(1, 6)]
print("Squares:", squares)

# 2. Condition filter
evens = [x for x in range(1, 11) if x % 2 == 0]
print("Evens:", evens)

# 3. If-else expression
labels = ["even" if x % 2 == 0 else "odd" for x in range(1, 6)]
print("Labels:", labels)

# 4. Nested loop
matrix = [[i * j for j in range(1, 4)] for i in range(1, 4)]
print("Matrix:", matrix)

print("\n🎯 Your turn!")
n = int(input("Enter number: "))
result = [x * x for x in range(1, n + 1)]
print("Result:", result)
