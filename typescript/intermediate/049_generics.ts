// [49] 제네릭 기초 - Generics
// 레벨: 3 | 재사용 가능한 컴포넌트를 만드는 제네릭을 배웁니다

// 제네릭 함수 - 타입을 매개변수처럼 전달
function identity<T>(value: T): T {
  return value;
}

console.log(identity<string>("hello"));  // "hello"
console.log(identity<number>(42));       // 42
console.log(identity(true));             // 타입 추론: boolean

// 제네릭으로 배열의 첫 번째 요소 가져오기
function getFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}

console.log(getFirst([10, 20, 30]));          // 10
console.log(getFirst(["사과", "바나나"]));     // "사과"

// 제네릭 인터페이스
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

const userResponse: ApiResponse<{ name: string; age: number }> = {
  data: { name: "김철수", age: 25 },
  status: 200,
  message: "성공"
};

const listResponse: ApiResponse<string[]> = {
  data: ["사과", "바나나", "딸기"],
  status: 200,
  message: "성공"
};

console.log(userResponse.data.name);
console.log(listResponse.data);

// 타입 매개변수 여러 개
function pair<A, B>(first: A, second: B): [A, B] {
  return [first, second];
}

const result = pair("이름", 25);
console.log(result); // ["이름", 25]

// 기본 타입 매개변수
interface Container<T = string> {
  value: T;
}

const strBox: Container = { value: "기본은 string" };
const numBox: Container<number> = { value: 42 };

console.log(strBox.value);
console.log(numBox.value);
