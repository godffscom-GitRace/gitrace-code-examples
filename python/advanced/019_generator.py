# [19] 제네레이터 - Generator (yield)
# 레벨: 5 | 메모리 효율적인 반복자인 제네레이터를 학습합니다

# yield 키워드 - 값을 하나씩 반환
def count(n):
    i = 1
    while i <= n:
        yield i
        i += 1

print("count:")
for x in count(5):
    print(x, end=" ")
print()

gen = count(3)
print("\nnext:", next(gen))
print("next:", next(gen))

def fib(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

print("\nfib:")
for x in fib(5):
    print(x, end=" ")
