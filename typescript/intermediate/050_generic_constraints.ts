// [50] 제네릭 제약 조건 - Generic Constraints
// 레벨: 3 | 제네릭에 제약 조건을 추가하는 방법을 학습합니다

// extends 제약 - T는 반드시 특정 타입을 만족해야 함
interface HasLength {
  length: number;
}

function printLength<T extends HasLength>(item: T): number {
  console.log(`길이: ${item.length}`);
  return item.length;
}

printLength("hello");        // 5 (string은 length 있음)
printLength([1, 2, 3]);      // 3 (배열은 length 있음)
// printLength(123);          // Error! number에는 length 없음

// keyof 연산자 - 객체의 키를 타입으로 추출
interface Person {
  name: string;
  age: number;
  city: string;
}

type PersonKeys = keyof Person; // "name" | "age" | "city"

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person: Person = { name: "김철수", age: 25, city: "서울" };
console.log(getProperty(person, "name")); // "김철수"
console.log(getProperty(person, "age"));  // 25
// getProperty(person, "phone"); // Error! "phone"은 Person의 키가 아님

// 제네릭 클래스
class DataStore<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  get(index: number): T {
    return this.items[index];
  }

  getAll(): T[] {
    return [...this.items];
  }
}

const numStore = new DataStore<number>();
numStore.add(10);
numStore.add(20);
console.log(numStore.getAll()); // [10, 20]

const strStore = new DataStore<string>();
strStore.add("사과");
strStore.add("바나나");
console.log(strStore.getAll()); // ["사과", "바나나"]

// 복합 제약 조건
function merge<T extends object, U extends object>(a: T, b: U): T & U {
  return { ...a, ...b };
}

const merged = merge({ name: "철수" }, { age: 25 });
console.log(merged); // { name: "철수", age: 25 }
