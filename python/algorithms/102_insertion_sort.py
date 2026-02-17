# [102] 삽입 정렬 - Insertion Sort
# 레벨: 3 | 카드 정렬하듯이 하나씩 적절한 위치에 삽입하는 정렬을 구현합니다

def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]  # 삽입할 값
        j = i - 1
        # key보다 큰 값들을 오른쪽으로 이동
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key  # 적절한 위치에 삽입
    return arr

# 테스트
numbers = [12, 11, 13, 5, 6]
print(f"정렬 전: {numbers}")
insertion_sort(numbers)
print(f"정렬 후: {numbers}")

# 정렬 과정 시각화
def insertion_sort_visual(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
        print(f"  Step {i}: {arr} ('{key}'를 위치 {j+1}에 삽입)")
    return arr

print("\n=== 정렬 과정 ===")
data = [5, 3, 8, 1, 2]
print(f"시작: {data}")
insertion_sort_visual(data)

# 시간 복잡도: 최선 O(n) - 이미 정렬된 경우
#             최악 O(n²) - 역순인 경우
# 특징: 거의 정렬된 데이터에 매우 효율적
# 안정 정렬 (같은 값의 순서 유지)
