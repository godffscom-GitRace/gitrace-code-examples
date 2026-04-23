// Backtracking: N-Queens

function solveNQueens(n) {
  const solutions = [];
  const board = Array.from({ length: n }, () => Array(n).fill("."));

  function isSafe(row, col) {
    for (let i = 0; i < row; i++) if (board[i][col] === "Q") return false;
    for (let i = row-1, j = col-1; i >= 0 && j >= 0; i--, j--)
      if (board[i][j] === "Q") return false;
    for (let i = row-1, j = col+1; i >= 0 && j < n; i--, j++)
      if (board[i][j] === "Q") return false;
    return true;
  }

  function backtrack(row) {
    if (row === n) { solutions.push(board.map(r => r.join(""))); return; }
    for (let col = 0; col < n; col++) {
      if (isSafe(row, col)) {
        board[row][col] = "Q";
        backtrack(row + 1);
        board[row][col] = "."; // undo
      }
    }
  }

  backtrack(0);
  return solutions;
}

// 4-Queens
const s4 = solveNQueens(4);
console.log(`4-Queens: ${s4.length} solutions`);
s4.forEach((sol, i) => {
  console.log(`  solution ${i+1}:`);
  sol.forEach(row => console.log(`    ${row.split("").join(" ")}`));
});

// solution count by N
console.log("\nN-Queens count:");
for (let n = 1; n <= 8; n++) {
  console.log(`  ${n}-Queens: ${solveNQueens(n).length}`);
}

// subset sum (backtracking)
function subsetSum(nums, target) {
  const results = [];
  function bt(start, cur, sum) {
    if (sum === target) { results.push([...cur]); return; }
    if (sum > target) return;
    for (let i = start; i < nums.length; i++) {
      cur.push(nums[i]);
      bt(i + 1, cur, sum + nums[i]);
      cur.pop();
    }
  }
  bt(0, [], 0);
  return results;
}

console.log("\nsubset sum ([2,3,5,7,8], target=10):");
subsetSum([2, 3, 5, 7, 8], 10).forEach(s => console.log(`  [${s}]`));

// permutations
function permutations(arr) {
  const results = [];
  function bt(cur, rem) {
    if (!rem.length) { results.push([...cur]); return; }
    for (let i = 0; i < rem.length; i++) {
      cur.push(rem[i]);
      bt(cur, [...rem.slice(0,i), ...rem.slice(i+1)]);
      cur.pop();
    }
  }
  bt([], arr);
  return results;
}

const perms = permutations([1, 2, 3]);
console.log(`\npermutations([1,2,3]) — ${perms.length} total:`);
perms.forEach(p => console.log(`  [${p}]`));
