# [18] 데코레이터 패턴 - Decorator
# 레벨: 5 | Python의 강력한 기능인 데코레이터를 이해하고 구현합니다

import time

# 함수를 인자로 받는 함수
def my_decorator(func):
    def wrapper(*args, **kwargs):
        print(f"[{func.__name__}] 실행 전")
        result = func(*args, **kwargs)
        print(f"[{func.__name__}] 실행 후")
        return result
    return wrapper

# @decorator 문법
@my_decorator
def say_hello(name):
    print(f"안녕하세요, {name}님!")

say_hello("철수")

# 실행 시간 측정 데코레이터
def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"[{func.__name__}] 실행 시간: {end - start:.4f}초")
        return result
    return wrapper

@timer
def slow_sum(n):
    return sum(range(n))

print(f"결과: {slow_sum(1000000)}")

# 횟수 카운터 데코레이터 (클로저 활용)
def counter(func):
    count = 0
    def wrapper(*args, **kwargs):
        nonlocal count
        count += 1
        print(f"[{func.__name__}] {count}번째 호출")
        return func(*args, **kwargs)
    return wrapper

@counter
def greet(name):
    return f"Hello, {name}!"

print(greet("A"))
print(greet("B"))
print(greet("C"))
