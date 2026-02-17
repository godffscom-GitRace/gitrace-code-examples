// [135] 재귀 vs 반복문 (Recursion vs Iteration)
// 레벨: 3 | 재귀와 반복문의 차이를 비교하고 적절한 사용법을 배웁니다

// === 1. 팩토리얼 ===
// 재귀
function factorialRecursive(n) {
  if (n <= 1) return 1;
  return n * factorialRecursive(n - 1);
}

// 반복문
function factorialIterative(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

console.log("=== 팩토리얼 ===");
for (const n of [5, 10]) {
  console.log(`  ${n}! = ${factorialRecursive(n)} (재귀) = ${factorialIterative(n)} (반복)`);
}

// === 2. 피보나치 ===
// 재귀 (비효율적)
function fibRecursive(n) {
  if (n <= 1) return n;
  return fibRecursive(n - 1) + fibRecursive(n - 2);
}

// 반복문 (효율적)
function fibIterative(n) {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) [a, b] = [b, a + b];
  return b;
}

console.log("\n=== 피보나치 ===");
console.log("  n:  ", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].join(", "));
console.log("  fib:", Array.from({ length: 11 }, (_, i) => fibIterative(i)).join(", "));

// 성능 비교
console.log("\n  성능 비교:");
const start1 = performance.now();
fibRecursive(30);
console.log(`  재귀 fib(30): ${(performance.now() - start1).toFixed(2)}ms`);

const start2 = performance.now();
fibIterative(30);
console.log(`  반복 fib(30): ${(performance.now() - start2).toFixed(4)}ms`);

// === 3. 하노이 탑 ===
function hanoi(n, from, to, aux, moves = []) {
  if (n === 1) {
    moves.push(`  ${from} → ${to}`);
    return moves;
  }
  hanoi(n - 1, from, aux, to, moves);
  moves.push(`  ${from} → ${to}`);
  hanoi(n - 1, aux, to, from, moves);
  return moves;
}

console.log("\n=== 하노이 탑 (3개 원반) ===");
const moves = hanoi(3, "A", "C", "B");
moves.forEach((m, i) => console.log(`  ${i + 1}. ${m.trim()}`));
console.log(`  총 이동: ${moves.length}회`);

// === 4. 배열 뒤집기 ===
function reverseRecursive(arr, start = 0, end = arr.length - 1) {
  if (start >= end) return arr;
  [arr[start], arr[end]] = [arr[end], arr[start]];
  return reverseRecursive(arr, start + 1, end - 1);
}

function reverseIterative(arr) {
  let left = 0, right = arr.length - 1;
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
  return arr;
}

console.log("\n=== 배열 뒤집기 ===");
console.log(`  재귀: [${reverseRecursive([1, 2, 3, 4, 5])}]`);
console.log(`  반복: [${reverseIterative([1, 2, 3, 4, 5])}]`);

// === 5. 거듭제곱 (빠른 거듭제곱) ===
function powerRecursive(base, exp) {
  if (exp === 0) return 1;
  if (exp % 2 === 0) {
    const half = powerRecursive(base, exp / 2);
    return half * half;
  }
  return base * powerRecursive(base, exp - 1);
}

console.log("\n=== 빠른 거듭제곱 ===");
console.log(`  2^10 = ${powerRecursive(2, 10)}`);
console.log(`  3^5  = ${powerRecursive(3, 5)}`);

// === 정리 ===
console.log("\n=== 재귀 vs 반복 정리 ===");
console.log("  재귀: 코드 간결, 트리/그래프 탐색에 적합, 스택오버플로 위험");
console.log("  반복: 성능 우수, 메모리 효율적, 복잡한 로직에선 코드 길어짐");
