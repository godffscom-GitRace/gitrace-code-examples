# [101] 선택 정렬 - Selection Sort
# 레벨: 3 | 매 단계마다 최솟값을 선택해 정렬하는 선택 정렬을 구현합니다

def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        # 최솟값의 인덱스 찾기
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        # 현재 위치와 최솟값 교환
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr

# 테스트
numbers = [64, 25, 12, 22, 11]
print(f"정렬 전: {numbers}")
selection_sort(numbers)
print(f"정렬 후: {numbers}")

# 정렬 과정 시각화
def selection_sort_visual(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
        print(f"  Step {i+1}: {arr} (위치 {i}에 {arr[i]} 배치)")
    return arr

print("\n=== 정렬 과정 ===")
data = [29, 10, 14, 37, 13]
print(f"시작: {data}")
selection_sort_visual(data)

# 시간 복잡도: O(n²) - 항상 동일
# 공간 복잡도: O(1) - 제자리 정렬
# 특징: 교환 횟수가 적음 (최대 n-1번)
