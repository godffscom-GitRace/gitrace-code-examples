// [34] this 바인딩 - this Binding
// 레벨: 4 | JavaScript의 this 동작 방식을 완벽히 이해합니다

// 1. 객체 메서드에서의 this
const user = {
  name: "김철수",
  greet() {
    console.log(`안녕, ${this.name}!`); // this = user 객체
  },
};
user.greet(); // 안녕, 김철수!

// 2. 일반 함수에서의 this (엄격 모드)
"use strict";
function showThis() {
  console.log("일반 함수 this:", this); // undefined (strict mode)
}

// 3. call() - this를 지정하여 호출
function introduce(greeting) {
  console.log(`${greeting}, 저는 ${this.name}입니다.`);
}

const person1 = { name: "영희" };
const person2 = { name: "민수" };

introduce.call(person1, "안녕하세요"); // 안녕하세요, 저는 영희입니다.
introduce.call(person2, "반갑습니다"); // 반갑습니다, 저는 민수입니다.

// 4. apply() - 인자를 배열로 전달
function sum(a, b, c) {
  console.log(`${this.label}: ${a + b + c}`);
}
const calc = { label: "합계" };
sum.apply(calc, [10, 20, 30]); // 합계: 60

// 5. bind() - this가 고정된 새 함수 생성
const boundGreet = introduce.bind(person1);
boundGreet("하이"); // 하이, 저는 영희입니다.

// 6. 화살표 함수의 this - 상위 스코프의 this를 사용
const team = {
  name: "개발팀",
  members: ["철수", "영희", "민수"],
  showMembers() {
    // 화살표 함수는 team의 this를 그대로 사용
    this.members.forEach((member) => {
      console.log(`${this.name}: ${member}`);
    });
  },
};
team.showMembers();
// 개발팀: 철수
// 개발팀: 영희
// 개발팀: 민수

// 일반 함수 vs 화살표 함수 비교
const obj = {
  value: 42,
  regular: function () {
    return this.value; // this = obj
  },
  arrow: () => {
    return this.value; // this = 상위 스코프 (전역)
  },
};
console.log("regular:", obj.regular()); // 42
console.log("arrow:", obj.arrow()); // undefined
