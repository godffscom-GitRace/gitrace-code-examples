# [20] 모듈과 패키지 - Modules & Packages
# 레벨: 4 | 코드를 모듈로 나누고 재사용하는 방법을 배웁니다

# import 문 - 모듈 전체 가져오기
import math
print(f"원주율: {math.pi}")
print(f"제곱근: {math.sqrt(16)}")

# from ... import ... - 특정 함수만 가져오기
from random import randint, choice
print(f"\n랜덤 숫자: {randint(1, 100)}")

fruits = ["사과", "바나나", "딸기", "포도"]
print(f"랜덤 선택: {choice(fruits)}")

# as - 별칭 사용
from datetime import datetime as dt
now = dt.now()
print(f"\n현재 시간: {now.strftime('%Y-%m-%d %H:%M')}")

# os 모듈 활용
import os
print(f"\n현재 디렉토리: {os.getcwd()}")
print(f"파일 목록: {os.listdir('.')[:5]}")

# __name__ == '__main__' 패턴
# 이 파일을 직접 실행할 때만 아래 코드 실행
# 다른 파일에서 import하면 실행되지 않음

def add(a, b):
    return a + b

def multiply(a, b):
    return a * b

if __name__ == "__main__":
    print("\n=== 직접 실행 중 ===")
    print(f"add(3, 5) = {add(3, 5)}")
    print(f"multiply(4, 6) = {multiply(4, 6)}")

    # 패키지 구조 예시
    # my_package/
    # ├── __init__.py    ← 패키지 초기화
    # ├── utils.py       ← 유틸리티 모듈
    # └── models.py      ← 모델 모듈
    #
    # 사용법:
    # from my_package.utils import helper_func
    # from my_package import models
