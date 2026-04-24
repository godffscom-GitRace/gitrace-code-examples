# [108] 동적 프로그래밍 - 피보나치 최적화
# 레벨: 4 | 동적 프로그래밍으로 피보나치를 O(n)에 해결합니다


def fib(n):
    if n <= 1:
        return n

    prev, curr = 0, 1

    for i in range(2, n + 1):
        prev, curr = curr, prev + curr

    return curr


print("Fibonacci Game\n")

for i in range(1, 8):
    print(f"F({i}) = {fib(i)}")

print("\n Challenge!")
num = int(input("Enter a number: "))
print(f"Result: F({num}) = {fib(num)}")
