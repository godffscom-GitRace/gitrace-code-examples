// BFS with Queue

const graph = {
  A: ["B", "C"],
  B: ["A", "D"],
  C: ["A", "E"],
  D: ["B"],
  E: ["C"]
};

function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const order = [];

  while (queue.length > 0) {
    const node = queue.shift();
    order.push(node);

    const neighbors = graph[node];
    for (let i = 0; i < neighbors.length; i++) {
      const n = neighbors[i];
      if (!visited.has(n)) {
        visited.add(n);
        queue.push(n);
      }
    }
  }

  return order;
}

const result = bfs(graph, "A");

console.log("BFS:");
console.log(result.join(" "));
