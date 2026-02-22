# [9] 리스트 컴프리헨션 - List Comprehension
# 레벨: 3 | Python의 강력한 기능인 리스트 컴프리헨션으로 간결한 코드를 작성합니다

# 기본 문법: [표현식 for 변수 in 반복가능]
squares = [x ** 2 for x in range(1, 6)]
print(squares)  # [1, 4, 9, 16, 25]

# 조건부 리스트 컴프리헨션
evens = [x for x in range(1, 21) if x % 2 == 0]
print(evens)  # [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

# 조건 표현식 포함
labels = ["짝수" if x % 2 == 0 else "홀수" for x in range(1, 6)]
print(labels)  # ['홀수', '짝수', '홀수', '짝수', '홀수']

# 중첩 리스트 컴프리헨션
matrix = [[i * j for j in range(1, 4)] for i in range(1, 4)]
print(matrix)  # [[1, 2, 3], [2, 4, 6], [3, 6, 9]]

# map(), filter()와 비교
numbers = [1, 2, 3, 4, 5]

# map 방식
doubled_map = list(map(lambda x: x * 2, numbers))
# 컴프리헨션 방식 (더 간결!)
doubled_comp = [x * 2 for x in numbers]
print(doubled_comp)  # [2, 4, 6, 8, 10]

# filter 방식
big_filter = list(filter(lambda x: x > 3, numbers))
# 컴프리헨션 방식
big_comp = [x for x in numbers if x > 3]
print(big_comp)  # [4, 5]
