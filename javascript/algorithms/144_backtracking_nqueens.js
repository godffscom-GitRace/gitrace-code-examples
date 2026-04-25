// N Queens

function solveN(n) {
  const res = [];
  const board = Array.from({ length: n }, () => Array(n).fill("."));

  function safe(r, c) {
    for (let i = 0; i < r; i++) {
      if (board[i][c] === "Q") return false;
    }
    for (let i = r - 1, j = c - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === "Q") return false;
    }
    for (let i = r - 1, j = c + 1; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === "Q") return false;
    }
    return true;
  }

  function bt(r) {
    if (r === n) {
      res.push(board.map(row => row.join("")));
      return;
    }
    for (let c = 0; c < n; c++) {
      if (safe(r, c)) {
        board[r][c] = "Q";
        bt(r + 1);
        board[r][c] = ".";
      }
    }
  }

  bt(0);
  return res;
}

const r = solveN(4);

console.log("count: " + r.length);
for (let i = 0; i < r.length; i++) {
  console.log("solution " + (i + 1));
  for (let j = 0; j < r[i].length; j++) {
    console.log(r[i][j]);
  }
}
