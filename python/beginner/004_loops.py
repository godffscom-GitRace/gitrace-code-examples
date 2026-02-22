# [4] 반복문 (for, while) - Loops
# 레벨: 2 | for와 while 반복문을 사용해 반복 작업을 수행합니다

# for 반복문과 range() 함수
print("=== 구구단 3단 ===")
for i in range(1, 10):
    print(f"3 x {i} = {3 * i}")

# range(시작, 끝, 간격)
print("\n짝수 출력:")
for i in range(2, 11, 2):
    print(i, end=" ")  # 2 4 6 8 10
print()

# while 반복문
print("\n=== 카운트다운 ===")
count = 5
while count > 0:
    print(count, end=" ")
    count -= 1
print("발사!")

# break와 continue
print("\n=== break 예제 ===")
for i in range(1, 11):
    if i == 6:
        print("6에서 중단!")
        break
    print(i, end=" ")

print("\n\n=== continue 예제 ===")
for i in range(1, 11):
    if i % 3 == 0:
        continue  # 3의 배수 건너뛰기
    print(i, end=" ")
print()

# 숫자 합산 (while 활용)
total = 0
num = 1
while num <= 100:
    total += num
    num += 1
print(f"\n1부터 100까지 합: {total}")
