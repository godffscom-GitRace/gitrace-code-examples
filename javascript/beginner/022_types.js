// [22] 자료형과 형변환 - Types & Conversion
// 레벨: 1 | JavaScript의 자료형과 타입 변환을 학습합니다

// 기본 타입 (number, string, boolean)
const num = 42;
const str = "Hello";
const bool = true;

// typeof 연산자
console.log(typeof num);   // "number"
console.log(typeof str);   // "string"
console.log(typeof bool);  // "boolean"

// null vs undefined
let empty = null;           // 의도적으로 비움
let notDefined;             // 선언만 함 (undefined)
console.log(typeof empty);      // "object" (JS의 유명한 버그)
console.log(typeof notDefined); // "undefined"
console.log(empty == notDefined);  // true (값만 비교)
console.log(empty === notDefined); // false (타입도 비교)

// 형변환 - Number()
console.log(Number("123"));    // 123
console.log(Number("abc"));    // NaN
console.log(Number(true));     // 1
console.log(Number(false));    // 0

// 형변환 - String()
console.log(String(123));      // "123"
console.log(String(true));     // "true"
console.log(String(null));     // "null"

// 자동 형변환 (주의!)
console.log("5" + 3);    // "53" (문자열 연결)
console.log("5" - 3);    // 2   (숫자 연산)
console.log("5" * 2);    // 10  (숫자 연산)
console.log(Boolean(0));  // false
console.log(Boolean(""));  // false
console.log(Boolean("hello")); // true
