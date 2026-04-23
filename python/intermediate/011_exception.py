# [11] 예외 처리 - try-except
# 레벨: 3 | 오류를 처리하는 방법을 배웁니다

# try-except 기본 구문
def divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return "Cannot divide by zero"


def to_int(value):
    try:
        return int(value)
    except ValueError:
        return "Not a number"


print("🧮 Safe Calculator\n")

a = input("Enter A: ")
b = input("Enter B: ")

a = to_int(a)
b = to_int(b)

if isinstance(a, int) and isinstance(b, int):
    result = divide(a, b)
    print("Result:", result)
else:
    print("Invalid input!")

print("\n🎯 Test cases")

print(divide(10, 2))
print(divide(10, 0))

print(to_int("42"))
print(to_int("hello"))
