// [24] 화살표 함수 - Arrow Functions
// 레벨: 2 | ES6의 화살표 함수를 학습합니다

// 기본 화살표 함수
const add = (a, b) => {
  return a + b;
};
console.log(add(3, 5)); // 8

// 암시적 반환 (한 줄일 때 중괄호, return 생략)
const multiply = (a, b) => a * b;
console.log(multiply(4, 3)); // 12

// 매개변수가 1개면 괄호 생략 가능
const double = x => x * 2;
console.log(double(7)); // 14

// function vs 화살표 함수 비교
function traditionalAdd(a, b) { return a + b; }
const arrowAdd = (a, b) => a + b;
// 둘 다 같은 결과
console.log(traditionalAdd(1, 2)); // 3
console.log(arrowAdd(1, 2));       // 3

// 배열 메서드와 함께 활용
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
console.log(doubled); // [2, 4, 6, 8, 10]
console.log(evens);   // [2, 4]

// this 바인딩 차이
const obj = {
  name: "김철수",
  // 일반 함수: this = obj
  sayHi: function() {
    console.log(`안녕! 나는 ${this.name}`);
  },
  // 화살표 함수: this = 상위 스코프
  sayHiArrow: () => {
    console.log(`this.name은 undefined: ${this.name}`);
  }
};
obj.sayHi();       // 안녕! 나는 김철수
obj.sayHiArrow();  // this.name은 undefined
