// DP: 0-1 Knapsack

function knapsack(items, capacity) {
  const n = items.length;
  const dp = Array.from({ length: n+1 }, () => Array(capacity+1).fill(0));

  for (let i = 1; i <= n; i++) {
    const { weight, value } = items[i-1];
    for (let w = 0; w <= capacity; w++) {
      dp[i][w] = weight > w
        ? dp[i-1][w]
        : Math.max(dp[i-1][w], dp[i-1][w-weight] + value);
    }
  }

  // trace back selected items
  const selected = [];
  let w = capacity;
  for (let i = n; i > 0; i--) {
    if (dp[i][w] !== dp[i-1][w]) { selected.push(items[i-1]); w -= items[i-1].weight; }
  }

  return { maxValue: dp[n][capacity], selected };
}

const items = [
  { name: "laptop",  weight: 3, value: 4 },
  { name: "camera",  weight: 1, value: 1 },
  { name: "tent",    weight: 4, value: 5 },
  { name: "food",    weight: 2, value: 3 },
  { name: "clothes", weight: 1, value: 2 }
];
const capacity = 7;

console.log(`capacity: ${capacity}kg`);
items.forEach(it => console.log(`  ${it.name}: ${it.weight}kg, value ${it.value}`));

const result = knapsack(items, capacity);
console.log(`\nmax value: ${result.maxValue}`);
result.selected.forEach(it => console.log(`  - ${it.name} (${it.weight}kg)`));

// space-optimized 1D DP
function knapsack1D(items, capacity) {
  const dp = Array(capacity+1).fill(0);
  for (const { weight, value } of items)
    for (let w = capacity; w >= weight; w--)
      dp[w] = Math.max(dp[w], dp[w-weight] + value);
  return dp[capacity];
}

console.log(`\n1D DP max value: ${knapsack1D(items, capacity)}`);

// coin change (unbounded DP)
function coinChange(coins, amount) {
  const dp = Array(amount+1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++)
    for (const coin of coins)
      if (coin <= i && dp[i-coin]+1 < dp[i]) dp[i] = dp[i-coin]+1;
  return dp[amount] === Infinity ? -1 : dp[amount];
}

console.log("\nCoin change (coins=[1,5,10,25]):");
for (const amount of [30, 11, 63]) {
  console.log(`  ${amount} => min ${coinChange([1,5,10,25], amount)} coins`);
}
