// [41] 기본 타입 시스템 - Basic Types
// 레벨: 1 | TypeScript의 기본 타입 시스템을 배웁니다

// 타입 어노테이션 - 변수 뒤에 : 타입
let userName: string = "김철수";
let age: number = 25;
let isStudent: boolean = true;

// number - 정수, 실수 모두 포함
let integer: number = 42;
let decimal: number = 3.14;
let hex: number = 0xff;

// string - 문자열
let greeting: string = `안녕하세요, ${userName}님!`;

// boolean
let isDone: boolean = false;

// any - 모든 타입 허용 (가능하면 사용 자제)
let anything: any = "문자열";
anything = 42;       // OK
anything = true;     // OK

// unknown - any보다 안전한 타입
let unknownVal: unknown = "hello";
// let str: string = unknownVal; // Error! 타입 체크 필요
if (typeof unknownVal === "string") {
  let str: string = unknownVal; // OK (타입 좁히기 후)
}

// never - 절대 발생하지 않는 값
function throwError(msg: string): never {
  throw new Error(msg);
}

// 타입 추론 - 타입을 명시하지 않아도 자동 추론
let inferred = "타입 추론"; // string으로 추론
let num = 100;              // number로 추론

console.log(`${userName}, ${age}살, 학생: ${isStudent}`);
console.log(`추론된 타입: ${typeof inferred}, ${typeof num}`);
