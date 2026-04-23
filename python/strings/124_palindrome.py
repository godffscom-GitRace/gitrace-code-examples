# [124] 회문 검사 (Palindrome Check)
# 레벨: 3 | 앞에서 읽으나 뒤에서 읽으나 같은 문자열인지 확인합니다

# 방법 1: 슬라이싱
def is_palindrome(s):
    s = s.lower().replace(" ", "")
    return s == s[::-1]


def is_palindrome_two_pointer(s):
    s = s.lower().replace(" ", "")
    l, r = 0, len(s) - 1

    while l < r:
        if s[l] != s[r]:
            return False
        l += 1
        r -= 1

    return True


def is_palindrome_recursive(s):
    s = s.lower().replace(" ", "")

    if len(s) <= 1:
        return True
    if s[0] != s[-1]:
        return False

    return is_palindrome_recursive(s[1:-1])


print("=== PALINDROME CHECK ===")

words = ["level", "racecar", "hello", "madam", "rotor"]

for w in words:
    print(w, is_palindrome(w))


print("\n=== NUMBER PALINDROME ===")

def is_num_palindrome(n):
    s = str(abs(n))
    return s == s[::-1]

nums = [121, 123, 1221, -121, 1001]

for n in nums:
    print(n, is_num_palindrome(n))


print("\n=== LONGEST PALINDROME ===")

def longest(s):
    best = ""

    def expand(l, r):
        nonlocal best

        while l >= 0 and r < len(s) and s[l] == s[r]:
            if r - l + 1 > len(best):
                best = s[l:r+1]
            l -= 1
            r += 1

    for i in range(len(s)):
        expand(i, i)
        expand(i, i+1)

    return best


tests = ["babad", "cbbd", "racecarxyz", "aabaa"]

for t in tests:
    r = longest(t)
    print(t, r, len(r))


print("\n=== MIN ADD PALINDROME ===")

def min_add(s):
    add = 0

    while s != s[::-1]:
        s = s[:-1]
        add += 1

    return add


for t in ["abc", "aab", "race", "abcd"]:
    print(t, min_add(t))


print("\n=== RESULT ===")

kr = ["level", "madam", "python"]

for w in kr:
    print(w, is_palindrome(w))
