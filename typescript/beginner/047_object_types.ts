// [47] 객체 타입 - Object Types
// 레벨: 2 | 객체의 타입을 정확하게 지정하는 방법을 배웁니다

// 객체 리터럴 타입
let student: { name: string; age: number; grade: string } = {
  name: "김철수",
  age: 20,
  grade: "A"
};

// 중첩 객체
interface Address {
  city: string;
  zipCode: string;
}

interface Person {
  name: string;
  age: number;
  address: Address;
}

const person: Person = {
  name: "이영희",
  age: 25,
  address: {
    city: "서울",
    zipCode: "06000"
  }
};

console.log(`${person.name} - ${person.address.city}`);

// Record<K, V> - 키와 값의 타입을 지정
const scores: Record<string, number> = {
  "김철수": 85,
  "이영희": 92,
  "박민수": 78
};

// Record로 요일별 할일
type Day = "월" | "화" | "수" | "목" | "금";
const schedule: Record<Day, string> = {
  "월": "수학",
  "화": "영어",
  "수": "과학",
  "목": "국어",
  "금": "체육"
};

console.log(`수요일: ${schedule["수"]}`);

// 객체 구조 분해 + 타입
function printPerson({ name, age }: { name: string; age: number }): void {
  console.log(`${name}, ${age}살`);
}

printPerson(person);

// 객체 순회
for (const [name, score] of Object.entries(scores)) {
  console.log(`${name}: ${score}점`);
}
