// [148] 커링 (Currying)
// 레벨: 4 | 다중 인자 함수를 단일 인자 함수 체인으로 변환합니다

// 기본 커링
function add(a) {
  return function (b) {
    return a + b;
  };
}

console.log("=== 기본 커링 ===");
console.log(`  add(2)(3) = ${add(2)(3)}`);
const add10 = add(10);
console.log(`  add10(5) = ${add10(5)}`);
console.log(`  add10(20) = ${add10(20)}`);

// 화살표 함수로 간결하게
const multiply = (a) => (b) => a * b;
const double = multiply(2);
const triple = multiply(3);

console.log("\n=== 화살표 커링 ===");
console.log(`  double(5) = ${double(5)}`);
console.log(`  triple(5) = ${triple(5)}`);

// 범용 curry 함수
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function (...args2) {
      return curried.apply(this, args.concat(args2));
    };
  };
}

// 3개 인자 함수 커링
function sum3(a, b, c) {
  return a + b + c;
}

const curriedSum = curry(sum3);
console.log("\n=== 범용 curry ===");
console.log(`  sum3(1,2,3) = ${curriedSum(1, 2, 3)}`);
console.log(`  sum3(1)(2)(3) = ${curriedSum(1)(2)(3)}`);
console.log(`  sum3(1,2)(3) = ${curriedSum(1, 2)(3)}`);
console.log(`  sum3(1)(2,3) = ${curriedSum(1)(2, 3)}`);

// 실전 활용: 로거
const log = curry((level, date, message) => {
  console.log(`  [${level}] ${date}: ${message}`);
});

console.log("\n=== 커링 로거 ===");
const errorLog = log("ERROR");
const todayError = errorLog("2026-02-17");

todayError("서버 연결 실패");
todayError("DB 타임아웃");
log("INFO")("2026-02-17")("앱 시작");

// 실전 활용: 필터링
const filter = curry((predicate, arr) => arr.filter(predicate));
const map = curry((fn, arr) => arr.map(fn));

const isEven = (n) => n % 2 === 0;
const getEvens = filter(isEven);
const doubleAll = map((n) => n * 2);

console.log("\n=== 커링 배열 처리 ===");
const nums = [1, 2, 3, 4, 5, 6, 7, 8];
console.log(`  원본: [${nums}]`);
console.log(`  짝수: [${getEvens(nums)}]`);
console.log(`  2배:  [${doubleAll(nums)}]`);

// 파이프라인 (함수 합성)
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

const processNumbers = pipe(
  filter((n) => n > 2),
  map((n) => n * 10),
  filter((n) => n < 60)
);

console.log(`  파이프: [${processNumbers(nums)}]`);

// 실전 활용: API URL 빌더
const buildURL = curry((base, path, params) => {
  const query = new URLSearchParams(params).toString();
  return `${base}${path}${query ? "?" + query : ""}`;
});

console.log("\n=== 커링 URL 빌더 ===");
const apiURL = buildURL("https://api.example.com");
const usersURL = apiURL("/users");

console.log(`  ${usersURL({ page: 1, limit: 10 })}`);
console.log(`  ${usersURL({ id: 42 })}`);
console.log(`  ${apiURL("/products")({ category: "books" })}`);

// 부분 적용 (Partial Application) vs 커링
console.log("\n=== 부분 적용 vs 커링 ===");
function partial(fn, ...presetArgs) {
  return function (...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  };
}

function greet(greeting, name, punctuation) {
  return `${greeting}, ${name}${punctuation}`;
}

const sayHello = partial(greet, "안녕하세요");
console.log(`  부분 적용: ${sayHello("홍길동", "!")}`);

const curriedGreet = curry(greet);
console.log(`  커링: ${curriedGreet("안녕하세요")("홍길동")("!")}`);
