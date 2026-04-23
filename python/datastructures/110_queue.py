# [110] 큐 (Queue) 구현
# 레벨: 3 | 큐 자료구조를 구현하고 활용법을 배웁니다

from collections import deque

class Queue:
    def __init__(self):
        self.items = deque()

    def enqueue(self, value):
        self.items.append(value)
        print(f"Add: {value}")

    def dequeue(self):
        if not self.items:
            print("Queue is empty!")
            return None
        value = self.items.popleft()
        print(f"Remove: {value}")
        return value

    def front(self):
        if not self.items:
            return None
        return self.items[0]


print("🖨 Queue Game\n")

q = Queue()

q.enqueue("Job1")
q.enqueue("Job2")
q.enqueue("Job3")

print("\nNext:", q.front())

q.dequeue()
q.dequeue()

print("\nNext after remove:", q.front())

print("\n🎯 Your turn!")
q.enqueue(input("Enter a job: "))
print("Next now:", q.front())
