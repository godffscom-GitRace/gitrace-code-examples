# [127] 순열과 조합 (Permutations & Combinations)
# 레벨: 3 | 순서가 있는 순열과 순서가 없는 조합을 구현합니다

from itertools import permutations, combinations, product
import math

# === 순열 (Permutation) ===
# 직접 구현 - 재귀
def my_permutations(arr, r=None):
    if r is None:
        r = len(arr)
    if r == 0:
        return [[]]
    result = []
    for i, item in enumerate(arr):
        rest = arr[:i] + arr[i + 1:]
        for perm in my_permutations(rest, r - 1):
            result.append([item] + perm)
    return result

print("=== 순열 (nPr) ===")
items = ['A', 'B', 'C']
print(f"  {items}에서 2개 뽑기 (순서 O):")
perms = my_permutations(items, 2)
for p in perms:
    print(f"    {p}")
print(f"  총 {len(perms)}가지 (3P2 = {math.perm(3, 2)})")

# itertools 활용
print(f"\n  itertools: {list(permutations('ABC', 2))}")

# === 조합 (Combination) ===
# 직접 구현 - 재귀
def my_combinations(arr, r):
    if r == 0:
        return [[]]
    if len(arr) < r:
        return []
    result = []
    # 첫 원소를 포함하는 경우 + 포함하지 않는 경우
    first = arr[0]
    rest = arr[1:]
    # 포함하는 경우: 나머지에서 r-1개 선택
    for combo in my_combinations(rest, r - 1):
        result.append([first] + combo)
    # 포함하지 않는 경우: 나머지에서 r개 선택
    result.extend(my_combinations(rest, r))
    return result

print("\n=== 조합 (nCr) ===")
items = ['A', 'B', 'C', 'D']
print(f"  {items}에서 2개 뽑기 (순서 X):")
combos = my_combinations(items, 2)
for c in combos:
    print(f"    {c}")
print(f"  총 {len(combos)}가지 (4C2 = {math.comb(4, 2)})")

# itertools 활용
print(f"\n  itertools: {list(combinations('ABCD', 2))}")

# 공식
print("\n=== 공식 계산 ===")
n, r = 5, 3
p = math.perm(n, r)
c = math.comb(n, r)
print(f"  {n}P{r} = {n}! / ({n}-{r})! = {p}")
print(f"  {n}C{r} = {n}! / ({r}! × ({n}-{r})!) = {c}")

# 중복 순열
print("\n=== 중복 순열 ===")
items = [1, 2, 3]
print(f"  {items}에서 2개 (중복 허용):")
for p in product(items, repeat=2):
    print(f"    {list(p)}", end="")
print(f"\n  총 {len(list(product(items, repeat=2)))}가지 ({len(items)}^2)")

# 활용: 로또 번호
print("\n=== 활용: 로또 경우의 수 ===")
lotto = math.comb(45, 6)
print(f"  45개에서 6개 선택: {lotto:,}가지")
print(f"  확률: 1/{lotto:,} ({1/lotto:.10f})")

# 활용: 비밀번호 경우의 수
print("\n=== 활용: 비밀번호 경우의 수 ===")
digits = 10   # 0-9
length = 4
cases = digits ** length
print(f"  숫자 {digits}개, {length}자리: {cases:,}가지")

chars = 62    # a-z(26) + A-Z(26) + 0-9(10)
length = 8
cases = chars ** length
print(f"  영숫자 {chars}개, {length}자리: {cases:,}가지")

# 활용: 팀 구성
print("\n=== 활용: 팀 구성 ===")
students = 10
team_size = 3
teams = math.comb(students, team_size)
print(f"  {students}명에서 {team_size}명 팀: {teams}가지")
