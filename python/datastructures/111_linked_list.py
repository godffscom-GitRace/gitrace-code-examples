# [111] 연결 리스트 - Linked List
# 레벨: 4 | 노드를 연결한 연결 리스트를 직접 구현합니다

class Node:
    def __init__(self, value):
        self.value = value
        self.next = None


class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, value):
        new_node = Node(value)

        if not self.head:
            self.head = new_node
            return

        current = self.head
        while current.next:
            current = current.next

        current.next = new_node

    def show(self):
        current = self.head
        result = ""

        while current:
            result += str(current.value) + " -> "
            current = current.next

        return result + "None"


print("Linked List Game \n")

ll = LinkedList()

ll.append("A")
ll.append("B")
ll.append("C")

print("List:", ll.show())

print("\n Add your node!")
ll.append(input("Enter value: "))

print("Updated:", ll.show())
