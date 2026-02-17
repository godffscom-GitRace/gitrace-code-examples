// [159] 정규 표현식 마스터 (Regex Master)
// 레벨: 4 | 정규 표현식을 활용한 고급 문자열 처리를 마스터합니다

// === 기본 메서드 ===
console.log("=== 기본 메서드 ===");

// test() - 매칭 여부
console.log(`  /hello/.test("hello world"): ${/hello/.test("hello world")}`);
console.log(`  /\\d+/.test("abc123"): ${/\d+/.test("abc123")}`);

// match() - 매칭 결과
const str = "The price is $25.50 and $30.00";
console.log(`  match: ${str.match(/\$[\d.]+/g)}`);

// replace()
console.log(`  replace: ${"Hello World".replace(/world/i, "JavaScript")}`);

// search()
console.log(`  search: ${"abc123def".search(/\d+/)}`); // 3

// === 자주 쓰는 패턴 ===
console.log("\n=== 유효성 검사 ===");

const validators = {
  이메일: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  전화번호: /^01[0-9]-?\d{3,4}-?\d{4}$/,
  비밀번호: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  URL: /^https?:\/\/(www\.)?[\w.-]+\.[a-z]{2,}(\/[\w.-]*)*\/?$/,
  한글만: /^[가-힣]+$/,
  숫자만: /^\d+$/,
};

const testCases = {
  이메일: ["test@example.com", "invalid@", "user@co.kr"],
  전화번호: ["010-1234-5678", "01012345678", "02-123"],
  비밀번호: ["Abc123!@", "weak", "Strong1!pass"],
  한글만: ["안녕하세요", "hello", "안녕123"],
};

for (const [name, cases] of Object.entries(testCases)) {
  console.log(`\n  ${name}:`);
  for (const c of cases) {
    const valid = validators[name].test(c);
    console.log(`    [${valid ? "O" : "X"}] "${c}"`);
  }
}

// === 캡처 그룹 ===
console.log("\n=== 캡처 그룹 ===");

// 날짜 파싱
const dateStr = "2026-02-17";
const dateMatch = dateStr.match(/(\d{4})-(\d{2})-(\d{2})/);
if (dateMatch) {
  console.log(`  전체: ${dateMatch[0]}`);
  console.log(`  년: ${dateMatch[1]}, 월: ${dateMatch[2]}, 일: ${dateMatch[3]}`);
}

// 명명된 캡처 그룹
const named = "홍길동 (28세, 서울)".match(/(?<name>\S+)\s+\((?<age>\d+)세,\s+(?<city>\S+)\)/);
if (named) {
  console.log(`\n  이름: ${named.groups.name}`);
  console.log(`  나이: ${named.groups.age}`);
  console.log(`  도시: ${named.groups.city}`);
}

// === Lookahead / Lookbehind ===
console.log("\n=== Lookahead / Lookbehind ===");

// Positive lookahead (?=...) - 뒤에 있으면 매치
const prices = "100원 $200 300원 $400";
console.log(`  원화만: ${prices.match(/\d+(?=원)/g)}`);  // [100, 300]

// Negative lookahead (?!...) - 뒤에 없으면 매치
console.log(`  원화 아닌: ${prices.match(/\d+(?!원|\d)/g)}`);

// Positive lookbehind (?<=...)
console.log(`  달러만: ${prices.match(/(?<=\$)\d+/g)}`);  // [200, 400]

// === 고급 replace ===
console.log("\n=== 고급 replace ===");

// 함수로 replace
const template = "Hello {name}, you are {age} years old!";
const data = { name: "홍길동", age: 28 };
const result = template.replace(/\{(\w+)\}/g, (match, key) => data[key] || match);
console.log(`  템플릿: ${result}`);

// 카멜케이스 ↔ 스네이크케이스
function camelToSnake(str) {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

function snakeToCamel(str) {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

console.log(`  camelToSnake: ${camelToSnake("getUserName")}`);
console.log(`  snakeToCamel: ${snakeToCamel("get_user_name")}`);

// 천 단위 콤마
function addCommas(num) {
  return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
console.log(`  천단위: ${addCommas(1234567890)}`);

// === matchAll ===
console.log("\n=== matchAll ===");
const text = "email1: test@abc.com, email2: user@xyz.org";
const emailRegex = /[\w.]+@[\w.]+\.\w+/g;

for (const match of text.matchAll(emailRegex)) {
  console.log(`  ${match[0]} (위치: ${match.index})`);
}

// HTML 태그 추출
const html = '<a href="url1">링크1</a> 텍스트 <a href="url2">링크2</a>';
const tagRegex = /<a href="([^"]+)">([^<]+)<\/a>/g;
for (const m of html.matchAll(tagRegex)) {
  console.log(`  URL: ${m[1]}, 텍스트: ${m[2]}`);
}

// === 정규식 플래그 ===
console.log("\n=== 플래그 정리 ===");
console.log("  g - 전역 검색 (모두 찾기)");
console.log("  i - 대소문자 무시");
console.log("  m - 멀티라인 (^$ 줄 단위)");
console.log("  s - dotAll (.이 줄바꿈도 매치)");
console.log("  u - 유니코드");
console.log("  d - 인덱스 정보 포함");
