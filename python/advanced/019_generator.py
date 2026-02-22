# [19] 제네레이터 - Generator (yield)
# 레벨: 5 | 메모리 효율적인 반복자인 제네레이터를 학습합니다

# yield 키워드 - 값을 하나씩 반환
def count_up(start, end):
    current = start
    while current <= end:
        yield current
        current += 1

# 제네레이터 사용
print("=== 카운트 업 ===")
for num in count_up(1, 5):
    print(num, end=" ")  # 1 2 3 4 5
print()

# next() 함수로 하나씩 가져오기
gen = count_up(10, 13)
print(f"\nnext: {next(gen)}")  # 10
print(f"next: {next(gen)}")  # 11
print(f"next: {next(gen)}")  # 12

# 피보나치 제네레이터 - 무한 수열
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

print("\n=== 피보나치 (처음 10개) ===")
fib = fibonacci()
for _ in range(10):
    print(next(fib), end=" ")  # 0 1 1 2 3 5 8 13 21 34
print()

# 메모리 효율성 비교
# 리스트: 모든 값을 메모리에 저장
big_list = [x ** 2 for x in range(1000000)]

# 제네레이터: 값을 하나씩 생성 (메모리 절약!)
big_gen = (x ** 2 for x in range(1000000))

import sys
print(f"\n리스트 크기: {sys.getsizeof(big_list):,} bytes")
print(f"제네레이터 크기: {sys.getsizeof(big_gen):,} bytes")

# 제네레이터로 파일 줄 단위 처리 패턴
def read_lines(text):
    for line in text.split("\n"):
        if line.strip():
            yield line.strip()

data = "Hello\nWorld\n\nPython\nGenerator"
for line in read_lines(data):
    print(f"  → {line}")
