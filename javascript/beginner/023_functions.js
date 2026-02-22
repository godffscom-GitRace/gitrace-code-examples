// [23] 함수 정의 (function) - Functions
// 레벨: 1 | JavaScript 함수의 기본을 배웁니다

// function 키워드로 함수 정의
function greet(name) {
  return `안녕하세요, ${name}님!`;
}
console.log(greet("철수")); // 안녕하세요, 철수님!

// 매개변수와 인자
function add(a, b) {
  return a + b;
}
console.log(add(3, 5)); // 8

// 기본값 매개변수
function introduce(name, age = 20) {
  return `${name}, ${age}살`;
}
console.log(introduce("영희"));      // 영희, 20살
console.log(introduce("민수", 25));   // 민수, 25살

// return 문
function isAdult(age) {
  if (age >= 18) {
    return true;
  }
  return false;
}
console.log(isAdult(20)); // true
console.log(isAdult(15)); // false

// 여러 값 반환 (객체로)
function calcStats(numbers) {
  const sum = numbers.reduce((a, b) => a + b, 0);
  const avg = sum / numbers.length;
  return { sum, avg };
}

const scores = [85, 92, 78, 95, 88];
const result = calcStats(scores);
console.log(`합계: ${result.sum}, 평균: ${result.avg}`);
