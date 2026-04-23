# [123] 아나그램 검사 (Anagram Check)
# 레벨: 3 | 두 문자열이 같은 문자로 구성되어 있는지 확인합니다

from collections import Counter


def is_anagram_sort(a, b):
    return sorted(a.replace(" ", "").lower()) == sorted(b.replace(" ", "").lower())


def is_anagram_counter(a, b):
    return Counter(a.replace(" ", "").lower()) == Counter(b.replace(" ", "").lower())


def is_anagram_dict(a, b):
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
    ("python", "typhon"),
    ("astronomer", "moon starer"),
]

print("=== ANAGRAM CHECK ===")

for a, b in pairs:
    print(a, b, is_anagram_counter(a, b))


print("\n=== GROUP ANAGRAM ===")

words = ["eat", "tea", "tan", "ate", "nat", "bat", "tab"]

groups = {}

for w in words:
    key = "".join(sorted(w.lower()))
    groups.setdefault(key, []).append(w)

for g in groups.values():
    if len(g) > 1:
        print(g)


print("\n=== SUBSTRING ANAGRAM ===")

text = "cbaebabacd"
pattern = "abc"

pc = Counter(pattern)
n = len(pattern)

for i in range(len(text) - n + 1):
    sub = text[i:i+n]
    if Counter(sub) == pc:
        print(i, sub)
