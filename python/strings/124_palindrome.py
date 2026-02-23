# [124] 회문 검사 (Palindrome Check)
# 레벨: 3 | 앞에서 읽으나 뒤에서 읽으나 같은 문자열인지 확인합니다

# 방법 1: 슬라이싱
def is_palindrome(s):
    s = s.lower().replace(" ", "")
    return s == s[::-1]

# 방법 2: 투 포인터
def is_palindrome_pointer(s):
    s = s.lower().replace(" ", "")
    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    return True

# 방법 3: 재귀
def is_palindrome_recursive(s):
    s = s.lower().replace(" ", "")
    if len(s) <= 1:
        return True
    if s[0] != s[-1]:
        return False
    return is_palindrome_recursive(s[1:-1])

# 테스트
print("=== 회문 검사 ===")
words = ["level", "racecar", "hello", "madam", "Was It A Car Or A Cat I Saw"]
for word in words:
    result = is_palindrome(word)
    mark = "O" if result else "X"
    print(f"  [{mark}] '{word}'")

# 숫자 회문
def is_numeric_palindrome(n):
    s = str(abs(n))
    return s == s[::-1]

print("\n=== 숫자 회문 ===")
numbers = [121, 12321, 123, -121, 1001]
for n in numbers:
    result = is_numeric_palindrome(n)
    mark = "O" if result else "X"
    print(f"  [{mark}] {n}")

# 가장 긴 회문 부분 문자열
def longest_palindrome(s):
    if len(s) < 2:
        return s

    best = ""

    def expand(left, right):
        nonlocal best
        while left >= 0 and right < len(s) and s[left] == s[right]:
            if right - left + 1 > len(best):
                best = s[left:right + 1]
            left -= 1
            right += 1

    for i in range(len(s)):
        expand(i, i)      # 홀수 길이
        expand(i, i + 1)  # 짝수 길이

    return best

print("\n=== 가장 긴 회문 부분 문자열 ===")
texts = ["babad", "cbbd", "racecarxyz", "aabaa"]
for text in texts:
    result = longest_palindrome(text)
    print(f"  '{text}' → '{result}' (길이: {len(result)})")

# 회문 만들기 (최소 문자 추가)
def min_chars_to_palindrome(s):
    added = 0
    temp = s
    while temp != temp[::-1]:
        temp = temp[:-1]
        added += 1
    return added

print("\n=== 회문 만들기 (최소 추가 문자 수) ===")
tests = ["abc", "aab", "race", "abcd"]
for t in tests:
    count = min_chars_to_palindrome(t)
    print(f"  '{t}' → 뒤에 {count}글자 추가 필요")

# 한글 회문
print("\n=== 한글 회문 ===")
kr_words = ["기러기", "토마토", "스위스", "인도인", "파이썬"]
for word in kr_words:
    result = is_palindrome(word)
    mark = "O" if result else "X"
    print(f"  [{mark}] '{word}'")
