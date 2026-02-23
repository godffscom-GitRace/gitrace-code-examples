// [145] 동적 프로그래밍 - 배낭 문제 (DP: 0-1 Knapsack)
// 레벨: 5 | 동적 프로그래밍으로 0-1 배낭 문제를 해결합니다

// 0-1 배낭 문제
function knapsack(items, capacity) {
  const n = items.length;
  // DP 테이블: dp[i][w] = i개 아이템으로 용량 w에서 최대 가치
  const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    const { weight, value } = items[i - 1];
    for (let w = 0; w <= capacity; w++) {
      if (weight > w) {
        dp[i][w] = dp[i - 1][w]; // 넣을 수 없음
      } else {
        dp[i][w] = Math.max(
          dp[i - 1][w],                    // 안 넣기
          dp[i - 1][w - weight] + value     // 넣기
        );
      }
    }
  }

  // 선택된 아이템 역추적
  const selected = [];
  let w = capacity;
  for (let i = n; i > 0; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      selected.push(items[i - 1]);
      w -= items[i - 1].weight;
    }
  }

  return { maxValue: dp[n][capacity], selected };
}

// 테스트
console.log("=== 0-1 배낭 문제 ===");
const items = [
  { name: "노트북", weight: 3, value: 4 },
  { name: "카메라", weight: 1, value: 1 },
  { name: "텐트",   weight: 4, value: 5 },
  { name: "음식",   weight: 2, value: 3 },
  { name: "의류",   weight: 1, value: 2 },
];

const capacity = 7;
console.log(`  용량: ${capacity}kg`);
console.log("  아이템:");
for (const item of items) {
  console.log(`    ${item.name}: ${item.weight}kg, 가치 ${item.value}`);
}

const result = knapsack(items, capacity);
console.log(`\n  최대 가치: ${result.maxValue}`);
console.log("  선택된 아이템:");
let totalW = 0;
for (const item of result.selected) {
  console.log(`    - ${item.name} (${item.weight}kg, 가치 ${item.value})`);
  totalW += item.weight;
}
console.log(`  총 무게: ${totalW}kg`);

// DP 테이블 시각화 (작은 예제)
console.log("\n=== DP 테이블 시각화 ===");
const smallItems = [
  { name: "A", weight: 2, value: 3 },
  { name: "B", weight: 3, value: 4 },
  { name: "C", weight: 4, value: 5 },
];
const smallCap = 5;
const n = smallItems.length;
const dp = Array.from({ length: n + 1 }, () => Array(smallCap + 1).fill(0));

for (let i = 1; i <= n; i++) {
  const { weight, value } = smallItems[i - 1];
  for (let w = 0; w <= smallCap; w++) {
    if (weight > w) dp[i][w] = dp[i - 1][w];
    else dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - weight] + value);
  }
}

console.log(`  용량 →  ${Array.from({ length: smallCap + 1 }, (_, i) => i).join("  ")}`);
for (let i = 0; i <= n; i++) {
  const label = i === 0 ? "없음" : smallItems[i - 1].name;
  console.log(`  ${label}:     ${dp[i].join("  ")}`);
}

// 공간 최적화 (1차원 DP)
function knapsackOptimized(items, capacity) {
  const dp = Array(capacity + 1).fill(0);

  for (const { weight, value } of items) {
    for (let w = capacity; w >= weight; w--) {  // 역순!
      dp[w] = Math.max(dp[w], dp[w - weight] + value);
    }
  }
  return dp[capacity];
}

console.log("\n=== 공간 최적화 (1D) ===");
console.log(`  최대 가치: ${knapsackOptimized(items, capacity)}`);

// 동전 교환 (DP)
console.log("\n=== DP: 동전 교환 ===");
function coinChange(coins, amount) {
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i && dp[i - coin] + 1 < dp[i]) {
        dp[i] = dp[i - coin] + 1;
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}

const coins = [1, 5, 10, 25];
for (const amount of [30, 11, 63]) {
  console.log(`  ${amount}원 → 최소 ${coinChange(coins, amount)}개 동전`);
}

// 최장 증가 부분 수열 (LIS)
console.log("\n=== DP: 최장 증가 부분 수열 ===");
function lis(arr) {
  const dp = Array(arr.length).fill(1);
  for (let i = 1; i < arr.length; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[j] < arr[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }
  return Math.max(...dp);
}

const seq = [10, 22, 9, 33, 21, 50, 41, 60];
console.log(`  [${seq}]`);
console.log(`  LIS 길이: ${lis(seq)}`);
