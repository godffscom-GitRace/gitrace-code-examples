# [107] 다익스트라 알고리즘 - Dijkstra's Algorithm
# 레벨: 5 | 가중치 그래프에서 최단 경로를 찾는 다익스트라 알고리즘을 구현합니다

import heapq

# 가중치 그래프 (인접 리스트): {노드: [(이웃, 가중치), ...]}
graph = {
    'A': [('B', 4), ('C', 2)],
    'B': [('A', 4), ('D', 3), ('E', 1)],
    'C': [('A', 2), ('D', 5), ('F', 7)],
    'D': [('B', 3), ('C', 5), ('E', 2), ('F', 1)],
    'E': [('B', 1), ('D', 2)],
    'F': [('C', 7), ('D', 1)]
}

def dijkstra(graph, start):
    # 최단 거리 테이블
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    # 이전 노드 추적 (경로 복원용)
    previous = {node: None for node in graph}
    # 우선순위 큐 (거리, 노드)
    pq = [(0, start)]

    while pq:
        current_dist, current = heapq.heappop(pq)

        # 이미 처리된 더 짧은 경로가 있으면 스킵
        if current_dist > distances[current]:
            continue

        for neighbor, weight in graph[current]:
            distance = current_dist + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                previous[neighbor] = current
                heapq.heappush(pq, (distance, neighbor))

    return distances, previous

# 경로 복원
def get_path(previous, start, end):
    path = []
    node = end
    while node is not None:
        path.append(node)
        node = previous[node]
    return path[::-1]

# 실행
print("=== 다익스트라 (시작: A) ===")
distances, previous = dijkstra(graph, 'A')

for node, dist in sorted(distances.items()):
    path = get_path(previous, 'A', node)
    print(f"  A → {node}: 거리 {dist}, 경로 {' → '.join(path)}")

# 특정 경로 찾기
print(f"\nA → F 최단 거리: {distances['F']}")
print(f"A → F 최단 경로: {' → '.join(get_path(previous, 'A', 'F'))}")

# 시간 복잡도: O((V + E) log V) - 우선순위 큐 사용
