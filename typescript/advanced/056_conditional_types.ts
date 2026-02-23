// [56] 조건부 타입 - Conditional Types
// 레벨: 5 | 고급 타입 시스템인 조건부 타입을 마스터합니다

// 조건부 타입 기본 문법: T extends U ? X : Y
type IsString<T> = T extends string ? "문자열" : "문자열 아님";

type A = IsString<string>;   // "문자열"
type B = IsString<number>;   // "문자열 아님"

// 실용적인 예시 - 배열이면 요소 타입 추출
type UnwrapArray<T> = T extends Array<infer U> ? U : T;

type C = UnwrapArray<string[]>;    // string
type D = UnwrapArray<number[]>;    // number
type E = UnwrapArray<boolean>;     // boolean (배열 아님)

// infer 키워드 - 타입 추론
type ReturnOf<T> = T extends (...args: any[]) => infer R ? R : never;

function getName(): string { return "김철수"; }
function getAge(): number { return 25; }

type NameReturn = ReturnOf<typeof getName>;  // string
type AgeReturn = ReturnOf<typeof getAge>;    // number

// 함수 매개변수 타입 추출
type Parameters<T> = T extends (...args: infer P) => any ? P : never;

function createUser(name: string, age: number): void {}
type CreateUserParams = Parameters<typeof createUser>; // [string, number]

// 분산 조건부 타입 - 유니온에 자동 분배
type ToArray<T> = T extends any ? T[] : never;

type F = ToArray<string | number>; // string[] | number[]
// string → string[], number → number[] 각각 적용

// NonNullable 직접 구현
type MyNonNullable<T> = T extends null | undefined ? never : T;

type G = MyNonNullable<string | null | undefined>; // string

// 재귀 조건부 타입 - 깊은 Readonly
type DeepReadonly<T> = T extends object
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T;

interface NestedObj {
  name: string;
  address: {
    city: string;
    zip: number;
  };
}

const frozen: DeepReadonly<NestedObj> = {
  name: "김철수",
  address: { city: "서울", zip: 12345 },
};
// frozen.address.city = "부산"; // Error! 깊은 곳도 readonly

// 실전 활용 - API 응답 타입 변환
type ApiResult<T> = T extends { error: any }
  ? { success: false; error: T["error"] }
  : { success: true; data: T };

type SuccessResult = ApiResult<{ name: string }>;
// { success: true; data: { name: string } }

type ErrorResult = ApiResult<{ error: string }>;
// { success: false; error: string }

console.log("조건부 타입 학습 완료!");
