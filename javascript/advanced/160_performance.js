function benchmark(name, fn) {
  const t = performance.now();
  fn();
  console.log(name, (performance.now() - t).toFixed(2));
}

// array loop
const arr = Array.from({ length: 100000 }, (_, i) => i);

benchmark("for", () => {
  let s = 0;
  for (let i = 0; i < arr.length; i++) s += arr[i];
});

benchmark("forof", () => {
  let s = 0;
  for (const n of arr) s += n;
});

benchmark("reduce", () => {
  arr.reduce((a, b) => a + b, 0);
});

// string build
const N = 5000;

benchmark("plus", () => {
  let s = "";
  for (let i = 0; i < N; i++) s += "a";
});

benchmark("join", () => {
  const p = [];
  for (let i = 0; i < N; i++) p.push("a");
  p.join("");
});

// search compare
const data = Array.from({ length: 10000 }, (_, i) => i);
const map = new Map(data.map(x => [x, x]));
const set = new Set(data);

benchmark("array", () => data.includes(9999));
benchmark("map", () => map.get(9999));
benchmark("set", () => set.has(9999));

// memo
const cache = new Map();

function heavy(n) {
  let r = 0;
  for (let i = 0; i < n; i++) r += Math.sqrt(i);
  return r;
}

function memo(n) {
  if (cache.has(n)) return cache.get(n);
  const r = heavy(n);
  cache.set(n, r);
  return r;
}

benchmark("first", () => memo(50000));
benchmark("cached", () => memo(50000));

// clone
const obj = { a: 1, b: { c: 2 } };

benchmark("json", () => JSON.parse(JSON.stringify(obj)));
benchmark("clone", () => structuredClone(obj));
benchmark("spread", () => ({ ...obj }));
