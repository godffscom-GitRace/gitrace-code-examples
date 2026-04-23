# [115] 그래프 표현 - 인접 행렬 / 인접 리스트
# 레벨: 4 | 그래프를 표현하는 두 가지 방법을 구현하고 비교합니다

# 1. 인접 리스트 (Adjacency List) - 딕셔너리 기반
class GraphList:
    def __init__(self):
        self.graph = {}

    def add_edge(self, u, v):
        if u not in self.graph:
            self.graph[u] = []
        if v not in self.graph:
            self.graph[v] = []

        self.graph[u].append(v)
        self.graph[v].append(u)

    def show(self):
        for node in self.graph:
            print(node, "->", self.graph[node])


class GraphMatrix:
    def __init__(self, nodes):
        self.nodes = nodes
        self.size = len(nodes)
        self.index = {v: i for i, v in enumerate(nodes)}
        self.matrix = [[0] * self.size for _ in range(self.size)]

    def add_edge(self, u, v):
        i = self.index[u]
        j = self.index[v]

        self.matrix[i][j] = 1
        self.matrix[j][i] = 1

    def show(self):
        print("   ", self.nodes)
        for i, row in enumerate(self.matrix):
            print(self.nodes[i], row)


print("🌐 Graph Game\n")

print("=== Adjacency List ===")
g1 = GraphList()
g1.add_edge("A", "B")
g1.add_edge("A", "C")
g1.add_edge("B", "D")
g1.show()

print("\n=== Adjacency Matrix ===")
g2 = GraphMatrix(["A", "B", "C", "D"])
g2.add_edge("A", "B")
g2.add_edge("A", "C")
g2.add_edge("B", "D")
g2.show()

print("\n🎯 Add your edge!")
u = input("From: ")
v = input("To: ")

g1.add_edge(u, v)
print("\nUpdated List:")
g1.show()
