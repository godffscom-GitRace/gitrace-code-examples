# [3] 조건문 (if-elif-else) - Conditionals
# 레벨: 1 | 조건에 따라 다른 코드를 실행합니다

# 나이에 따른 입장료 계산
def calc_fee(age):
    if age < 8:
        return 0          # 무료
    elif age < 14:
        return 3000       # 어린이
    elif age < 19:
        return 5000       # 청소년
    elif age >= 65:
        return 0          # 경로 우대
    else:
        return 10000      # 성인

# 비교 연산자 (==, !=, >, <, >=, <=)
x = 10
print(x == 10)   # True
print(x != 5)    # True
print(x > 5)     # True

# 논리 연산자 (and, or, not)
age = 15
has_id = True

if age >= 14 and has_id:
    print("입장 가능합니다")

if age < 8 or age >= 65:
    print("무료 입장입니다")

if not has_id:
    print("신분증이 필요합니다")

# 들여쓰기 규칙 - Python은 들여쓰기로 블록을 구분
for a in [5, 12, 16, 30, 70]:
    fee = calc_fee(a)
    print(f"나이 {a}세 → 입장료: {fee}원")
