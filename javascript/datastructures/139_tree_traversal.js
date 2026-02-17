// [139] 이진 트리 순회 (Tree Traversal)
// 레벨: 4 | 이진 트리를 다양한 방법으로 순회하는 알고리즘을 구현합니다

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// 트리 구성
//       1
//      / \
//     2   3
//    / \   \
//   4   5   6
//      /
//     7
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.right = new TreeNode(6);
root.left.right.left = new TreeNode(7);

// === 재귀 순회 ===
// 전위 순회 (Pre-order): 루트 → 왼쪽 → 오른쪽
function preorder(node, result = []) {
  if (!node) return result;
  result.push(node.val);
  preorder(node.left, result);
  preorder(node.right, result);
  return result;
}

// 중위 순회 (In-order): 왼쪽 → 루트 → 오른쪽
function inorder(node, result = []) {
  if (!node) return result;
  inorder(node.left, result);
  result.push(node.val);
  inorder(node.right, result);
  return result;
}

// 후위 순회 (Post-order): 왼쪽 → 오른쪽 → 루트
function postorder(node, result = []) {
  if (!node) return result;
  postorder(node.left, result);
  postorder(node.right, result);
  result.push(node.val);
  return result;
}

console.log("=== 재귀 순회 ===");
console.log(`  전위 (Pre):  [${preorder(root)}]`);
console.log(`  중위 (In):   [${inorder(root)}]`);
console.log(`  후위 (Post): [${postorder(root)}]`);

// === 스택 기반 순회 (반복문) ===
function preorderIterative(root) {
  if (!root) return [];
  const stack = [root];
  const result = [];
  while (stack.length) {
    const node = stack.pop();
    result.push(node.val);
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  return result;
}

function inorderIterative(root) {
  const stack = [];
  const result = [];
  let current = root;
  while (current || stack.length) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    current = stack.pop();
    result.push(current.val);
    current = current.right;
  }
  return result;
}

console.log("\n=== 스택 기반 순회 ===");
console.log(`  전위: [${preorderIterative(root)}]`);
console.log(`  중위: [${inorderIterative(root)}]`);

// === 레벨 순회 (BFS) ===
function levelOrder(root) {
  if (!root) return [];
  const queue = [root];
  const result = [];
  while (queue.length) {
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

console.log("\n=== 레벨 순회 ===");
const lvls = levelOrder(root);
lvls.forEach((l, i) => console.log(`  레벨 ${i}: [${l}]`));

// === 트리 속성 ===
function maxDepth(node) {
  if (!node) return 0;
  return 1 + Math.max(maxDepth(node.left), maxDepth(node.right));
}

function countNodes(node) {
  if (!node) return 0;
  return 1 + countNodes(node.left) + countNodes(node.right);
}

function sumNodes(node) {
  if (!node) return 0;
  return node.val + sumNodes(node.left) + sumNodes(node.right);
}

console.log("\n=== 트리 속성 ===");
console.log(`  최대 깊이: ${maxDepth(root)}`);
console.log(`  노드 수: ${countNodes(root)}`);
console.log(`  노드 합: ${sumNodes(root)}`);

// 트리 시각화
function printTree(node, prefix = "", isLeft = true) {
  if (!node) return;
  if (node.right) printTree(node.right, prefix + (isLeft ? "│   " : "    "), false);
  console.log(prefix + (isLeft ? "└── " : "┌── ") + node.val);
  if (node.left) printTree(node.left, prefix + (isLeft ? "    " : "│   "), true);
}

console.log("\n=== 트리 시각화 ===");
printTree(root);
