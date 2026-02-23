// [28] 구조 분해 할당 - Destructuring
// 레벨: 2 | ES6의 구조 분해 할당으로 코드를 간결하게 작성합니다

// 배열 구조 분해
const colors = ["빨강", "파랑", "초록"];
const [red, blue, green] = colors;
console.log(red);   // "빨강"
console.log(blue);  // "파랑"

// 일부만 가져오기
const [first, , third] = colors;
console.log(first, third); // "빨강" "초록"

// 객체 구조 분해
const user = { name: "김철수", age: 25, city: "서울" };
const { name, age, city } = user;
console.log(`${name}, ${age}살, ${city}`);

// 변수명 변경
const { name: userName, age: userAge } = user;
console.log(userName, userAge); // "김철수" 25

// 기본값 설정
const { name: n, job = "학생" } = user;
console.log(`${n}의 직업: ${job}`); // 김철수의 직업: 학생

// 나머지 패턴 (...)
const [head, ...tail] = [1, 2, 3, 4, 5];
console.log(head); // 1
console.log(tail); // [2, 3, 4, 5]

const { city: c, ...rest } = user;
console.log(c);    // "서울"
console.log(rest); // { name: "김철수", age: 25 }

// 함수 매개변수에서 구조 분해
function introduce({ name, age, city = "미정" }) {
  console.log(`${name}(${age}살) - ${city}`);
}
introduce(user); // 김철수(25살) - 서울
