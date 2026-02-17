// [48] null과 undefined - Null & Undefined Safety
// 레벨: 2 | null과 undefined를 안전하게 다루는 방법을 학습합니다

// null vs undefined
let a: null = null;           // 의도적으로 비어있음
let b: undefined = undefined; // 값이 할당되지 않음

// strictNullChecks - 타입에 null/undefined 명시 필요
let name: string | null = null;
name = "김철수"; // OK
name = null;     // OK
// name = undefined; // Error! null만 허용

// 옵셔널 체이닝 (?.) - 안전한 속성 접근
interface User {
  name: string;
  address?: {
    city?: string;
    zipCode?: string;
  };
}

const user1: User = { name: "철수" };
const user2: User = {
  name: "영희",
  address: { city: "서울" }
};

// address가 없어도 에러 없이 undefined 반환
console.log(user1.address?.city);     // undefined
console.log(user2.address?.city);     // "서울"

// Nullish 병합 연산자 (??) - null/undefined일 때 기본값
const city = user1.address?.city ?? "미등록";
console.log(`도시: ${city}`); // "미등록"

// ?? vs || 차이
let count: number | null = 0;
console.log(count || 10);  // 10 (0은 falsy)
console.log(count ?? 10);  // 0  (0은 null/undefined 아님)

// Non-null assertion (!) - 확실할 때만 사용
function getLength(str: string | null): number {
  if (str === null) return 0;
  return str!.length; // null이 아님을 확신
}

console.log(getLength("hello")); // 5
console.log(getLength(null));    // 0

// 타입 좁히기로 안전하게 처리
function printName(name: string | null | undefined): void {
  if (name == null) {
    console.log("이름 없음");
    return;
  }
  console.log(`이름: ${name.toUpperCase()}`);
}

printName("철수");     // 이름: 철수
printName(null);       // 이름 없음
printName(undefined);  // 이름 없음
