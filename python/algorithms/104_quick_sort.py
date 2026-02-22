# [104] 퀵 정렬 - Quick Sort
# 레벨: 4 | 피벗을 기준으로 분할 정복하는 퀵 정렬을 마스터합니다

def quick_sort(arr):
    if len(arr) <= 1:
        return arr

    pivot = arr[len(arr) // 2]  # 피벗 선택 (중간값)
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]

    return quick_sort(left) + middle + quick_sort(right)

# 테스트
numbers = [3, 6, 8, 10, 1, 2, 1]
print(f"정렬 전: {numbers}")
print(f"정렬 후: {quick_sort(numbers)}")

# 제자리(in-place) 퀵 정렬
def quick_sort_inplace(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    if low < high:
        pi = partition(arr, low, high)
        quick_sort_inplace(arr, low, pi - 1)
        quick_sort_inplace(arr, pi + 1, high)

def partition(arr, low, high):
    pivot = arr[high]  # 마지막 요소를 피벗으로
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

data = [10, 7, 8, 9, 1, 5]
print(f"\n제자리 정렬 전: {data}")
quick_sort_inplace(data)
print(f"제자리 정렬 후: {data}")

# 과정 시각화
def quick_sort_visual(arr, depth=0):
    indent = "  " * depth
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    print(f"{indent}피벗={pivot}: {left} < [{pivot}] < {right}")
    return quick_sort_visual(left, depth+1) + middle + quick_sort_visual(right, depth+1)

print("\n=== 과정 ===")
quick_sort_visual([5, 3, 8, 1, 9, 2])

# 평균: O(n log n), 최악: O(n²) - 이미 정렬된 경우
