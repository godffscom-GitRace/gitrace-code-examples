// [39] 이벤트 루프 - Event Loop
// 레벨: 5 | JavaScript의 비동기 실행 원리를 깊이 이해합니다

// === 콜 스택 (Call Stack) ===
// 함수 호출이 쌓이는 곳 (LIFO - 후입선출)
console.log("=== 1. 실행 순서 예측 ===");

console.log("1번: 동기 코드 시작");

setTimeout(() => {
  console.log("2번: setTimeout (매크로태스크)");
}, 0);

Promise.resolve().then(() => {
  console.log("3번: Promise (마이크로태스크)");
});

console.log("4번: 동기 코드 끝");

// 실행 순서: 1번 → 4번 → 3번 → 2번
// 동기 코드 → 마이크로태스크 → 매크로태스크

// === 태스크 큐 vs 마이크로태스크 큐 ===
console.log("\n=== 2. 태스크 우선순위 ===");

setTimeout(() => console.log("A: setTimeout 1"), 0);
setTimeout(() => console.log("B: setTimeout 2"), 0);

Promise.resolve()
  .then(() => console.log("C: Promise 1"))
  .then(() => console.log("D: Promise 2"));

Promise.resolve().then(() => console.log("E: Promise 3"));

// 순서: C → E → D → A → B
// 마이크로태스크가 모두 처리된 후 매크로태스크 실행

// === setTimeout vs Promise 심화 ===
console.log("\n=== 3. 중첩 비동기 ===");

setTimeout(() => {
  console.log("timeout 1");
  Promise.resolve().then(() => console.log("  → promise inside timeout"));
}, 0);

Promise.resolve().then(() => {
  console.log("promise 1");
  setTimeout(() => console.log("  → timeout inside promise"), 0);
});

// === queueMicrotask ===
console.log("\n=== 4. queueMicrotask ===");

console.log("시작");
queueMicrotask(() => console.log("마이크로태스크 1"));
queueMicrotask(() => console.log("마이크로태스크 2"));
setTimeout(() => console.log("매크로태스크"), 0);
console.log("끝");
// 시작 → 끝 → 마이크로태스크1 → 마이크로태스크2 → 매크로태스크

// === 실전 예시: 렌더링과 이벤트 루프 ===
// 브라우저에서는:
// 1. 콜 스택 비우기
// 2. 마이크로태스크 큐 비우기
// 3. 렌더링 (필요시)
// 4. 매크로태스크 하나 실행
// 5. 1번으로 돌아감
