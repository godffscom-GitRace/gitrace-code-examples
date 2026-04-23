# [18] 데코레이터 패턴 - Decorator
# 레벨: 5 | Python의 강력한 기능인 데코레이터를 이해하고 구현합니다

import time

def log(func):
    def wrap(*args, **kwargs):
        print("start")
        result = func(*args, **kwargs)
        print("end")
        return result
    return wrap

@log
def hello(name):
    print(f"Hello, {name}")

hello("Tom")

def timer(func):
    def wrap(*args, **kwargs):
        t = time.time()
        result = func(*args, **kwargs)
        print("time:", round(time.time() - t, 4))
        return result
    return wrap

@timer
def work(n):
    return sum(range(n))

print("result:", work(10000))
