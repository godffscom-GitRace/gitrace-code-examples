// [140] Set과 WeakSet (Set & WeakSet)
// 레벨: 3 | JavaScript의 Set과 WeakSet을 활용하는 방법을 배웁니다

// === Set 기본 ===
console.log("=== Set 기본 ===");
const set = new Set();
set.add(1);
set.add(2);
set.add(3);
set.add(2); // 중복 무시
set.add(1); // 중복 무시

console.log(`  Set: {${[...set]}}`);
console.log(`  크기: ${set.size}`);
console.log(`  2 포함?: ${set.has(2)}`);

set.delete(2);
console.log(`  2 삭제 후: {${[...set]}}`);

// 배열에서 중복 제거
console.log("\n=== 중복 제거 ===");
const arr = [1, 2, 3, 2, 4, 3, 5, 1, 6];
const unique = [...new Set(arr)];
console.log(`  원본: [${arr}]`);
console.log(`  중복 제거: [${unique}]`);

// 문자열 중복 문자 제거
const str = "abracadabra";
const uniqueChars = [...new Set(str)].join("");
console.log(`  "${str}" → "${uniqueChars}"`);

// === 집합 연산 ===
console.log("\n=== 집합 연산 ===");
const A = new Set([1, 2, 3, 4, 5]);
const B = new Set([3, 4, 5, 6, 7]);
console.log(`  A: {${[...A]}}`);
console.log(`  B: {${[...B]}}`);

// 합집합
const union = new Set([...A, ...B]);
console.log(`  A ∪ B: {${[...union]}}`);

// 교집합
const intersection = new Set([...A].filter(x => B.has(x)));
console.log(`  A ∩ B: {${[...intersection]}}`);

// 차집합
const difference = new Set([...A].filter(x => !B.has(x)));
console.log(`  A - B: {${[...difference]}}`);

// 대칭 차집합
const symDiff = new Set([...A].filter(x => !B.has(x)).concat([...B].filter(x => !A.has(x))));
console.log(`  A △ B: {${[...symDiff]}}`);

// 부분집합 확인
const isSubset = (sub, sup) => [...sub].every(x => sup.has(x));
const C = new Set([3, 4]);
console.log(`  {${[...C]}} ⊂ A?: ${isSubset(C, A)}`);

// === Set 순회 ===
console.log("\n=== Set 순회 ===");
const fruits = new Set(["사과", "바나나", "딸기"]);
fruits.forEach(f => console.log(`  - ${f}`));

// for...of
console.log("  for...of:");
for (const f of fruits) console.log(`    ${f}`);

// === 활용: 방문 추적 ===
console.log("\n=== 방문 추적 ===");
const visited = new Set();
const pages = ["/home", "/about", "/home", "/product", "/about", "/cart"];
for (const page of pages) {
  if (!visited.has(page)) {
    visited.add(page);
    console.log(`  첫 방문: ${page}`);
  } else {
    console.log(`  재방문: ${page}`);
  }
}
console.log(`  고유 페이지: ${visited.size}개`);

// === WeakSet ===
console.log("\n=== WeakSet ===");
// WeakSet은 객체만 저장, 약한 참조 → 가비지 컬렉션 허용
const weakSet = new WeakSet();

let obj1 = { name: "객체1" };
let obj2 = { name: "객체2" };

weakSet.add(obj1);
weakSet.add(obj2);

console.log(`  obj1 포함: ${weakSet.has(obj1)}`); // true
console.log(`  obj2 포함: ${weakSet.has(obj2)}`); // true

// WeakSet 활용: 한 번만 실행
const processed = new WeakSet();
function processOnce(obj) {
  if (processed.has(obj)) {
    console.log(`  ${obj.id}: 이미 처리됨`);
    return;
  }
  processed.add(obj);
  console.log(`  ${obj.id}: 처리 완료`);
}

console.log("\n  1회 실행 보장:");
const task = { id: "TASK-001" };
processOnce(task); // 처리 완료
processOnce(task); // 이미 처리됨

console.log("\n=== Set vs WeakSet 비교 ===");
console.log("  Set: 모든 값, 순회 가능, size 있음, 강한 참조");
console.log("  WeakSet: 객체만, 순회 불가, size 없음, 약한 참조(GC 허용)");
