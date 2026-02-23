# [114] 힙 (Heap) 구현
# 레벨: 5 | 우선순위가 있는 데이터를 다루는 힙 자료구조를 구현합니다

import heapq

# 최소 힙 직접 구현
class MinHeap:
    def __init__(self):
        self.heap = []

    def insert(self, value):
        self.heap.append(value)
        self._bubble_up(len(self.heap) - 1)

    def extract_min(self):
        if not self.heap:
            raise IndexError("힙이 비어있습니다")
        min_val = self.heap[0]
        last = self.heap.pop()
        if self.heap:
            self.heap[0] = last
            self._bubble_down(0)
        return min_val

    def _bubble_up(self, index):
        parent = (index - 1) // 2
        while index > 0 and self.heap[index] < self.heap[parent]:
            self.heap[index], self.heap[parent] = self.heap[parent], self.heap[index]
            index = parent
            parent = (index - 1) // 2

    def _bubble_down(self, index):
        size = len(self.heap)
        while True:
            smallest = index
            left = 2 * index + 1
            right = 2 * index + 2
            if left < size and self.heap[left] < self.heap[smallest]:
                smallest = left
            if right < size and self.heap[right] < self.heap[smallest]:
                smallest = right
            if smallest == index:
                break
            self.heap[index], self.heap[smallest] = self.heap[smallest], self.heap[index]
            index = smallest

    def peek(self):
        return self.heap[0] if self.heap else None

# 사용
h = MinHeap()
for val in [5, 3, 8, 1, 9, 2]:
    h.insert(val)

print("=== 최소 힙 ===")
print(f"힙 배열: {h.heap}")
print(f"최솟값: {h.peek()}")

print("\n추출 순서 (정렬!):")
while h.heap:
    print(f"  {h.extract_min()}", end="")
print()

# heapq 모듈 활용
print("\n=== heapq 모듈 ===")
nums = [5, 3, 8, 1, 9, 2]
heapq.heapify(nums)  # 리스트를 힙으로
print(f"heapify: {nums}")
print(f"최솟값: {heapq.heappop(nums)}")
heapq.heappush(nums, 0)
print(f"0 추가 후: {nums}")

# 우선순위 큐 활용 - 작업 스케줄링
print("\n=== 우선순위 큐 ===")
tasks = []
heapq.heappush(tasks, (3, "이메일 확인"))
heapq.heappush(tasks, (1, "서버 장애 복구"))
heapq.heappush(tasks, (2, "코드 리뷰"))
heapq.heappush(tasks, (1, "보안 패치"))

while tasks:
    priority, task = heapq.heappop(tasks)
    print(f"  [우선순위 {priority}] {task}")
