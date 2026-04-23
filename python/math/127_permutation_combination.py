# [127] 순열과 조합 (Permutations & Combinations)
# 레벨: 3 | 순서가 있는 순열과 순서가 없는 조합을 구현합니다

from itertools import permutations, combinations, product
import math

def my_permutations(arr, r):
    if r == 0:
        return [[]]
    result = []
    for i in range(len(arr)):
        for p in my_permutations(arr[:i] + arr[i+1:], r-1):
            result.append([arr[i]] + p)
    return result

def my_combinations(arr, r):
    if r == 0:
        return [[]]
    if len(arr) < r:
        return []
    first = arr[0]
    rest = arr[1:]
    return [[first] + c for c in my_combinations(rest, r-1)] + my_combinations(rest, r)

print("=== PERMUTATION ===")
items = ["A", "B", "C"]
for p in my_permutations(items, 2):
    print(p)

print("\nitertools:", list(permutations(items, 2)))

print("\n=== COMBINATION ===")
items2 = ["A", "B", "C", "D"]
for c in my_combinations(items2, 2):
    print(c)

print("\nitertools:", list(combinations(items2, 2)))

print("\n=== FORMULA ===")
n, r = 5, 3
print("nPr =", math.perm(n, r))
print("nCr =", math.comb(n, r))

print("\n=== PRODUCT ===")
items3 = [1, 2, 3]
for p in product(items3, repeat=2):
    print(list(p))

print("\n=== CASES ===")
print("Lottery:", math.comb(45, 6))
print("Password:", 10**4)
print("AlphaNum:", 62**8)
