// [26] 배열 메서드 (map, filter, reduce) - Array Methods
// 레벨: 2 | 배열의 고차 함수들을 마스터합니다

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// map() - 배열 변환 (각 요소를 변환한 새 배열)
const doubled = numbers.map(n => n * 2);
console.log("map:", doubled); // [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

// filter() - 조건 필터링 (조건에 맞는 요소만)
const evens = numbers.filter(n => n % 2 === 0);
console.log("filter:", evens); // [2, 4, 6, 8, 10]

// reduce() - 값 축약 (하나의 값으로 합치기)
const sum = numbers.reduce((acc, cur) => acc + cur, 0);
console.log("reduce:", sum); // 55

// forEach() - 순회 (반환값 없음)
console.log("forEach:");
numbers.forEach(n => process.stdout.write(`${n} `));
console.log();

// 실전 예제: 학생 성적 처리
const students = [
  { name: "김철수", score: 85 },
  { name: "이영희", score: 92 },
  { name: "박민수", score: 68 },
  { name: "정다은", score: 95 },
  { name: "최지훈", score: 74 }
];

// 80점 이상인 학생 이름만 추출
const passed = students
  .filter(s => s.score >= 80)
  .map(s => s.name);
console.log("합격자:", passed); // ["김철수", "이영희", "정다은"]

// 평균 점수 계산
const avg = students.reduce((sum, s) => sum + s.score, 0) / students.length;
console.log(`평균: ${avg.toFixed(1)}점`);
