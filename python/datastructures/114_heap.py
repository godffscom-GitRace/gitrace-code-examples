# [114] 힙 (Heap) 구현
# 레벨: 5 | 우선순위가 있는 데이터를 다루는 힙 자료구조를 구현합니다

class MinHeap:
    def __init__(self):
        self.heap = []

    def insert(self, value):
        self.heap.append(value)
        self.heap.sort()  # simple way for beginners
        print(f"Add: {value}")

    def extract_min(self):
        if not self.heap:
            return None

        value = self.heap.pop(0)
        print(f"Remove: {value}")
        return value

    def peek(self):
        if not self.heap:
            return None
        return self.heap[0]


print("📊 Heap Game \n")

h = MinHeap()

h.insert(5)
h.insert(2)
h.insert(8)
h.insert(1)

print("\n Top:", h.peek())

h.extract_min()
h.extract_min()

print("\n Top after remove:", h.peek())

print("\n Priority Task")

h.insert(int(input("Enter number: ")))
print("Current top:", h.peek())
