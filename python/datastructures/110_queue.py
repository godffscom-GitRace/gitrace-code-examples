# [110] 큐 (Queue) 구현
# 레벨: 3 | 큐 자료구조를 구현하고 활용법을 배웁니다

from collections import deque

# 리스트 기반 큐 구현
class Queue:
    def __init__(self):
        self._items = deque()

    def enqueue(self, item):
        self._items.append(item)

    def dequeue(self):
        if self.is_empty():
            raise IndexError("큐가 비어있습니다")
        return self._items.popleft()

    def front(self):
        if self.is_empty():
            raise IndexError("큐가 비어있습니다")
        return self._items[0]

    def is_empty(self):
        return len(self._items) == 0

    def size(self):
        return len(self._items)

    def __str__(self):
        return f"Queue({list(self._items)})"

# 기본 사용
q = Queue()
q.enqueue("첫 번째")
q.enqueue("두 번째")
q.enqueue("세 번째")
print(f"큐: {q}")
print(f"front: {q.front()}")      # 첫 번째
print(f"dequeue: {q.dequeue()}")   # 첫 번째 (선입선출)
print(f"크기: {q.size()}")         # 2

# collections.deque 직접 활용
print("\n=== deque 활용 ===")
dq = deque([1, 2, 3])
dq.append(4)        # 오른쪽 추가
dq.appendleft(0)    # 왼쪽 추가
print(f"deque: {list(dq)}")         # [0, 1, 2, 3, 4]
print(f"popleft: {dq.popleft()}")   # 0
print(f"pop: {dq.pop()}")           # 4

# 활용: 프린터 대기열 시뮬레이션
print("\n=== 프린터 대기열 ===")
printer = Queue()
jobs = ["문서A.pdf", "사진B.jpg", "보고서C.docx"]
for job in jobs:
    printer.enqueue(job)
    print(f"  추가: {job}")

print()
while not printer.is_empty():
    job = printer.dequeue()
    print(f"  인쇄중: {job}")
print("  모든 인쇄 완료!")

# 원형 큐 개념
# 고정 크기 배열에서 front/rear 포인터가 순환
# deque를 maxlen으로 제한하면 유사하게 동작
circular = deque(maxlen=3)
for i in range(5):
    circular.append(i)
    print(f"  추가 {i}: {list(circular)}")
