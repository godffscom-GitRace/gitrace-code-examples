# [108] 동적 프로그래밍 - 피보나치 최적화
# 레벨: 4 | 동적 프로그래밍으로 피보나치를 O(n)에 해결합니다

import time

# 1. 순수 재귀 - O(2^n) 매우 느림!
def fib_naive(n):
    if n <= 1:
        return n
    return fib_naive(n - 1) + fib_naive(n - 2)

# 2. 메모이제이션 (Top-Down) - O(n)
def fib_memo(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)
    return memo[n]

# 3. 타뷸레이션 (Bottom-Up) - O(n)
def fib_tab(n):
    if n <= 1:
        return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]

# 4. 공간 최적화 - O(n) 시간, O(1) 공간
def fib_optimized(n):
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

# 결과 비교
print("=== 피보나치 결과 비교 ===")
for i in [5, 10, 20, 30]:
    print(f"F({i}) = {fib_optimized(i)}")

# 성능 비교
print("\n=== 성능 비교 (n=30) ===")
n = 30

start = time.time()
fib_naive(n)
print(f"순수 재귀:    {time.time() - start:.4f}초")

start = time.time()
fib_memo(n, {})
print(f"메모이제이션: {time.time() - start:.6f}초")

start = time.time()
fib_tab(n)
print(f"타뷸레이션:   {time.time() - start:.6f}초")

start = time.time()
fib_optimized(n)
print(f"공간 최적화:  {time.time() - start:.6f}초")

# DP 핵심 개념
# 1. 겹치는 부분 문제 (Overlapping Subproblems)
# 2. 최적 부분 구조 (Optimal Substructure)
# 메모이제이션: 재귀 + 캐싱 (하향식)
# 타뷸레이션: 반복문 + 테이블 (상향식)
