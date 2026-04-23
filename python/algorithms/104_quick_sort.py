# [104] 퀵 정렬 - Quick Sort
# 레벨: 4 | 피벗을 기준으로 분할 정복하는 퀵 정렬을 마스터합니다

def quick_sort(arr):
    if len(arr) <= 1:
        return arr

    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    mid = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]

    print("pivot:", pivot, left, "|", right)

    return quick_sort(left) + mid + quick_sort(right)

nums = [4, 2, 5, 1]

print("before:", nums)
print("after:", quick_sort(nums))
