// [52] 유틸리티 타입 - Utility Types
// 레벨: 4 | TypeScript의 내장 유틸리티 타입들을 활용합니다

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  isAdmin: boolean;
}

// Partial<T> - 모든 속성을 선택적으로
function updateUser(user: User, updates: Partial<User>): User {
  return { ...user, ...updates };
}

const user: User = { id: 1, name: "김철수", email: "kim@test.com", age: 25, isAdmin: false };
const updated = updateUser(user, { name: "김영희", age: 30 });
console.log(updated);

// Required<T> - 모든 속성을 필수로
interface Config {
  host?: string;
  port?: number;
  debug?: boolean;
}

const fullConfig: Required<Config> = {
  host: "localhost",
  port: 3000,
  debug: true, // 모든 필드 필수!
};

// Pick<T, K> - 특정 속성만 선택
type UserPreview = Pick<User, "id" | "name">;
const preview: UserPreview = { id: 1, name: "김철수" };
console.log("미리보기:", preview);

// Omit<T, K> - 특정 속성 제외
type UserWithoutAdmin = Omit<User, "isAdmin">;
const normalUser: UserWithoutAdmin = {
  id: 2, name: "이영희", email: "lee@test.com", age: 28,
};

// Record<K, V> - 키-값 타입 지정
type Grade = "A" | "B" | "C" | "D" | "F";
const gradeDescriptions: Record<Grade, string> = {
  A: "우수",
  B: "양호",
  C: "보통",
  D: "미흡",
  F: "불합격",
};
console.log("A등급:", gradeDescriptions["A"]);

// Readonly<T> - 모든 속성을 읽기 전용
const frozenUser: Readonly<User> = {
  id: 1, name: "김철수", email: "kim@test.com", age: 25, isAdmin: false,
};
// frozenUser.name = "변경"; // Error! readonly

// Exclude<T, U> - 유니온에서 특정 타입 제외
type AllColors = "red" | "green" | "blue" | "yellow";
type WarmColors = Exclude<AllColors, "blue" | "green">; // "red" | "yellow"

// Extract<T, U> - 유니온에서 특정 타입만 추출
type CoolColors = Extract<AllColors, "blue" | "green" | "purple">; // "blue" | "green"

// ReturnType<T> - 함수의 반환 타입 추출
function createUser(name: string, age: number) {
  return { id: Date.now(), name, age, createdAt: new Date() };
}
type NewUser = ReturnType<typeof createUser>;
console.log("타입 활용 완료!");
