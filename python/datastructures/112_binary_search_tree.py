# [112] 이진 탐색 트리 - BST (Binary Search Tree)
# 레벨: 5 | 효율적인 검색을 위한 이진 탐색 트리를 구현합니다

class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None

    def insert(self, value):
        self.root = self._insert(self.root, value)

    def _insert(self, node, value):
        if node is None:
            return TreeNode(value)
        if value < node.value:
            node.left = self._insert(node.left, value)
        elif value > node.value:
            node.right = self._insert(node.right, value)
        return node

    def search(self, value):
        return self._search(self.root, value)

    def _search(self, node, value):
        if node is None:
            return False
        if value == node.value:
            return True
        elif value < node.value:
            return self._search(node.left, value)
        else:
            return self._search(node.right, value)

    # 중위 순회 (정렬된 순서)
    def inorder(self):
        result = []
        self._inorder(self.root, result)
        return result

    def _inorder(self, node, result):
        if node:
            self._inorder(node.left, result)
            result.append(node.value)
            self._inorder(node.right, result)

    # 최솟값 / 최댓값
    def find_min(self):
        node = self.root
        while node.left:
            node = node.left
        return node.value

    def find_max(self):
        node = self.root
        while node.right:
            node = node.right
        return node.value

# 사용
tree = BST()
for val in [50, 30, 70, 20, 40, 60, 80]:
    tree.insert(val)

print("=== 이진 탐색 트리 ===")
print(f"중위 순회: {tree.inorder()}")     # [20, 30, 40, 50, 60, 70, 80]
print(f"40 검색: {tree.search(40)}")       # True
print(f"55 검색: {tree.search(55)}")       # False
print(f"최솟값: {tree.find_min()}")        # 20
print(f"최댓값: {tree.find_max()}")        # 80

# 트리 시각화
def print_tree(node, level=0, prefix="Root: "):
    if node is not None:
        print(" " * (level * 4) + prefix + str(node.value))
        if node.left or node.right:
            if node.left:
                print_tree(node.left, level + 1, "L--- ")
            if node.right:
                print_tree(node.right, level + 1, "R--- ")

print("\n=== 트리 구조 ===")
print_tree(tree.root)

# 시간 복잡도: 평균 O(log n), 최악 O(n) - 편향 트리
