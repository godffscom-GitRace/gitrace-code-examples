# [105] 너비 우선 탐색 - BFS (Breadth-First Search)
# 레벨: 4 | 그래프를 레벨 단위로 탐색하는 BFS를 구현합니다

from collections import deque

# 그래프 표현 (인접 리스트)
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
}

# BFS 구현 - 큐(Queue) 활용
def bfs(graph, start):
    visited = set()
    queue = deque([start])
    visited.add(start)
    order = []

    while queue:
        node = queue.popleft()  # 큐에서 꺼냄
        order.append(node)

        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    return order

print("=== BFS 탐색 ===")
result = bfs(graph, 'A')
print(f"탐색 순서: {' → '.join(result)}")

# 레벨 단위 BFS
def bfs_levels(graph, start):
    visited = {start}
    queue = deque([start])
    level = 0

    while queue:
        size = len(queue)
        nodes = []
        for _ in range(size):
            node = queue.popleft()
            nodes.append(node)
            for neighbor in graph[node]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
        print(f"  레벨 {level}: {nodes}")
        level += 1

print("\n=== 레벨 단위 BFS ===")
bfs_levels(graph, 'A')

# 최단 경로 찾기
def bfs_shortest_path(graph, start, end):
    visited = {start}
    queue = deque([(start, [start])])

    while queue:
        node, path = queue.popleft()
        if node == end:
            return path
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, path + [neighbor]))

    return None

print(f"\nA → F 최단 경로: {' → '.join(bfs_shortest_path(graph, 'A', 'F'))}")
print(f"A → D 최단 경로: {' → '.join(bfs_shortest_path(graph, 'A', 'D'))}")
