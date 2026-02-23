// [21] 변수 선언 (let, const, var) - Variables
// 레벨: 1 | JavaScript의 변수 선언 방법과 차이점을 배웁니다

// let - 재할당 가능, 블록 스코프
let age = 25;
age = 26; // 재할당 OK
console.log(`나이: ${age}`);

// const - 재할당 불가, 블록 스코프
const name = "김철수";
// name = "이영희"; // TypeError: Assignment to constant variable
console.log(`이름: ${name}`);

// var - 재할당 가능, 함수 스코프 (사용 비추천)
var score = 90;
score = 95;

// 블록 스코프 차이
if (true) {
  let blockLet = "let은 블록 안에서만";
  const blockConst = "const도 블록 안에서만";
  var blockVar = "var는 블록 밖에서도 접근 가능";
}
// console.log(blockLet);   // ReferenceError
// console.log(blockConst); // ReferenceError
console.log(blockVar);      // "var는 블록 밖에서도 접근 가능"

// 호이스팅
console.log(hoisted);    // undefined (var는 호이스팅됨)
// console.log(notHoisted); // ReferenceError (let은 TDZ)
var hoisted = "호이스팅됨";
let notHoisted = "호이스팅 안됨";

// const 객체/배열은 내부 수정 가능
const fruits = ["사과", "바나나"];
fruits.push("딸기"); // OK (배열 내용 변경)
console.log(fruits);  // ["사과", "바나나", "딸기"]
