# [101] 선택 정렬 - Selection Sort
# 레벨: 3 | 매 단계마다 최솟값을 선택해 정렬하는 선택 정렬을 구현합니다

def select_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        m = i
        for j in range(i + 1, n):
            if arr[j] < arr[m]:
                m = j
        arr[i], arr[m] = arr[m], arr[i]
        print("step", i + 1, ":", arr)
    return arr

nums = [5, 3, 4, 1]

print("before:", nums)
select_sort(nums)
print("after:", nums)
