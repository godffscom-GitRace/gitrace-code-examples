// [43] 인터페이스 정의 - Interface
// 레벨: 2 | 객체의 구조를 정의하는 인터페이스를 배웁니다

// interface 선언
interface Student {
  name: string;
  age: number;
  grade: string;
}

const student1: Student = {
  name: "김철수",
  age: 20,
  grade: "A"
};

// 선택적 속성 (?) - 있어도 되고 없어도 됨
interface User {
  name: string;
  email: string;
  phone?: string;    // 선택적
  nickname?: string; // 선택적
}

const user1: User = { name: "철수", email: "cs@test.com" }; // OK
const user2: User = { name: "영희", email: "yh@test.com", phone: "010-1234" }; // OK

// 읽기전용 (readonly)
interface Config {
  readonly apiKey: string;
  readonly version: number;
  debug: boolean;
}

const config: Config = { apiKey: "abc123", version: 1, debug: true };
config.debug = false;     // OK
// config.apiKey = "new"; // Error! readonly

// 인덱스 시그니처 - 동적 키
interface ScoreBoard {
  [studentName: string]: number;
}

const scores: ScoreBoard = {};
scores["김철수"] = 95;
scores["이영희"] = 88;

// 인터페이스 확장
interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  company: string;
  position: string;
}

const emp: Employee = {
  name: "박민수",
  age: 30,
  company: "테크회사",
  position: "개발자"
};

console.log(student1);
console.log(emp);
console.log("점수:", scores);
