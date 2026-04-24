# [13] 버블 정렬 알고리즘 - Bubble Sort
# 레벨: 3 | 가장 기본적인 정렬 알고리즘인 버블 정렬을 직접 구현합니다

# Bubble Sort (Beginner Version)

def bubble_sort(arr):
    n = len(arr)

    for i in range(n):
        swapped = False

        for j in range(n - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True

        if not swapped:
            break

    return arr


print("Bubble Sort Game\n")

numbers = [5, 3, 8, 1, 2]

print("Before:", numbers)
bubble_sort(numbers)
print("After:", numbers)

print("\n Your turn!")
data = [int(x) for x in input("Enter numbers: ").split()]

print("Sorted:", bubble_sort(data))
