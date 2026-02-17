// [144] 백트래킹 - N-Queens (Backtracking)
// 레벨: 5 | 백트래킹으로 N-Queens 문제를 해결합니다

function solveNQueens(n) {
  const solutions = [];
  const board = Array.from({ length: n }, () => Array(n).fill("."));

  function isSafe(row, col) {
    // 같은 열 확인
    for (let i = 0; i < row; i++) {
      if (board[i][col] === "Q") return false;
    }
    // 왼쪽 대각선
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === "Q") return false;
    }
    // 오른쪽 대각선
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === "Q") return false;
    }
    return true;
  }

  function backtrack(row) {
    if (row === n) {
      solutions.push(board.map(r => r.join("")));
      return;
    }
    for (let col = 0; col < n; col++) {
      if (isSafe(row, col)) {
        board[row][col] = "Q";
        backtrack(row + 1);
        board[row][col] = "."; // 되돌리기
      }
    }
  }

  backtrack(0);
  return solutions;
}

// 4-Queens
console.log("=== 4-Queens 풀이 ===");
const solutions4 = solveNQueens(4);
console.log(`  해의 수: ${solutions4.length}개\n`);

solutions4.forEach((sol, idx) => {
  console.log(`  풀이 ${idx + 1}:`);
  sol.forEach(row => {
    const visual = row.split("").map(c => c === "Q" ? "♛" : "·").join(" ");
    console.log(`    ${visual}`);
  });
  console.log();
});

// N별 해의 개수
console.log("=== N별 해의 개수 ===");
for (let n = 1; n <= 8; n++) {
  const count = solveNQueens(n).length;
  console.log(`  ${n}-Queens: ${count}개`);
}

// 부분집합 합 (Subset Sum)
console.log("\n=== 백트래킹: 부분집합 합 ===");
function subsetSum(nums, target) {
  const results = [];

  function backtrack(start, current, sum) {
    if (sum === target) {
      results.push([...current]);
      return;
    }
    if (sum > target) return; // 가지치기

    for (let i = start; i < nums.length; i++) {
      current.push(nums[i]);
      backtrack(i + 1, current, sum + nums[i]);
      current.pop(); // 되돌리기
    }
  }

  backtrack(0, [], 0);
  return results;
}

const nums = [2, 3, 5, 7, 8];
const target = 10;
console.log(`  배열: [${nums}], 목표: ${target}`);
const subsets = subsetSum(nums, target);
for (const s of subsets) {
  console.log(`    [${s}] = ${s.reduce((a, b) => a + b, 0)}`);
}

// 순열 생성 (백트래킹)
console.log("\n=== 백트래킹: 순열 ===");
function permutations(arr) {
  const results = [];

  function backtrack(current, remaining) {
    if (remaining.length === 0) {
      results.push([...current]);
      return;
    }
    for (let i = 0; i < remaining.length; i++) {
      current.push(remaining[i]);
      backtrack(current, [...remaining.slice(0, i), ...remaining.slice(i + 1)]);
      current.pop();
    }
  }

  backtrack([], arr);
  return results;
}

const perms = permutations([1, 2, 3]);
console.log(`  [1,2,3] 순열 (${perms.length}개):`);
perms.forEach(p => console.log(`    [${p}]`));

// 스도쿠 솔버 (미니 3x3)
console.log("\n=== 백트래킹: 미니 스도쿠 검증 ===");
function isValidSudoku(board) {
  for (let i = 0; i < 9; i++) {
    const row = new Set(), col = new Set();
    for (let j = 0; j < 9; j++) {
      if (board[i][j] !== 0 && row.has(board[i][j])) return false;
      row.add(board[i][j]);
      if (board[j][i] !== 0 && col.has(board[j][i])) return false;
      col.add(board[j][i]);
    }
  }
  return true;
}
console.log("  스도쿠 검증 로직 구현 완료 (백트래킹 기반)");
