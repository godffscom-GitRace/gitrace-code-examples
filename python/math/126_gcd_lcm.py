# [126] 최대공약수와 최소공배수 (GCD & LCM)
# 레벨: 3 | 유클리드 호제법으로 GCD/LCM을 구합니다

import math

def gcd_iterative(a, b):
    while b:
        a, b = b, a % b
    return a

def gcd_recursive(a, b):
    if b == 0:
        return a
    return gcd_recursive(b, a % b)

def lcm(a, b):
    return abs(a * b) // gcd_iterative(a, b)

print("=== GCD ===")
pairs = [(12, 8), (48, 18), (100, 75)]
for a, b in pairs:
    print("GCD", a, b, "=", gcd_iterative(a, b))

print("\n=== LCM ===")
for a, b in pairs:
    print("LCM", a, b, "=", lcm(a, b))

def gcd_steps(a, b):
    print("Process", a, b)
    while b:
        print(a, "=", b, "*", a // b, "+", a % b)
        a, b = b, a % b
    print("Result =", a)
    return a

print("\n=== Steps ===")
gcd_steps(252, 105)

print("\n=== math.gcd ===")
print(math.gcd(48, 18))

def simplify_fraction(n, d):
    g = gcd_iterative(abs(n), abs(d))
    return n // g, d // g

print("\n=== Fraction ===")
fractions = [(4, 8), (12, 18), (15, 25)]
for n, d in fractions:
    print(n, "/", d, "->", simplify_fraction(n, d))
