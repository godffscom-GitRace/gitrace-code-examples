// [38] 모듈 (import/export) - ES6 Modules
// 레벨: 4 | ES6 모듈 시스템을 사용해 코드를 구조화합니다
// ※ 실제 사용 시 .mjs 확장자 또는 package.json에 "type": "module" 필요

// === export 방식들 ===

// 1. named export - 이름으로 내보내기
// math.js
// export function add(a, b) { return a + b; }
// export function subtract(a, b) { return a - b; }
// export const PI = 3.14159;

// 2. default export - 기본 내보내기 (파일당 하나)
// calculator.js
// export default class Calculator { ... }

// 3. 한 번에 내보내기
// export { add, subtract, PI };

// === import 방식들 ===

// named import
// import { add, subtract } from './math.js';

// default import
// import Calculator from './calculator.js';

// 별칭 사용
// import { add as plus } from './math.js';

// 전체 가져오기
// import * as MathUtils from './math.js';
// MathUtils.add(1, 2);

// === 실행 가능한 모듈 패턴 데모 ===
console.log("=== 모듈 패턴 데모 ===");

// 모듈 시뮬레이션 - 즉시 실행 함수
const MathModule = (function () {
  // private
  const _PI = 3.14159;

  // public API (named export 역할)
  return {
    PI: _PI,
    add(a, b) {
      return a + b;
    },
    subtract(a, b) {
      return a - b;
    },
    circleArea(r) {
      return _PI * r * r;
    },
  };
})();

console.log(MathModule.add(10, 5)); // 15
console.log(MathModule.PI); // 3.14159
console.log(`원 넓이(r=5): ${MathModule.circleArea(5).toFixed(2)}`);

// default export 시뮬레이션
const StringUtils = (function () {
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  function reverse(str) {
    return str.split("").reverse().join("");
  }
  function truncate(str, len) {
    return str.length > len ? str.slice(0, len) + "..." : str;
  }

  return { capitalize, reverse, truncate };
})();

console.log(StringUtils.capitalize("hello")); // Hello
console.log(StringUtils.reverse("abcde")); // edcba
console.log(StringUtils.truncate("긴 문자열입니다", 5)); // 긴 문자열...

// 모듈 조합
const app = {
  math: MathModule,
  string: StringUtils,
};
console.log(`\n합계: ${app.math.add(1, 2)}`);
console.log(`반전: ${app.string.reverse("JavaScript")}`);
