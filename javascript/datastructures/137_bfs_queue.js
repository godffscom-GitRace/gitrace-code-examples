// [137] 큐로 너비 우선 탐색 (BFS with Queue)
// 레벨: 4 | 큐를 사용한 BFS로 그래프를 탐색합니다

// 그래프 정의 (인접 리스트)
const graph = {
  A: ["B", "C"],
  B: ["A", "D", "E"],
  C: ["A", "F"],
  D: ["B"],
  E: ["B", "F"],
  F: ["C", "E"],
};

// BFS 구현
function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  const order = [];

  visited.add(start);

  while (queue.length > 0) {
    const node = queue.shift();
    order.push(node);

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return order;
}

console.log("=== BFS 탐색 ===");
console.log(`  탐색 순서: ${bfs(graph, "A").join(" → ")}`);

// 레벨별 BFS
function bfsLevels(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const levels = [];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node);

      for (const neighbor of graph[node]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
    levels.push(currentLevel);
  }
  return levels;
}

console.log("\n=== 레벨별 BFS ===");
const levels = bfsLevels(graph, "A");
levels.forEach((level, i) => console.log(`  레벨 ${i}: [${level}]`));

// 최단 경로 찾기
function shortestPath(graph, start, end) {
  const visited = new Set([start]);
  const queue = [[start, [start]]];

  while (queue.length > 0) {
    const [node, path] = queue.shift();
    if (node === end) return path;

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, [...path, neighbor]]);
      }
    }
  }
  return null;
}

console.log("\n=== 최단 경로 ===");
const pairs = [["A", "F"], ["A", "E"], ["D", "F"]];
for (const [s, e] of pairs) {
  const path = shortestPath(graph, s, e);
  console.log(`  ${s} → ${e}: ${path.join(" → ")} (거리: ${path.length - 1})`);
}

// 2D 그리드 BFS (미로 탐색)
function mazeBFS(maze, start, end) {
  const rows = maze.length, cols = maze[0].length;
  const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
  const visited = new Set([`${start[0]},${start[1]}`]);
  const queue = [[...start, 0]]; // row, col, distance

  while (queue.length > 0) {
    const [r, c, dist] = queue.shift();
    if (r === end[0] && c === end[1]) return dist;

    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      const key = `${nr},${nc}`;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols
          && maze[nr][nc] === 0 && !visited.has(key)) {
        visited.add(key);
        queue.push([nr, nc, dist + 1]);
      }
    }
  }
  return -1; // 도달 불가
}

console.log("\n=== 미로 탐색 (0:길, 1:벽) ===");
const maze = [
  [0, 0, 1, 0, 0],
  [0, 0, 0, 0, 1],
  [1, 1, 0, 1, 0],
  [0, 0, 0, 0, 0],
];
maze.forEach((row, i) => console.log(`  ${row.map(c => c ? "■" : "□").join(" ")}`));
const dist = mazeBFS(maze, [0, 0], [3, 4]);
console.log(`  (0,0) → (3,4) 최단 거리: ${dist}`);

// 이진 트리 레벨 순회
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

function levelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const level = [];
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}

console.log("\n=== 이진 트리 레벨 순회 ===");
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.right = new TreeNode(6);

const treeLevels = levelOrder(root);
treeLevels.forEach((l, i) => console.log(`  레벨 ${i}: [${l}]`));
