# [7] 함수 정의와 호출 - Functions
# 레벨: 2 | 재사용 가능한 함수를 만드는 방법을 배웁니다

# def 키워드로 함수 정의

def add(a, b):
    return a + b

def divide(a, b):
    if b == 0:
        return "cannot divide by 0"
    return a / b

print("add:", add(10, 3))
print("divide:", divide(10, 3))
print("divide:", divide(10, 0))

def greet(name, msg="Hello"):
    return f"{msg}, {name}!"

print(greet("Tom"))
print(greet("Jane", "Hi"))

def stats(nums):
    total = sum(nums)
    avg = total / len(nums)
    return total, round(avg, 1)

t, a = stats([80, 90, 100])
print("\nstats:", t, a)
