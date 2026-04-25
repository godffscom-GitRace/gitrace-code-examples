// Tree Traversal

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);

function preorder(n, r = []) {
  if (!n) return r;
  r.push(n.val);
  preorder(n.left, r);
  preorder(n.right, r);
  return r;
}

function inorder(n, r = []) {
  if (!n) return r;
  inorder(n.left, r);
  r.push(n.val);
  inorder(n.right, r);
  return r;
}

function levelOrder(root) {
  const q = [root];
  const out = [];

  while (q.length > 0) {
    const n = q.shift();
    out.push(n.val);
    if (n.left) q.push(n.left);
    if (n.right) q.push(n.right);
  }

  return out;
}

console.log("pre:", preorder(root).join(" "));
console.log("in:", inorder(root).join(" "));
console.log("bfs:", levelOrder(root).join(" "));
