# [20] 모듈과 패키지 - Modules & Packages
# 레벨: 4 | 코드를 모듈로 나누고 재사용하는 방법을 배웁니다

# import 문 - 모듈 전체 가져오기
import math
print("pi:", round(math.pi, 2))
print("sqrt:", math.sqrt(16))

from random import randint
print("\nrandom:", randint(1, 10))

from datetime import datetime as dt
print("time:", dt.now().strftime("%H:%M"))

def add(a, b):
    return a + b

if __name__ == "__main__":
    print("\nrun main")
    print("add:", add(3, 5))
