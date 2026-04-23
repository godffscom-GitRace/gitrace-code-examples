# [112] 이진 탐색 트리 - BST (Binary Search Tree)
# 레벨: 5 | 효율적인 검색을 위한 이진 탐색 트리를 구현합니다

class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


class BST:
    def __init__(self):
        self.root = None

    def insert(self, value):
        if not self.root:
            self.root = Node(value)
            return

        current = self.root
        while True:
            if value < current.value:
                if not current.left:
                    current.left = Node(value)
                    return
                current = current.left
            else:
                if not current.right:
                    current.right = Node(value)
                    return
                current = current.right

    def search(self, value):
        current = self.root

        while current:
            if value == current.value:
                return True
            elif value < current.value:
                current = current.left
            else:
                current = current.right

        return False


print("🌳 BST Game\n")

tree = BST()

for v in [5, 3, 7, 2, 4]:
    tree.insert(v)

print("Search 4:", tree.search(4))
print("Search 6:", tree.search(6))

print("\n🎯 Your turn!")
num = int(input("Enter number: "))
print("Found:", tree.search(num))
