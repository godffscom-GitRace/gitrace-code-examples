// [141] Map과 WeakMap (Map & WeakMap)
// 레벨: 3 | Map과 WeakMap의 차이점과 활용법을 이해합니다

// === Map 기본 ===
console.log("=== Map 기본 ===");
const map = new Map();
map.set("name", "김철수");
map.set("age", 28);
map.set(true, "불리언 키도 가능");
map.set({ key: 1 }, "객체 키도 가능");

console.log(`  크기: ${map.size}`);
console.log(`  name: ${map.get("name")}`);
console.log(`  age 있음: ${map.has("age")}`);

// 초기화와 함께 생성
const fruits = new Map([
  ["사과", 1500],
  ["바나나", 3000],
  ["딸기", 5000],
]);

console.log("\n=== Map 순회 ===");
// for...of
for (const [key, value] of fruits) {
  console.log(`  ${key}: ${value.toLocaleString()}원`);
}

// forEach
console.log("  forEach:");
fruits.forEach((val, key) => console.log(`    ${key} = ${val}`));

// keys, values, entries
console.log(`  키: [${[...fruits.keys()]}]`);
console.log(`  값: [${[...fruits.values()]}]`);

// === Map vs Object ===
console.log("\n=== Map vs Object ===");
console.log("  Map: 모든 타입 키, 순서 보장, size, 순회 편리");
console.log("  Object: 문자열/Symbol 키, 프로토타입 체인, JSON 호환");

// Map은 어떤 타입이든 키로 사용 가능
const funcMap = new Map();
const fn = () => {};
funcMap.set(fn, "함수를 키로 사용!");
console.log(`\n  함수 키: ${funcMap.get(fn)}`);

// === 활용: 빈도수 카운터 ===
console.log("\n=== 빈도수 카운터 ===");
function countFreq(arr) {
  const freq = new Map();
  for (const item of arr) {
    freq.set(item, (freq.get(item) || 0) + 1);
  }
  return freq;
}

const votes = ["찬성", "반대", "찬성", "기권", "찬성", "반대"];
const voteResult = countFreq(votes);
for (const [vote, count] of voteResult) {
  console.log(`  ${vote}: ${"█".repeat(count)} (${count}표)`);
}

// === 활용: LRU Cache ===
console.log("\n=== LRU Cache (Map 활용) ===");
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value); // 맨 뒤로 이동
    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) this.cache.delete(key);
    this.cache.set(key, value);
    if (this.cache.size > this.capacity) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey); // 가장 오래된 제거
    }
  }

  show() {
    return [...this.cache.entries()].map(([k, v]) => `${k}:${v}`).join(" → ");
  }
}

const cache = new LRUCache(3);
cache.put("a", 1); console.log(`  put(a,1): ${cache.show()}`);
cache.put("b", 2); console.log(`  put(b,2): ${cache.show()}`);
cache.put("c", 3); console.log(`  put(c,3): ${cache.show()}`);
cache.get("a");     console.log(`  get(a):   ${cache.show()}`);
cache.put("d", 4);  console.log(`  put(d,4): ${cache.show()}`);

// === WeakMap ===
console.log("\n=== WeakMap ===");
// WeakMap: 객체만 키, 약한 참조 → GC 허용
const privateData = new WeakMap();

class User {
  constructor(name, password) {
    this.name = name;
    privateData.set(this, { password }); // 비공개 데이터
  }

  checkPassword(input) {
    return privateData.get(this).password === input;
  }
}

const user = new User("홍길동", "secret123");
console.log(`  이름: ${user.name}`);
console.log(`  비밀번호 직접 접근: ${user.password}`); // undefined
console.log(`  비밀번호 확인: ${user.checkPassword("secret123")}`);

// WeakMap 활용: DOM 요소 메타데이터 (개념)
console.log("\n=== WeakMap 활용 예시 ===");
const metadata = new WeakMap();
let element = { tagName: "div", id: "app" }; // DOM 요소 대신 객체
metadata.set(element, { clicks: 0, created: new Date() });
console.log(`  요소 메타: ${JSON.stringify(metadata.get(element))}`);

console.log("\n=== Map vs WeakMap 비교 ===");
console.log("  Map: 모든 타입 키, 순회 가능, size, 강한 참조");
console.log("  WeakMap: 객체만 키, 순회 불가, size 없음, 약한 참조(GC)");
