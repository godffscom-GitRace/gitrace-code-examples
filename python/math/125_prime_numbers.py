# [125] 소수 판별과 에라토스테네스의 체 (Prime Numbers & Sieve)
# 레벨: 3 | 소수를 판별하고 효율적으로 찾는 알고리즘입니다

import math
import time

# 방법 1: 기본 소수 판별
def is_prime_basic(n):
    if n < 2:
        return False
    for i in range(2, n):
        if n % i == 0:
            return False
    return True

# 방법 2: 제곱근까지만 확인 (최적화)
def is_prime(n):
    if n < 2:
        return False
    if n < 4:
        return True
    if n % 2 == 0 or n % 3 == 0:
        return False
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    return True

print("=== 소수 판별 ===")
test_nums = [1, 2, 3, 7, 10, 17, 25, 97, 100]
for n in test_nums:
    result = is_prime(n)
    mark = "O" if result else "X"
    print(f"  [{mark}] {n}")

# 에라토스테네스의 체
def sieve_of_eratosthenes(limit):
    is_p = [True] * (limit + 1)
    is_p[0] = is_p[1] = False

    for i in range(2, int(math.sqrt(limit)) + 1):
        if is_p[i]:
            for j in range(i * i, limit + 1, i):
                is_p[j] = False

    return [i for i in range(limit + 1) if is_p[i]]

print("\n=== 에라토스테네스의 체 ===")
primes = sieve_of_eratosthenes(100)
print(f"  100 이하 소수 ({len(primes)}개):")
print(f"  {primes}")

# 시각화
print("\n  체 과정 시각화 (30 이하):")
limit = 30
grid = list(range(limit + 1))
grid[0] = grid[1] = 0
for i in range(2, int(math.sqrt(limit)) + 1):
    if grid[i] != 0:
        print(f"  {i}의 배수 제거: ", end="")
        removed = []
        for j in range(i * i, limit + 1, i):
            if grid[j] != 0:
                removed.append(j)
                grid[j] = 0
        print(removed)

# 성능 비교
print("\n=== 성능 비교 ===")

start = time.time()
count1 = sum(1 for i in range(2, 10001) if is_prime_basic(i))
t1 = time.time() - start

start = time.time()
count2 = sum(1 for i in range(2, 10001) if is_prime(i))
t2 = time.time() - start

start = time.time()
count3 = len(sieve_of_eratosthenes(10000))
t3 = time.time() - start

print(f"  기본 판별:     {count1}개, {t1:.4f}초")
print(f"  최적화 판별:   {count2}개, {t2:.4f}초")
print(f"  에라토스테네스: {count3}개, {t3:.4f}초")

# 소인수분해
def prime_factorize(n):
    factors = []
    d = 2
    while d * d <= n:
        while n % d == 0:
            factors.append(d)
            n //= d
        d += 1
    if n > 1:
        factors.append(n)
    return factors

print("\n=== 소인수분해 ===")
for n in [12, 60, 97, 360, 1024]:
    factors = prime_factorize(n)
    expr = " x ".join(map(str, factors))
    print(f"  {n} = {expr}")

# N번째 소수 찾기
def nth_prime(n):
    count = 0
    num = 1
    while count < n:
        num += 1
        if is_prime(num):
            count += 1
    return num

print("\n=== N번째 소수 ===")
for n in [1, 10, 50, 100]:
    print(f"  {n}번째 소수: {nth_prime(n)}")
