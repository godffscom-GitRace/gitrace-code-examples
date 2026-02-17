// [29] 스프레드 연산자 - Spread Operator
// 레벨: 3 | 스프레드 연산자로 배열과 객체를 다룹니다

// 배열 복사
const original = [1, 2, 3];
const copy = [...original];
copy.push(4);
console.log("원본:", original); // [1, 2, 3] (변경 없음)
console.log("복사:", copy);     // [1, 2, 3, 4]

// 배열 병합
const front = ["사과", "바나나"];
const back = ["딸기", "포도"];
const all = [...front, "망고", ...back];
console.log("병합:", all); // ["사과", "바나나", "망고", "딸기", "포도"]

// 객체 복사
const user = { name: "김철수", age: 25 };
const userCopy = { ...user };
console.log("객체 복사:", userCopy);

// 객체 병합 (뒤에 있는 값이 우선)
const defaults = { theme: "light", lang: "ko", fontSize: 14 };
const settings = { theme: "dark", fontSize: 16 };
const merged = { ...defaults, ...settings };
console.log("병합:", merged); // { theme: "dark", lang: "ko", fontSize: 16 }

// 객체 속성 추가/덮어쓰기
const updated = { ...user, age: 26, city: "서울" };
console.log("업데이트:", updated);

// 함수 인자 전달
function sum(a, b, c) {
  return a + b + c;
}
const nums = [10, 20, 30];
console.log("합계:", sum(...nums)); // 60

// 나머지 매개변수 (rest)
function total(...numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}
console.log("전체 합:", total(1, 2, 3, 4, 5)); // 15
