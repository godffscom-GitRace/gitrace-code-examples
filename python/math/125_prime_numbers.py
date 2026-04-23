# [125] 소수 판별과 에라토스테네스의 체 (Prime Numbers & Sieve)
# 레벨: 3 | 소수를 판별하고 효율적으로 찾는 알고리즘입니다

# Prime Number Algorithms

import math

print("🔢 Prime Game\n")

# 1. Fast prime check
def is_prime(n):
    if n < 2:
        return False

    if n % 2 == 0 and n != 2:
        return False

    i = 3
    while i * i <= n:
        if n % i == 0:
            return False
        i += 2

    return True


# 2. Sieve of Eratosthenes
def sieve(limit):
    primes = [True] * (limit + 1)
    primes[0] = primes[1] = False

    for i in range(2, int(math.sqrt(limit)) + 1):
        if primes[i]:
            for j in range(i * i, limit + 1, i):
                primes[j] = False

    return [i for i in range(limit + 1) if primes[i]]


# Test
nums = [2, 3, 4, 5, 10, 17, 25]

print("Prime Check:")
for n in nums:
    print(n, "->", is_prime(n))

print("\nPrimes under 30:")
print(sieve(30))

print("\n🎯 Your turn!")
n = int(input("Enter number: "))

print("Is prime?", is_prime(n))
