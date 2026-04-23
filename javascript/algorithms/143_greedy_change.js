// Greedy: Coin Change

// greedy — largest coin first
function coinChangeGreedy(amount, coins) {
  coins.sort((a, b) => b - a);
  const result = [];
  let rem = amount;
  for (const coin of coins) {
    const count = Math.floor(rem / coin);
    if (count > 0) { result.push({ coin, count }); rem -= coin * count; }
  }
  return { result, total: result.reduce((s, r) => s + r.count, 0) };
}

console.log("=== Greedy coin change ===");
const coins = [500, 100, 50, 10];
for (const amount of [1260, 3720]) {
  const { result, total } = coinChangeGreedy(amount, coins);
  console.log(`\n  ${amount}:`);
  result.forEach(({ coin, count }) => console.log(`    ${coin} x ${count}`));
  console.log(`    => ${total} coins`);
}

// greedy fails for some coin sets
console.log("\n=== Greedy fails ===");
console.log("  coins=[1,3,4], amount=6");
console.log("  greedy: 4+1+1 = 3 coins (not optimal)");
console.log("  optimal: 3+3 = 2 coins (needs DP)");

// DP coin change — correct minimum
function coinChangeDP(amount, coins) {
  const dp = new Array(amount + 1).fill(Infinity);
  const used = new Array(amount + 1).fill(-1);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i && dp[i - coin] + 1 < dp[i]) {
        dp[i] = dp[i - coin] + 1;
        used[i] = coin;
      }
    }
  }
  const path = []; let rem = amount;
  while (rem > 0) { path.push(used[rem]); rem -= used[rem]; }
  return { count: dp[amount], coins: path };
}

const dpR = coinChangeDP(6, [1, 3, 4]);
console.log(`  DP result: ${dpR.count} coins => [${dpR.coins}]`);

// activity selection — maximize non-overlapping meetings
function maxMeetings(meetings) {
  const sorted = [...meetings].sort((a, b) => a.end - b.end);
  const selected = [sorted[0]];
  let lastEnd = sorted[0].end;
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i].start >= lastEnd) {
      selected.push(sorted[i]);
      lastEnd = sorted[i].end;
    }
  }
  return selected;
}

console.log("\n=== Activity selection ===");
const meetings = [
  { name:"A", start:1, end:4 }, { name:"B", start:3, end:5 },
  { name:"C", start:0, end:6 }, { name:"D", start:5, end:7 },
  { name:"E", start:8, end:11 }
];
const sel = maxMeetings(meetings);
console.log(`  selected: ${sel.map(m => m.name).join(", ")} (${sel.length} meetings)`);
