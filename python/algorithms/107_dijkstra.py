# [107] 다익스트라 알고리즘 - Dijkstra's Algorithm
# 레벨: 5 | 가중치 그래프에서 최단 경로를 찾는 다익스트라 알고리즘을 구현합니다

import heapq

graph = {
    "A": [("B", 4), ("C", 2)],
    "B": [("D", 3)],
    "C": [("D", 5)],
    "D": []
}

def dijkstra(g, start):
    dist = {n: float("inf") for n in g}
    prev = {n: None for n in g}
    dist[start] = 0

    pq = [(0, start)]

    while pq:
        d, node = heapq.heappop(pq)

        for nxt, w in g[node]:
            nd = d + w
            if nd < dist[nxt]:
                dist[nxt] = nd
                prev[nxt] = node
                heapq.heappush(pq, (nd, nxt))

    return dist, prev

def path(prev, end):
    p = []
    while end:
        p.append(end)
        end = prev[end]
    return p[::-1]

dist, prev = dijkstra(graph, "A")

print("A -> D:", dist["D"])
print("path:", " -> ".join(path(prev, "D")))
