# [103] 병합 정렬 - Merge Sort
# 레벨: 4 | 배열을 반으로 나누고 병합하며 정렬하는 효율적인 알고리즘을 구현합니다

def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    return merge(left, right)

def merge(a, b):
    result = []
    i = j = 0

    while i < len(a) and j < len(b):
        if a[i] < b[j]:
            result.append(a[i]); i += 1
        else:
            result.append(b[j]); j += 1

    result += a[i:]
    result += b[j:]
    return result

nums = [4, 1, 3, 2]

print("before:", nums)
sorted_nums = merge_sort(nums)
print("after:", sorted_nums)
