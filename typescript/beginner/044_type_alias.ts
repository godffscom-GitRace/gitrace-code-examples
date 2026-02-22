// [44] 타입 별칭 (type) - Type Alias
// 레벨: 2 | 타입 별칭으로 복잡한 타입을 간단히 표현합니다

// type 키워드
type ID = string | number;
type Name = string;

let userId: ID = "abc123";
userId = 42; // OK (string | number)

// 유니온 타입 (|) - 여러 타입 중 하나
type Status = "active" | "inactive" | "banned";
let userStatus: Status = "active";
// userStatus = "deleted"; // Error! 허용된 값이 아님

type Result = string | number | boolean;
let value: Result = "성공";
value = 100;
value = true;

// 인터섹션 타입 (&) - 여러 타입 결합
type HasName = { name: string };
type HasAge = { age: number };
type Person = HasName & HasAge;

const person: Person = { name: "김철수", age: 25 };

// 리터럴 타입 - 특정 값만 허용
type Direction = "up" | "down" | "left" | "right";
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;

function move(dir: Direction): string {
  return `${dir} 방향으로 이동`;
}

function rollDice(): DiceRoll {
  return (Math.floor(Math.random() * 6) + 1) as DiceRoll;
}

console.log(move("up"));
console.log(`주사위: ${rollDice()}`);

// 타입 별칭으로 함수 타입 정의
type MathFunc = (a: number, b: number) => number;

const add: MathFunc = (a, b) => a + b;
const multiply: MathFunc = (a, b) => a * b;

console.log(`더하기: ${add(3, 5)}`);
console.log(`곱하기: ${multiply(3, 5)}`);
