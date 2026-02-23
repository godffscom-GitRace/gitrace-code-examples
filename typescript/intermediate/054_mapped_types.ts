// [54] 맵드 타입 - Mapped Types
// 레벨: 4 | 기존 타입을 변환하는 맵드 타입을 학습합니다

// 맵드 타입 기본 문법 - 기존 타입의 각 속성을 변환
// { [K in keyof T]: 새로운타입 }

interface User {
  name: string;
  age: number;
  email: string;
}

// 모든 속성을 선택적으로 (Partial 직접 구현)
type MyPartial<T> = {
  [K in keyof T]?: T[K];
};

const partialUser: MyPartial<User> = { name: "김철수" }; // OK

// 모든 속성을 읽기전용으로 (Readonly 직접 구현)
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

const readonlyUser: MyReadonly<User> = { name: "김철수", age: 25, email: "kim@test.com" };
// readonlyUser.name = "변경"; // Error! readonly

// keyof 활용 - 값 타입을 boolean으로 변환
type Flags<T> = {
  [K in keyof T]: boolean;
};

type UserFlags = Flags<User>;
// { name: boolean; age: boolean; email: boolean; }

const userFlags: UserFlags = {
  name: true,
  age: false,
  email: true,
};
console.log("플래그:", userFlags);

// as 키워드 - 키 이름 변환
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type UserGetters = Getters<User>;
// { getName: () => string; getAge: () => number; getEmail: () => string; }

const userGetters: UserGetters = {
  getName: () => "김철수",
  getAge: () => 25,
  getEmail: () => "kim@test.com",
};
console.log(userGetters.getName());
console.log(userGetters.getAge());

// 특정 속성만 필터링
type OnlyStrings<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};

type StringProps = OnlyStrings<User>;
// { name: string; email: string; } (age는 number라서 제외)

// 템플릿 리터럴 타입 활용
type EventMap<T> = {
  [K in keyof T as `on${Capitalize<string & K>}Change`]: (value: T[K]) => void;
};

type UserEvents = EventMap<User>;
// { onNameChange: (value: string) => void; onAgeChange: (value: number) => void; ... }

const handlers: UserEvents = {
  onNameChange: (name) => console.log(`이름 변경: ${name}`),
  onAgeChange: (age) => console.log(`나이 변경: ${age}`),
  onEmailChange: (email) => console.log(`이메일 변경: ${email}`),
};

handlers.onNameChange("이영희");
handlers.onAgeChange(30);
