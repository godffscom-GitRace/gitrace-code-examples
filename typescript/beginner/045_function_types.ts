// [45] 함수 타입 - Function Types
// 레벨: 2 | TypeScript에서 함수의 타입을 정의합니다

// 매개변수 타입과 반환 타입
function add(a: number, b: number): number {
  return a + b;
}

function greet(name: string): string {
  return `안녕하세요, ${name}님!`;
}

console.log(add(3, 5));       // 8
console.log(greet("철수"));   // 안녕하세요, 철수님!

// 반환 타입 void - 반환값 없음
function log(message: string): void {
  console.log(`[LOG] ${message}`);
}

// 선택적 매개변수 (?)
function introduce(name: string, age?: number): string {
  if (age !== undefined) {
    return `${name}, ${age}살`;
  }
  return name;
}

console.log(introduce("철수"));      // 철수
console.log(introduce("영희", 25));  // 영희, 25살

// 기본값 매개변수
function createUser(name: string, role: string = "user"): string {
  return `${name} (${role})`;
}

console.log(createUser("철수"));          // 철수 (user)
console.log(createUser("영희", "admin")); // 영희 (admin)

// 함수 오버로드 - 입력에 따라 다른 반환 타입
function process(input: string): string;
function process(input: number): number;
function process(input: string | number): string | number {
  if (typeof input === "string") {
    return input.toUpperCase();
  }
  return input * 2;
}

console.log(process("hello")); // "HELLO"
console.log(process(10));      // 20

// 나머지 매개변수
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}

console.log(`합계: ${sum(1, 2, 3, 4, 5)}`); // 15
