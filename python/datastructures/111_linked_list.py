# [111] 연결 리스트 - Linked List
# 레벨: 4 | 노드를 연결한 연결 리스트를 직접 구현합니다

class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        current = self.head
        while current.next:
            current = current.next
        current.next = new_node

    def prepend(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node

    def delete(self, data):
        if not self.head:
            return
        if self.head.data == data:
            self.head = self.head.next
            return
        current = self.head
        while current.next:
            if current.next.data == data:
                current.next = current.next.next
                return
            current = current.next

    def search(self, data):
        current = self.head
        index = 0
        while current:
            if current.data == data:
                return index
            current = current.next
            index += 1
        return -1

    def length(self):
        count = 0
        current = self.head
        while current:
            count += 1
            current = current.next
        return count

    def __str__(self):
        nodes = []
        current = self.head
        while current:
            nodes.append(str(current.data))
            current = current.next
        return " → ".join(nodes) + " → None"

# 기본 사용
ll = LinkedList()
ll.append(10)
ll.append(20)
ll.append(30)
ll.prepend(5)
print(f"리스트: {ll}")       # 5 → 10 → 20 → 30 → None
print(f"길이: {ll.length()}")  # 4
print(f"20 위치: {ll.search(20)}")  # 2

ll.delete(20)
print(f"삭제 후: {ll}")      # 5 → 10 → 30 → None

# 뒤집기
def reverse_list(ll):
    prev = None
    current = ll.head
    while current:
        next_node = current.next
        current.next = prev
        prev = current
        current = next_node
    ll.head = prev

print("\n=== 뒤집기 ===")
ll2 = LinkedList()
for i in [1, 2, 3, 4, 5]:
    ll2.append(i)
print(f"원본: {ll2}")
reverse_list(ll2)
print(f"뒤집기: {ll2}")
