# [123] 아나그램 검사 (Anagram Check)
# 레벨: 3 | 두 문자열이 같은 문자로 구성되어 있는지 확인합니다

from collections import Counter

# 방법 1: 정렬 비교
def is_anagram_sort(s1, s2):
    s1 = s1.replace(" ", "").lower()
    s2 = s2.replace(" ", "").lower()
    return sorted(s1) == sorted(s2)

# 방법 2: Counter 활용
def is_anagram_counter(s1, s2):
    s1 = s1.replace(" ", "").lower()
    s2 = s2.replace(" ", "").lower()
    return Counter(s1) == Counter(s2)

# 방법 3: 딕셔너리 수동 카운트
def is_anagram_dict(s1, s2):
    s1 = s1.replace(" ", "").lower()
    s2 = s2.replace(" ", "").lower()
    if len(s1) != len(s2):
        return False
    counts = {}
    for ch in s1:
        counts[ch] = counts.get(ch, 0) + 1
    for ch in s2:
        counts[ch] = counts.get(ch, 0) - 1
        if counts[ch] < 0:
            return False
    return True

# 테스트
print("=== 아나그램 검사 ===")
pairs = [
    ("listen", "silent"),
    ("hello", "world"),
    ("Dormitory", "Dirty Room"),
    ("astronomer", "moon starer"),
    ("python", "typhon"),
]

for s1, s2 in pairs:
    result = is_anagram_sort(s1, s2)
    mark = "O" if result else "X"
    print(f"  [{mark}] '{s1}' <-> '{s2}'")

# 아나그램 그룹 찾기
def group_anagrams(words):
    groups = {}
    for word in words:
        key = "".join(sorted(word.lower()))
        if key not in groups:
            groups[key] = []
        groups[key].append(word)
    return [g for g in groups.values() if len(g) > 1]

print("\n=== 아나그램 그룹 ===")
words = ["eat", "tea", "tan", "ate", "nat", "bat", "tab", "eta"]
groups = group_anagrams(words)
for i, group in enumerate(groups, 1):
    print(f"  그룹 {i}: {group}")

# 한글 아나그램
print("\n=== 한글 아나그램 ===")
kr_pairs = [
    ("가나다", "다나가"),
    ("파이썬", "썬파이"),
    ("안녕", "녕안"),
]
for s1, s2 in kr_pairs:
    result = is_anagram_counter(s1, s2)
    mark = "O" if result else "X"
    print(f"  [{mark}] '{s1}' <-> '{s2}'")

# 부분 아나그램 (한 문자열이 다른 문자열에 아나그램으로 포함)
def find_anagram_substrings(text, pattern):
    results = []
    p_counter = Counter(pattern)
    window = len(pattern)
    for i in range(len(text) - window + 1):
        sub = text[i:i + window]
        if Counter(sub) == p_counter:
            results.append((i, sub))
    return results

print("\n=== 부분 아나그램 ===")
text = "cbaebabacd"
pattern = "abc"
found = find_anagram_substrings(text, pattern)
print(f"  텍스트: '{text}', 패턴: '{pattern}'")
for idx, sub in found:
    print(f"  인덱스 {idx}: '{sub}'")
