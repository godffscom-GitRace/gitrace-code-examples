# [2] 변수와 자료형 - Variables & Types
# 레벨: 1 | Python 기본 자료형을 배웁니다

# 변수 선언과 할당
name = "김철수"
age = 25
height = 175.5
is_student = True

# type() 함수로 타입 확인
print(type(name))       # <class 'str'>
print(type(age))        # <class 'int'>
print(type(height))     # <class 'float'>
print(type(is_student)) # <class 'bool'>

# 형변환 (int, str, float)
score = "95"
score_int = int(score)      # 문자열 → 정수
print(score_int + 5)        # 100

pi = 3.14
pi_int = int(pi)            # 실수 → 정수 (소수점 버림)
print(pi_int)               # 3

age_str = str(age)           # 정수 → 문자열
print("나이: " + age_str)    # 나이: 25

print(f"{name}은 {age}살, 키 {height}cm, 학생: {is_student}")
