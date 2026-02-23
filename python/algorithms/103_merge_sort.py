# [103] 병합 정렬 - Merge Sort
# 레벨: 4 | 배열을 반으로 나누고 병합하며 정렬하는 효율적인 알고리즘을 구현합니다

def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    # 분할
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    # 병합
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result

# 테스트
numbers = [38, 27, 43, 3, 9, 82, 10]
print(f"정렬 전: {numbers}")
sorted_nums = merge_sort(numbers)
print(f"정렬 후: {sorted_nums}")

# 분할 과정 시각화
def merge_sort_visual(arr, depth=0):
    indent = "  " * depth
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    print(f"{indent}분할: {arr} → {arr[:mid]} | {arr[mid:]}")
    left = merge_sort_visual(arr[:mid], depth + 1)
    right = merge_sort_visual(arr[mid:], depth + 1)
    merged = merge(left, right)
    print(f"{indent}병합: {left} + {right} → {merged}")
    return merged

print("\n=== 분할 & 병합 과정 ===")
merge_sort_visual([5, 3, 8, 1])

# 시간 복잡도: O(n log n) - 항상 동일
# 공간 복잡도: O(n) - 추가 배열 필요
# 특징: 안정 정렬, 항상 일정한 성능
