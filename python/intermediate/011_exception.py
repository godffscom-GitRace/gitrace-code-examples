# [11] 예외 처리 - try-except
# 레벨: 3 | 오류를 처리하는 방법을 배웁니다

# try-except 기본 구문
def safe_divide(a, b):
    try:
        result = a / b
        return result
    except ZeroDivisionError:
        return "0으로 나눌 수 없습니다"

print(safe_divide(10, 3))   # 3.333...
print(safe_divide(10, 0))   # 0으로 나눌 수 없습니다

# 특정 예외 처리
def safe_int(value):
    try:
        return int(value)
    except ValueError:
        return f"'{value}'는 숫자가 아닙니다"
    except TypeError:
        return "변환할 수 없는 타입입니다"

print(safe_int("42"))      # 42
print(safe_int("hello"))   # 'hello'는 숫자가 아닙니다
print(safe_int(None))      # 변환할 수 없는 타입입니다

# finally 블록 - 항상 실행
def read_number(text):
    try:
        num = int(text)
        print(f"변환 성공: {num}")
    except ValueError:
        print("변환 실패!")
    finally:
        print("작업 완료 (항상 실행)")

read_number("123")
read_number("abc")

# raise로 예외 발생
def check_age(age):
    if age < 0:
        raise ValueError("나이는 0 이상이어야 합니다")
    if age > 150:
        raise ValueError("나이가 너무 큽니다")
    return f"{age}살 확인 완료"

try:
    print(check_age(25))   # 25살 확인 완료
    print(check_age(-1))   # ValueError 발생!
except ValueError as e:
    print(f"오류: {e}")
