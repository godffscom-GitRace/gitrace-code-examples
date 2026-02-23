// [25] 배열 기초 - Array Basics
// 레벨: 2 | JavaScript 배열의 기본 메서드를 학습합니다

// 배열 생성과 접근
const fruits = ["사과", "바나나", "딸기"];
console.log(fruits[0]);          // "사과"
console.log(fruits[fruits.length - 1]); // "딸기"

// push(), pop() - 뒤에서 추가/제거
fruits.push("포도");
console.log(fruits); // ["사과", "바나나", "딸기", "포도"]

const last = fruits.pop();
console.log(last);   // "포도"

// unshift(), shift() - 앞에서 추가/제거
fruits.unshift("망고");
console.log(fruits); // ["망고", "사과", "바나나", "딸기"]

const first = fruits.shift();
console.log(first);  // "망고"

// length 속성
console.log(`과일 개수: ${fruits.length}`); // 3

// 배열 순회
console.log("\n=== for 반복문 ===");
for (let i = 0; i < fruits.length; i++) {
  console.log(`${i + 1}. ${fruits[i]}`);
}

console.log("\n=== for...of ===");
for (const fruit of fruits) {
  console.log(fruit);
}

console.log("\n=== forEach ===");
fruits.forEach((fruit, index) => {
  console.log(`[${index}] ${fruit}`);
});

// 배열 검색
console.log(fruits.includes("바나나")); // true
console.log(fruits.indexOf("딸기"));    // 2
