// [152] Iterator와 Generator (Iterator & Generator)
// 레벨: 5 | Generator로 커스텀 반복 가능 객체를 만듭니다

// === Iterator 프로토콜 ===
console.log("=== 커스텀 Iterator ===");

function createCounter(start, end) {
  return {
    [Symbol.iterator]() {
      let current = start;
      return {
        next() {
          if (current <= end) {
            return { value: current++, done: false };
          }
          return { done: true };
        }
      };
    }
  };
}

const counter = createCounter(1, 5);
console.log(`  for...of: [${[...counter]}]`);

// 수동 반복
const iter = createCounter(10, 12)[Symbol.iterator]();
console.log(`  next(): ${JSON.stringify(iter.next())}`);
console.log(`  next(): ${JSON.stringify(iter.next())}`);
console.log(`  next(): ${JSON.stringify(iter.next())}`);
console.log(`  next(): ${JSON.stringify(iter.next())}`);

// === Generator 기본 ===
console.log("\n=== Generator 기본 ===");

function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = numberGenerator();
console.log(`  ${JSON.stringify(gen.next())}`);
console.log(`  ${JSON.stringify(gen.next())}`);
console.log(`  ${JSON.stringify(gen.next())}`);
console.log(`  ${JSON.stringify(gen.next())}`);

// spread, 구조분해
console.log(`  spread: [${[...numberGenerator()]}]`);
const [a, b] = numberGenerator();
console.log(`  구조분해: a=${a}, b=${b}`);

// === 무한 시퀀스 ===
console.log("\n=== 무한 시퀀스 ===");

function* infiniteCounter(start = 0) {
  let n = start;
  while (true) {
    yield n++;
  }
}

// take 유틸리티
function take(gen, count) {
  const result = [];
  for (const val of gen) {
    result.push(val);
    if (result.length >= count) break;
  }
  return result;
}

console.log(`  무한 카운터(0~): [${take(infiniteCounter(), 5)}]`);
console.log(`  무한 카운터(100~): [${take(infiniteCounter(100), 3)}]`);

// 피보나치 무한 생성
function* fibonacci() {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

console.log(`  피보나치: [${take(fibonacci(), 10)}]`);

// === yield로 값 주고받기 ===
console.log("\n=== yield 양방향 통신 ===");

function* conversation() {
  const name = yield "이름이 무엇인가요?";
  const age = yield `${name}님, 나이가 어떻게 되나요?`;
  yield `${name}님은 ${age}살이군요!`;
}

const chat = conversation();
console.log(`  Q: ${chat.next().value}`);
console.log(`  Q: ${chat.next("홍길동").value}`);
console.log(`  A: ${chat.next(25).value}`);

// === yield* 위임 ===
console.log("\n=== yield* 위임 ===");

function* inner() {
  yield "a";
  yield "b";
}

function* outer() {
  yield 1;
  yield* inner();  // inner에 위임
  yield 2;
}

console.log(`  위임: [${[...outer()]}]`);

// 트리 순회 (Generator)
function* traverse(node) {
  if (!node) return;
  yield node.val;
  yield* traverse(node.left);
  yield* traverse(node.right);
}

const tree = {
  val: 1,
  left: { val: 2, left: { val: 4, left: null, right: null }, right: { val: 5, left: null, right: null } },
  right: { val: 3, left: null, right: { val: 6, left: null, right: null } },
};

console.log(`  트리 전위 순회: [${[...traverse(tree)]}]`);

// === 실전 활용 ===
console.log("\n=== 실전: ID 생성기 ===");

function* idGenerator(prefix = "ID") {
  let id = 1;
  while (true) {
    yield `${prefix}-${String(id++).padStart(4, "0")}`;
  }
}

const userIds = idGenerator("USER");
const orderIds = idGenerator("ORD");
console.log(`  ${userIds.next().value}`);
console.log(`  ${userIds.next().value}`);
console.log(`  ${orderIds.next().value}`);

// 범위 생성기
function* range(start, end, step = 1) {
  for (let i = start; i <= end; i += step) {
    yield i;
  }
}

console.log(`\n  range(0,10,2): [${[...range(0, 10, 2)]}]`);
console.log(`  range(1,5): [${[...range(1, 5)]}]`);

// 파이프라인 (lazy evaluation)
console.log("\n=== 지연 평가 파이프라인 ===");

function* filter(iterable, predicate) {
  for (const item of iterable) {
    if (predicate(item)) yield item;
  }
}

function* map(iterable, fn) {
  for (const item of iterable) {
    yield fn(item);
  }
}

// 1~100 중 짝수만 → 제곱 → 처음 5개
const pipeline = take(
  map(
    filter(range(1, 100), n => n % 2 === 0),
    n => n * n
  ),
  5
);
console.log(`  짝수 제곱 5개: [${pipeline}]`);
