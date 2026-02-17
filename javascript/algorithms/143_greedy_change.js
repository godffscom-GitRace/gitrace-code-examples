// [143] 그리디 알고리즘 - 거스름돈 (Greedy: Coin Change)
// 레벨: 3 | 거스름돈 문제를 그리디 알고리즘으로 해결합니다

// 기본 거스름돈 (그리디)
function coinChangeGreedy(amount, coins) {
  coins.sort((a, b) => b - a); // 큰 동전부터
  const result = [];
  let remaining = amount;

  for (const coin of coins) {
    const count = Math.floor(remaining / coin);
    if (count > 0) {
      result.push({ coin, count });
      remaining -= coin * count;
    }
  }

  return { result, total: result.reduce((s, r) => s + r.count, 0), remaining };
}

console.log("=== 거스름돈 (그리디) ===");
const coins = [500, 100, 50, 10];
const amounts = [1260, 3720, 890];
for (const amount of amounts) {
  const { result, total } = coinChangeGreedy(amount, coins);
  console.log(`\n  ${amount.toLocaleString()}원:`);
  for (const { coin, count } of result) {
    console.log(`    ${coin}원 × ${count}개`);
  }
  console.log(`    → 총 ${total}개 동전`);
}

// 그리디가 실패하는 경우
console.log("\n=== 그리디가 최적이 아닌 경우 ===");
const specialCoins = [1, 3, 4];
const target = 6;
const greedy = coinChangeGreedy(target, specialCoins);
console.log(`  동전: [${specialCoins}], 금액: ${target}`);
console.log(`  그리디: 4+1+1 = 3개 (최적 아님)`);
console.log(`  최적해: 3+3 = 2개 (DP 필요)`);

// DP로 최소 동전 수 (정확한 풀이)
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

  // 사용된 동전 추적
  const result = [];
  let rem = amount;
  while (rem > 0 && used[rem] !== -1) {
    result.push(used[rem]);
    rem -= used[rem];
  }

  return { count: dp[amount], coins: result };
}

console.log(`\n  DP 풀이:`);
const dpResult = coinChangeDP(6, [1, 3, 4]);
console.log(`  최소 동전: ${dpResult.count}개 → [${dpResult.coins}]`);

// 그리디 활용: 회의실 배정
console.log("\n=== 회의실 배정 (그리디) ===");
function maxMeetings(meetings) {
  // 끝나는 시간 기준 정렬
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

const meetings = [
  { name: "A", start: 1, end: 4 },
  { name: "B", start: 3, end: 5 },
  { name: "C", start: 0, end: 6 },
  { name: "D", start: 5, end: 7 },
  { name: "E", start: 3, end: 8 },
  { name: "F", start: 5, end: 9 },
  { name: "G", start: 6, end: 10 },
  { name: "H", start: 8, end: 11 },
];

const selected = maxMeetings(meetings);
console.log("  전체 회의:");
for (const m of meetings) {
  const bar = " ".repeat(m.start) + "█".repeat(m.end - m.start);
  const mark = selected.includes(m) ? " ✓" : "";
  console.log(`    ${m.name} [${m.start}-${m.end}] ${bar}${mark}`);
}
console.log(`  선택: ${selected.map(m => m.name).join(", ")} (${selected.length}개)`);

// 그리디: 분할 가능 배낭
console.log("\n=== 분할 가능 배낭 (그리디) ===");
function fractionalKnapsack(items, capacity) {
  // 단위 가치 기준 정렬
  const sorted = items.map(item => ({
    ...item,
    ratio: item.value / item.weight,
  })).sort((a, b) => b.ratio - a.ratio);

  let totalValue = 0;
  let remaining = capacity;
  const taken = [];

  for (const item of sorted) {
    if (remaining >= item.weight) {
      taken.push({ name: item.name, fraction: 1 });
      totalValue += item.value;
      remaining -= item.weight;
    } else if (remaining > 0) {
      const fraction = remaining / item.weight;
      taken.push({ name: item.name, fraction });
      totalValue += item.value * fraction;
      remaining = 0;
    }
  }
  return { totalValue, taken };
}

const items = [
  { name: "금", weight: 10, value: 60 },
  { name: "은", weight: 20, value: 100 },
  { name: "동", weight: 30, value: 120 },
];
const result2 = fractionalKnapsack(items, 50);
console.log(`  용량: 50kg`);
for (const t of result2.taken) {
  console.log(`    ${t.name}: ${(t.fraction * 100).toFixed(0)}%`);
}
console.log(`  최대 가치: ${result2.totalValue.toFixed(0)}`);
