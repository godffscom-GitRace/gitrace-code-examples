# [106] 깊이 우선 탐색 - DFS (Depth-First Search)
# 레벨: 4 | 그래프를 깊이 우선으로 탐색하는 DFS를 구현합니다

graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
}

# DFS - 재귀 방식
def dfs_recursive(graph, node, visited=None):
    if visited is None:
        visited = set()
    visited.add(node)
    print(node, end=" ")

    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs_recursive(graph, neighbor, visited)

print("=== DFS 재귀 ===")
dfs_recursive(graph, 'A')
print()

# DFS - 스택 방식
def dfs_stack(graph, start):
    visited = set()
    stack = [start]
    order = []

    while stack:
        node = stack.pop()  # 스택에서 꺼냄
        if node not in visited:
            visited.add(node)
            order.append(node)
            # 역순으로 넣어야 왼쪽부터 탐색
            for neighbor in reversed(graph[node]):
                if neighbor not in visited:
                    stack.append(neighbor)

    return order

print("=== DFS 스택 ===")
result = dfs_stack(graph, 'A')
print(f"탐색 순서: {' → '.join(result)}")

# 경로 탐색 - 모든 경로 찾기
def find_all_paths(graph, start, end, path=None):
    if path is None:
        path = []
    path = path + [start]

    if start == end:
        return [path]

    paths = []
    for neighbor in graph[start]:
        if neighbor not in path:  # 방문 체크
            new_paths = find_all_paths(graph, neighbor, end, path)
            paths.extend(new_paths)
    return paths

print("\n=== A → F 모든 경로 ===")
all_paths = find_all_paths(graph, 'A', 'F')
for p in all_paths:
    print(f"  {' → '.join(p)}")

# 연결 요소 찾기
def count_components(adj_list):
    visited = set()
    count = 0
    for node in adj_list:
        if node not in visited:
            dfs_recursive(adj_list, node, visited)
            count += 1
            print(f" (컴포넌트 {count})")
    return count

print("\n=== 연결 요소 ===")
disconnected = {'A': ['B'], 'B': ['A'], 'C': ['D'], 'D': ['C'], 'E': []}
n = count_components(disconnected)
print(f"연결 요소 수: {n}")
