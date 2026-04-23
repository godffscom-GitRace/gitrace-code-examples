# [106] 깊이 우선 탐색 - DFS (Depth-First Search)
# 레벨: 4 | 그래프를 깊이 우선으로 탐색하는 DFS를 구현합니다

graph = {
    "A": ["B", "C"],
    "B": ["D"],
    "C": ["E"],
    "D": [],
    "E": []
}

def dfs(g, node, visited=None):
    if visited is None:
        visited = set()

    visited.add(node)
    print(node, end=" ")

    for n in g[node]:
        if n not in visited:
            dfs(g, n, visited)

print("dfs:")
dfs(graph, "A")
