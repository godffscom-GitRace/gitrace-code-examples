# [102] 삽입 정렬 - Insertion Sort
# 레벨: 3 | 카드 정렬하듯이 하나씩 적절한 위치에 삽입하는 정렬을 구현합니다

def insert_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1

        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1

        arr[j + 1] = key
        print("step", i, ":", arr)

    return arr

nums = [4, 2, 3, 1]

print("before:", nums)
insert_sort(nums)
print("after:", nums)
