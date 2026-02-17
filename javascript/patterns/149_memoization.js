// [149] 메모이제이션 패턴 (Memoization)
// 레벨: 3 | 함수 결과를 캐싱하여 성능을 개선합니다

// 기본 메모이제이션
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// 피보나치 - 메모이제이션 적용
function fibSlow(n) {
  if (n <= 1) return n;
  return fibSlow(n - 1) + fibSlow(n - 2);
}

const fibFast = memoize(function fib(n) {
  if (n <= 1) return n;
  return fibFast(n - 1) + fibFast(n - 2);
});

console.log("=== 피보나치 성능 비교 ===");

let start = performance.now();
const r1 = fibSlow(35);
const t1 = performance.now() - start;

start = performance.now();
const r2 = fibFast(35);
const t2 = performance.now() - start;

console.log(`  fib(35) = ${r1}`);
console.log(`  일반: ${t1.toFixed(2)}ms`);
console.log(`  메모: ${t2.toFixed(4)}ms`);
console.log(`  속도 향상: ${(t1 / t2).toFixed(0)}배`);

// 팩토리얼 메모이제이션
const factorial = memoize(function fact(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
});

console.log("\n=== 팩토리얼 ===");
console.log(`  10! = ${factorial(10)}`);
console.log(`  15! = ${factorial(15)}`); // 10!까지 캐시 활용

// 캐시 크기 제한 (LRU 메모이제이션)
function memoizeLRU(fn, maxSize = 100) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      const value = cache.get(key);
      cache.delete(key);
      cache.set(key, value); // 맨 뒤로
      return value;
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    if (cache.size > maxSize) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
    return result;
  };
}

// 비용이 큰 계산 메모이제이션
const heavyCalc = memoize(function (x, y) {
  // 무거운 계산 시뮬레이션
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += Math.sin(x) * Math.cos(y);
  }
  return result;
});

console.log("\n=== 무거운 계산 캐싱 ===");
start = performance.now();
heavyCalc(1, 2);
console.log(`  첫 호출: ${(performance.now() - start).toFixed(2)}ms`);

start = performance.now();
heavyCalc(1, 2);
console.log(`  캐시 hit: ${(performance.now() - start).toFixed(4)}ms`);

// 활용: 문자열 처리 캐싱
const processText = memoize(function (text) {
  return {
    length: text.length,
    words: text.split(/\s+/).length,
    reversed: text.split("").reverse().join(""),
    upper: text.toUpperCase(),
  };
});

console.log("\n=== 문자열 처리 캐싱 ===");
const info = processText("Hello World JavaScript");
console.log(`  길이: ${info.length}, 단어: ${info.words}`);
console.log(`  뒤집기: ${info.reversed}`);

// 메모이제이션 데코레이터 패턴
console.log("\n=== 통계 포함 메모이제이션 ===");
function memoizeWithStats(fn) {
  const cache = new Map();
  let hits = 0, misses = 0;

  const memoized = function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      hits++;
      return cache.get(key);
    }
    misses++;
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };

  memoized.stats = () => ({ hits, misses, cacheSize: cache.size });
  memoized.clear = () => { cache.clear(); hits = 0; misses = 0; };

  return memoized;
}

const cachedAdd = memoizeWithStats((a, b) => a + b);
cachedAdd(1, 2);
cachedAdd(3, 4);
cachedAdd(1, 2); // cache hit
cachedAdd(1, 2); // cache hit
cachedAdd(5, 6);

const stats = cachedAdd.stats();
console.log(`  히트: ${stats.hits}, 미스: ${stats.misses}, 캐시: ${stats.cacheSize}개`);
console.log(`  히트율: ${((stats.hits / (stats.hits + stats.misses)) * 100).toFixed(1)}%`);
