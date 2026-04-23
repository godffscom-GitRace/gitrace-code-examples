# [105] 너비 우선 탐색 - BFS (Breadth-First Search)
# 레벨: 4 | 그래프를 레벨 단위로 탐색하는 BFS를 구현합니다

# BFS Practice

from collections import deque

graph = {
    "A": ["B", "C"],
    "B": ["D"],
    "C": ["E"],
    "D": [],
    "E": []
}

def bfs(g, start):
    visited = set([start])
    q = deque([start])
    order = []

    while q:
        node = q.popleft()
        order.append(node)

        for n in g[node]:
            if n not in visited:
                visited.add(n)
                q.append(n)

    return order

print("bfs:", " -> ".join(bfs(graph, "A")))
