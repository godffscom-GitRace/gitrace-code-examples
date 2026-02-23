# [15] 재귀 함수 - 피보나치 수열
# 레벨: 4 | 함수가 자기 자신을 호출하는 재귀를 배웁니다

# 재귀 함수 기본 - 팩토리얼
def factorial(n):
    if n <= 1:       # 종료 조건 (base case)
        return 1
    return n * factorial(n - 1)  # 자기 자신 호출

print(f"5! = {factorial(5)}")  # 120

# 피보나치 수열 - 재귀 방식
# 0, 1, 1, 2, 3, 5, 8, 13, 21, ...
def fib_recursive(n):
    if n <= 0:
        return 0
    if n == 1:
        return 1
    return fib_recursive(n - 1) + fib_recursive(n - 2)

print("\n=== 재귀 방식 ===")
for i in range(10):
    print(f"F({i}) = {fib_recursive(i)}")

# 피보나치 - 반복문 방식 (더 효율적!)
def fib_loop(n):
    if n <= 0:
        return 0
    a, b = 0, 1
    for _ in range(n - 1):
        a, b = b, a + b
    return b

print("\n=== 반복문 방식 ===")
for i in range(10):
    print(f"F({i}) = {fib_loop(i)}")

# 메모이제이션 - 재귀 + 캐싱
cache = {}
def fib_memo(n):
    if n in cache:
        return cache[n]
    if n <= 1:
        return n
    cache[n] = fib_memo(n - 1) + fib_memo(n - 2)
    return cache[n]

print(f"\nF(30) = {fib_memo(30)}")  # 빠르게 계산!
