# [15] 재귀 함수 - 피보나치 수열
# 레벨: 4 | 함수가 자기 자신을 호출하는 재귀를 배웁니다

# Recursion Practice (Fibonacci)

print("Recursion Game\n")

# 1. Factorial (basic recursion)
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print("5! =", factorial(5))

# 2. Fibonacci (recursion - slow but basic)
def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

print("\nFibonacci (recursive)")

for i in range(8):
    print(f"F({i}) =", fib(i))

# 3. Fibonacci (loop - fast)
def fib_loop(n):
    a, b = 0, 1

    for _ in range(n):
        a, b = b, a + b

    return a

print("\nFibonacci (loop)")

for i in range(8):
    print(f"F({i}) =", fib_loop(i))

# 4. Memoization (idea only)
cache = {}

def fib_memo(n):
    if n in cache:
        return cache[n]

    if n <= 1:
        return n

    cache[n] = fib_memo(n - 1) + fib_memo(n - 2)
    return cache[n]

print("\nF(10) memo:", fib_memo(10))

print("\n Try it!")
n = int(input("Enter n: "))
print("Result:", fib_loop(n))
