# [3] 조건문 (if-elif-else) - Conditionals
# 레벨: 1 | 조건에 따라 다른 코드를 실행합니다

# 나이에 따른 입장료 계산
def calc_fee(age):
    if age < 8:
        return 0
    elif age < 14:
        return 3000
    elif age < 19:
        return 5000
    elif age >= 65:
        return 0
    else:
        return 10000

print(calc_fee(5))
print(calc_fee(15))
print(calc_fee(30))

age = 15
has_id = True

if age >= 14 and has_id:
    print("OK")

if age < 8 or age >= 65:
    print("FREE")

for a in [5, 12, 16]:
    print(a, calc_fee(a))
