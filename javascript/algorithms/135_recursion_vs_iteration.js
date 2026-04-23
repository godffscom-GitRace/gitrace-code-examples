// Recursion vs Iteration

// factorial
function factRec(n) { return n <= 1 ? 1 : n * factRec(n - 1); }
function factIter(n) { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r; }

console.log("factorial:");
for (const n of [5, 10]) {
  console.log(`  ${n}! = ${factRec(n)} (rec) = ${factIter(n)} (iter)`);
}

// fibonacci
function fibRec(n) { return n <= 1 ? n : fibRec(n-1) + fibRec(n-2); }
function fibIter(n) {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) [a, b] = [b, a + b];
  return b;
}

console.log("\nfibonacci sequence:");
console.log("  " + Array.from({ length: 10 }, (_, i) => fibIter(i)).join(", "));

// performance comparison
const t1 = performance.now(); fibRec(30);
console.log(`  fib(30) recursive:  ${(performance.now() - t1).toFixed(2)}ms`);
const t2 = performance.now(); fibIter(30);
console.log(`  fib(30) iterative:  ${(performance.now() - t2).toFixed(4)}ms`);

// Tower of Hanoi (naturally recursive)
function hanoi(n, from, to, aux, moves = []) {
  if (n === 1) { moves.push(`${from} -> ${to}`); return moves; }
  hanoi(n - 1, from, aux, to, moves);
  moves.push(`${from} -> ${to}`);
  hanoi(n - 1, aux, to, from, moves);
  return moves;
}

console.log("\nHanoi (3 disks):");
hanoi(3, "A", "C", "B").forEach((m, i) => console.log(`  ${i+1}. ${m}`));

// fast power — O(log n)
function power(base, exp) {
  if (exp === 0) return 1;
  if (exp % 2 === 0) { const h = power(base, exp / 2); return h * h; }
  return base * power(base, exp - 1);
}

console.log(`\n2^10 = ${power(2, 10)}`);
console.log(`3^5  = ${power(3, 5)}`);
