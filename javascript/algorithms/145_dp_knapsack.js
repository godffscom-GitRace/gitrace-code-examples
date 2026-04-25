// Knapsack DP

function knapsack(items, cap) {
  const n = items.length;
  const dp = Array.from({ length: n + 1 }, () =>
    Array(cap + 1).fill(0)
  );

  for (let i = 1; i <= n; i++) {
    const w = items[i - 1].w;
    const v = items[i - 1].v;

    for (let c = 0; c <= cap; c++) {
      if (w > c) dp[i][c] = dp[i - 1][c];
      else {
        const a = dp[i - 1][c];
        const b = dp[i - 1][c - w] + v;
        dp[i][c] = a > b ? a : b;
      }
    }
  }

  return dp[n][cap];
}

const items = [
  { w: 3, v: 4 },
  { w: 2, v: 3 },
  { w: 1, v: 2 }
];

console.log("max: " + knapsack(items, 5));
