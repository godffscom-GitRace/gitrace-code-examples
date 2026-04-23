# [14] 이진 탐색 알고리즘 - Binary Search
# 레벨: 3 | 정렬된 배열에서 빠르게 값을 찾는 이진 탐색을 구현합니다

# Binary Search (Sorted Array Only)

def binary_search(arr, target):
    left = 0
    right = len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1


print("🔍 Binary Search Game\n")

numbers = [2, 5, 8, 12, 16, 23, 38]

print("Array:", numbers)

print("Find 23 ->", binary_search(numbers, 23))
print("Find 50 ->", binary_search(numbers, 50))

print("\n🎯 Your turn!")
target = int(input("Enter number: "))

result = binary_search(numbers, target)

print("Result:", "Found at index " + str(result) if result != -1 else "Not found")
