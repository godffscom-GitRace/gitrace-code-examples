// Performance Optimization

function benchmark(name, fn, iter = 1) {
  const t = performance.now();
  for (let i = 0; i < iter; i++) fn();
  console.log(`  ${name}: ${(performance.now() - t).toFixed(2)}ms`);
}

// 1. array iteration comparison
console.log("=== Array iteration ===");
const arr = Array.from({ length: 100000 }, (_, i) => i);

benchmark("for loop", () => { let s = 0; for (let i = 0; i < arr.length; i++) s += arr[i]; });
benchmark("for...of", () => { let s = 0; for (const n of arr) s += n; });
benchmark("reduce",   () => arr.reduce((s, n) => s + n, 0));

// 2. string concatenation
console.log("\n=== String concat ===");
const N = 10000;
benchmark("+ concat",  () => { let s = ""; for (let i = 0; i < N; i++) s += "a"; });
benchmark("array join",() => { const p = []; for (let i = 0; i < N; i++) p.push("a"); p.join(""); });

// 3. search: Array vs Map vs Set
console.log("\n=== Search ===");
const data = Array.from({ length: 10000 }, (_, i) => ({ id: i, name: `u${i}` }));
const dataMap = new Map(data.map(d => [d.id, d]));
const idSet   = new Set(data.map(d => d.id));

benchmark("Array.find", () => data.find(d => d.id === 9999));
benchmark("Map.get",    () => dataMap.get(9999));
benchmark("Set.has",    () => idSet.has(9999));

// 4. memoization
console.log("\n=== Memoization ===");
function expCalc(n) { let r = 0; for (let i = 0; i < n; i++) r += Math.sqrt(i); return r; }
const cache = new Map();
function memo(n) { if (cache.has(n)) return cache.get(n); const r = expCalc(n); cache.set(n, r); return r; }

benchmark("first call", () => memo(100000));
benchmark("cache hit",  () => memo(100000));

// 5. object copy
console.log("\n=== Object copy ===");
const obj = { a: 1, b: { c: 2 }, d: [1, 2] };
benchmark("JSON clone",       () => JSON.parse(JSON.stringify(obj)), 10000);
benchmark("structuredClone",  () => structuredClone(obj), 10000);
benchmark("spread (shallow)", () => ({ ...obj }), 10000);
