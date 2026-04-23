# [123] 아나그램 검사 (Anagram Check)
# 레벨: 3 | 두 문자열이 같은 문자로 구성되어 있는지 확인합니다

from collections import Counter


print("=== ANAGRAM CHECK ===")

def a_sort(a, b):
    return sorted(a.replace(" ", "").lower()) == sorted(b.replace(" ", "").lower())

def a_count(a, b):
    return Counter(a.replace(" ", "").lower()) == Counter(b.replace(" ", "").lower())

def a_dict(a, b):
    a = a.replace(" ", "").lower()
    b = b.replace(" ", "").lower()

    if len(a) != len(b):
        return False

    m = {}

    for c in a:
        m[c] = m.get(c, 0) + 1

    for c in b:
        m[c] = m.get(c, 0) - 1
        if m[c] < 0:
            return False

    return True


pairs = [
    ("listen", "silent"),
    ("hello", "world"),
    ("Dormitory", "Dirty Room"),
    ("python", "typhon"),
]

for a, b in pairs:
    print(a, b, a_count(a, b))


print("\n=== GROUP ANAGRAM ===")

words = ["eat", "tea", "tan", "ate", "nat", "bat", "tab"]

groups = {}

for w in words:
    key = "".join(sorted(w.lower()))
    groups.setdefault(key, []).append(w)

for g in groups.values():
    if len(g) > 1:
        print(g)


print("\n=== KOREAN ===")

kr = [
    ("가나다", "다나가"),
    ("파이썬", "썬파이"),
]

for a, b in kr:
    print(a, b, a_count(a, b))


print("\n=== SUBSTRING ANAGRAM ===")

text = "cbaebabacd"
pat = "abc"

pc = Counter(pat)
n = len(pat)

for i in range(len(text) - n + 1):
    sub = text[i:i+n]
    if Counter(sub) == pc:
        print(i, sub)
