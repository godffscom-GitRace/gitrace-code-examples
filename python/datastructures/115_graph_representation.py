# [115] 그래프 표현 - 인접 행렬 / 인접 리스트
# 레벨: 4 | 그래프를 표현하는 두 가지 방법을 구현하고 비교합니다

# 1. 인접 리스트 (Adjacency List) - 딕셔너리 기반
class GraphList:
    def __init__(self, directed=False):
        self.graph = {}
        self.directed = directed

    def add_vertex(self, vertex):
        if vertex not in self.graph:
            self.graph[vertex] = []

    def add_edge(self, u, v, weight=1):
        self.add_vertex(u)
        self.add_vertex(v)
        self.graph[u].append((v, weight))
        if not self.directed:
            self.graph[v].append((u, weight))

    def display(self):
        for vertex in sorted(self.graph):
            neighbors = ", ".join(f"{v}({w})" for v, w in self.graph[vertex])
            print(f"  {vertex} → [{neighbors}]")

# 2. 인접 행렬 (Adjacency Matrix)
class GraphMatrix:
    def __init__(self, vertices):
        self.vertices = vertices
        self.v_map = {v: i for i, v in enumerate(vertices)}
        self.size = len(vertices)
        self.matrix = [[0] * self.size for _ in range(self.size)]

    def add_edge(self, u, v, weight=1):
        i, j = self.v_map[u], self.v_map[v]
        self.matrix[i][j] = weight
        self.matrix[j][i] = weight  # 무방향

    def display(self):
        print(f"    {'  '.join(self.vertices)}")
        for i, v in enumerate(self.vertices):
            row = "  ".join(str(x) for x in self.matrix[i])
            print(f"  {v} [{row}]")

# 무방향 그래프 (인접 리스트)
print("=== 인접 리스트 (무방향) ===")
g1 = GraphList()
g1.add_edge('A', 'B', 4)
g1.add_edge('A', 'C', 2)
g1.add_edge('B', 'D', 3)
g1.add_edge('C', 'D', 5)
g1.display()

# 같은 그래프 (인접 행렬)
print("\n=== 인접 행렬 (무방향) ===")
g2 = GraphMatrix(['A', 'B', 'C', 'D'])
g2.add_edge('A', 'B', 4)
g2.add_edge('A', 'C', 2)
g2.add_edge('B', 'D', 3)
g2.add_edge('C', 'D', 5)
g2.display()

# 방향 그래프
print("\n=== 인접 리스트 (방향) ===")
dg = GraphList(directed=True)
dg.add_edge('A', 'B')
dg.add_edge('B', 'C')
dg.add_edge('C', 'A')
dg.display()

# 비교
# 인접 리스트: 공간 O(V+E), 간선 확인 O(V), 희소 그래프에 유리
# 인접 행렬: 공간 O(V²), 간선 확인 O(1), 밀집 그래프에 유리
