# [4] 반복문 (for, while) - Loops
# 레벨: 2 | for와 while 반복문을 사용해 반복 작업을 수행합니다

# for 반복문과 range() 함수
print("3 times table")

for i in range(1, 6):
    print(f"3 x {i} = {3*i}")

print("even:")
for i in range(2, 11, 2):
    print(i, end=" ")
print()

count = 3
while count > 0:
    print(count, end=" ")
    count -= 1
print("go")

for i in range(1, 8):
    if i == 5:
        break
    print(i, end=" ")
print()

total = 0
n = 1
while n <= 5:
    total += n
    n += 1

print("sum:", total)
