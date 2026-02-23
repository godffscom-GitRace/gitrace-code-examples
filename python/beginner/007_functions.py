# [7] 함수 정의와 호출 - Functions
# 레벨: 2 | 재사용 가능한 함수를 만드는 방법을 배웁니다

# def 키워드로 함수 정의
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        return "0으로 나눌 수 없습니다"
    return a / b

# 매개변수와 인자
print(add(10, 3))        # 13
print(subtract(10, 3))   # 7
print(multiply(10, 3))   # 30
print(divide(10, 3))     # 3.333...
print(divide(10, 0))     # 0으로 나눌 수 없습니다

# 기본값 매개변수
def greet(name, greeting="안녕하세요"):
    return f"{greeting}, {name}님!"

print(greet("철수"))              # 안녕하세요, 철수님!
print(greet("영희", "반갑습니다")) # 반갑습니다, 영희님!

# 여러 값 반환
def calc_stats(numbers):
    total = sum(numbers)
    avg = total / len(numbers)
    return total, avg

nums = [85, 92, 78, 95, 88]
total, avg = calc_stats(nums)
print(f"\n합계: {total}, 평균: {avg:.1f}")
