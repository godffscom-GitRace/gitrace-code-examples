// [160] 성능 최적화 기법 (Performance Optimization)
// 레벨: 4 | JavaScript 코드의 성능을 측정하고 최적화하는 기법을 배웁니다

// === 성능 측정 ===
console.log("=== 성능 측정 ===");

function benchmark(name, fn, iterations = 1) {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) fn();
  const elapsed = performance.now() - start;
  console.log(`  ${name}: ${elapsed.toFixed(2)}ms`);
  return elapsed;
}

// === 1. 배열 순회 최적화 ===
console.log("\n=== 배열 순회 비교 ===");
const arr = Array.from({ length: 100000 }, (_, i) => i);

benchmark("for 루프", () => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) sum += arr[i];
});

benchmark("for...of", () => {
  let sum = 0;
  for (const n of arr) sum += n;
});

benchmark("forEach", () => {
  let sum = 0;
  arr.forEach(n => sum += n);
});

benchmark("reduce", () => {
  arr.reduce((s, n) => s + n, 0);
});

// === 2. 문자열 연결 ===
console.log("\n=== 문자열 연결 비교 ===");
const COUNT = 10000;

benchmark("+ 연결", () => {
  let s = "";
  for (let i = 0; i < COUNT; i++) s += "a";
});

benchmark("배열 join", () => {
  const parts = [];
  for (let i = 0; i < COUNT; i++) parts.push("a");
  parts.join("");
});

benchmark("템플릿 리터럴", () => {
  let s = "";
  for (let i = 0; i < COUNT; i++) s = `${s}a`;
});

// === 3. 객체 검색 최적화 ===
console.log("\n=== 검색 최적화 ===");
const data = Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  name: `user_${i}`,
}));

// 배열 검색 O(n)
benchmark("Array.find", () => {
  data.find(item => item.id === 9999);
});

// Map 검색 O(1)
const dataMap = new Map(data.map(item => [item.id, item]));
benchmark("Map.get", () => {
  dataMap.get(9999);
});

// Set 검색 O(1)
const idSet = new Set(data.map(item => item.id));
benchmark("Set.has", () => {
  idSet.has(9999);
});

// === 4. 메모이제이션 ===
console.log("\n=== 메모이제이션 ===");

function expensiveCalc(n) {
  let result = 0;
  for (let i = 0; i < n; i++) result += Math.sqrt(i);
  return result;
}

const cache = new Map();
function memoizedCalc(n) {
  if (cache.has(n)) return cache.get(n);
  const result = expensiveCalc(n);
  cache.set(n, result);
  return result;
}

benchmark("첫 실행", () => memoizedCalc(100000));
benchmark("캐시 히트", () => memoizedCalc(100000));

// === 5. 객체 복사 최적화 ===
console.log("\n=== 객체 복사 비교 ===");
const obj = { a: 1, b: { c: 2, d: [1, 2, 3] }, e: "hello" };

benchmark("JSON 복사", () => {
  JSON.parse(JSON.stringify(obj));
}, 10000);

benchmark("structuredClone", () => {
  structuredClone(obj);
}, 10000);

benchmark("spread (얕은)", () => {
  ({ ...obj, b: { ...obj.b } });
}, 10000);

// === 6. 이벤트 위임 (개념) ===
console.log("\n=== 이벤트 위임 (개념) ===");
console.log("  나쁜 예: 1000개 버튼에 각각 이벤트 리스너");
console.log("  좋은 예: 부모 1개에 리스너, e.target으로 판별");
console.log(`
  // 나쁜 예
  buttons.forEach(btn => btn.addEventListener('click', handler));

  // 좋은 예 (이벤트 위임)
  container.addEventListener('click', (e) => {
    if (e.target.matches('.btn')) handler(e);
  });`);

// === 7. 지연 로딩 패턴 ===
console.log("\n=== 지연 초기화 ===");
class LazyLoader {
  constructor(initFn) {
    this._initFn = initFn;
    this._value = undefined;
    this._initialized = false;
  }

  get value() {
    if (!this._initialized) {
      this._value = this._initFn();
      this._initialized = true;
      console.log("    (초기화 실행)");
    }
    return this._value;
  }
}

const heavyData = new LazyLoader(() => {
  return Array.from({ length: 1000 }, (_, i) => i * i);
});

console.log("  생성 시점: 아직 초기화 안됨");
console.log(`  첫 접근: 길이 = ${heavyData.value.length}`);
console.log(`  재접근: 길이 = ${heavyData.value.length}`);

// === 최적화 요약 ===
console.log("\n=== 최적화 요약 ===");
console.log("  1. 적절한 자료구조 선택 (Map/Set > Array 검색)");
console.log("  2. 메모이제이션으로 반복 계산 방지");
console.log("  3. 이벤트 위임으로 리스너 수 줄이기");
console.log("  4. 지연 로딩으로 불필요한 초기화 방지");
console.log("  5. 배치 DOM 업데이트 (DocumentFragment)");
console.log("  6. Web Worker로 무거운 연산 분리");
