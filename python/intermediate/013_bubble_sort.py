# [13] 버블 정렬 알고리즘 - Bubble Sort
# 레벨: 3 | 가장 기본적인 정렬 알고리즘인 버블 정렬을 직접 구현합니다

# 버블 정렬 구현
def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                # 값 교환 (swap)
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        # 교환이 없으면 이미 정렬 완료
        if not swapped:
            break
    return arr

# 테스트
numbers = [64, 34, 25, 12, 22, 11, 90]
print(f"정렬 전: {numbers}")
bubble_sort(numbers)
print(f"정렬 후: {numbers}")

# 정렬 과정 시각화
def bubble_sort_visual(arr):
    n = len(arr)
    step = 0
    for i in range(n - 1):
        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                step += 1
                print(f"  Step {step}: {arr}")
    return arr

print("\n=== 정렬 과정 ===")
data = [5, 3, 8, 1, 2]
print(f"시작: {data}")
bubble_sort_visual(data)
print(f"완료: {data}")

# 시간 복잡도: O(n²) - 중첩 반복문 사용
# 최선: O(n) - 이미 정렬된 경우 (swapped 최적화)
# 공간 복잡도: O(1) - 제자리 정렬
