# [126] 최대공약수와 최소공배수 (GCD & LCM)
# 레벨: 3 | 유클리드 호제법으로 GCD/LCM을 구합니다

import math
from functools import reduce

# 방법 1: 유클리드 호제법 (반복)
def gcd_iterative(a, b):
    while b:
        a, b = b, a % b
    return a

# 방법 2: 유클리드 호제법 (재귀)
def gcd_recursive(a, b):
    if b == 0:
        return a
    return gcd_recursive(b, a % b)

# LCM 계산
def lcm(a, b):
    return abs(a * b) // gcd_iterative(a, b)

print("=== 최대공약수 (GCD) ===")
pairs = [(12, 8), (48, 18), (100, 75), (17, 13), (144, 60)]
for a, b in pairs:
    g = gcd_iterative(a, b)
    print(f"  GCD({a}, {b}) = {g}")

print("\n=== 최소공배수 (LCM) ===")
for a, b in pairs:
    l = lcm(a, b)
    print(f"  LCM({a}, {b}) = {l}")

# 유클리드 호제법 과정 시각화
def gcd_steps(a, b):
    print(f"  GCD({a}, {b}) 계산 과정:")
    while b:
        q = a // b
        r = a % b
        print(f"    {a} = {b} × {q} + {r}")
        a, b = b, r
    print(f"    → GCD = {a}")
    return a

print("\n=== 과정 시각화 ===")
gcd_steps(252, 105)

# math 모듈 활용
print("\n=== math.gcd 활용 ===")
print(f"  math.gcd(48, 18) = {math.gcd(48, 18)}")

# 여러 수의 GCD/LCM
def gcd_multiple(*args):
    return reduce(gcd_iterative, args)

def lcm_multiple(*args):
    return reduce(lcm, args)

print("\n=== 여러 수의 GCD/LCM ===")
nums = [12, 18, 24, 36]
print(f"  숫자: {nums}")
print(f"  GCD: {gcd_multiple(*nums)}")
print(f"  LCM: {lcm_multiple(*nums)}")

nums2 = [15, 25, 35]
print(f"  숫자: {nums2}")
print(f"  GCD: {gcd_multiple(*nums2)}")
print(f"  LCM: {lcm_multiple(*nums2)}")

# 활용: 분수 약분
def simplify_fraction(numer, denom):
    g = gcd_iterative(abs(numer), abs(denom))
    return numer // g, denom // g

print("\n=== 분수 약분 ===")
fractions = [(4, 8), (12, 18), (7, 21), (15, 4)]
for n, d in fractions:
    sn, sd = simplify_fraction(n, d)
    print(f"  {n}/{d} → {sn}/{sd}")

# 활용: 타일링 문제
def min_square_tiles(width, height):
    tile_size = gcd_iterative(width, height)
    count = (width // tile_size) * (height // tile_size)
    return tile_size, count

print("\n=== 타일링 문제 ===")
rooms = [(12, 8), (15, 10), (24, 18)]
for w, h in rooms:
    size, count = min_square_tiles(w, h)
    print(f"  {w}×{h} 방 → {size}×{size} 타일 {count}개 필요")
