// [42] 배열과 튜플 - Arrays & Tuples
// 레벨: 1 | TypeScript에서 배열과 튜플을 다루는 방법을 학습합니다

// 배열 타입 지정 - 방법 1: 타입[]
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["김철수", "이영희", "박민수"];

// 배열 타입 지정 - 방법 2: Array<타입>
let scores: Array<number> = [85, 92, 78];

// numbers.push("문자열"); // Error! number만 가능
numbers.push(6); // OK

// 튜플 타입 - 고정 길이, 각 위치마다 타입 지정
let student: [string, number] = ["김철수", 25];
console.log(`${student[0]}, ${student[1]}살`);

// 튜플 구조 분해
let [name, age]: [string, number] = student;
console.log(`이름: ${name}, 나이: ${age}`);

// readonly 배열 - 수정 불가
let readonlyArr: readonly number[] = [1, 2, 3];
// readonlyArr.push(4);  // Error! readonly
// readonlyArr[0] = 10;  // Error! readonly

// 다차원 배열
let matrix: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

console.log("배열:", numbers);
console.log("이름들:", names);
console.log("행렬:", matrix);

// 배열 메서드도 타입 안전
const doubled = numbers.map((n: number): number => n * 2);
const evens = numbers.filter((n: number): boolean => n % 2 === 0);
console.log("2배:", doubled);
console.log("짝수:", evens);
