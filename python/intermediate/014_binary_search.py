# [14] 이진 탐색 알고리즘 - Binary Search
# 레벨: 3 | 정렬된 배열에서 빠르게 값을 찾는 이진 탐색을 구현합니다

# 이진 탐색 구현
def binary_search(arr, target):
    left = 0
    right = len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        if arr[mid] == target:
            return mid        # 찾음! 인덱스 반환
        elif arr[mid] < target:
            left = mid + 1    # 오른쪽 절반 탐색
        else:
            right = mid - 1   # 왼쪽 절반 탐색

    return -1  # 못 찾음

# 테스트 (정렬된 배열이어야 함!)
numbers = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
print(f"배열: {numbers}")

target = 23
result = binary_search(numbers, target)
print(f"{target} → 인덱스 {result}")  # 인덱스 5

target = 50
result = binary_search(numbers, target)
print(f"{target} → {'없음' if result == -1 else f'인덱스 {result}'}")

# 탐색 과정 시각화
def binary_search_visual(arr, target):
    left, right = 0, len(arr) - 1
    step = 0

    while left <= right:
        mid = (left + right) // 2
        step += 1
        print(f"  Step {step}: left={left}, mid={mid}, right={right} → arr[{mid}]={arr[mid]}")

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

print(f"\n=== 38 탐색 과정 ===")
binary_search_visual(numbers, 38)

# 시간 복잡도: O(log n) - 매번 절반씩 줄어듦
# 10개 → 최대 4번, 1000개 → 최대 10번!
