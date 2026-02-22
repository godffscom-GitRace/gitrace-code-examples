// [59] 고급 제네릭 패턴 - Advanced Generics
// 레벨: 5 | 고급 제네릭 패턴으로 복잡한 타입을 다룹니다

// 제네릭 팩토리 - 클래스를 인자로 받아 인스턴스 생성
function createInstance<T>(ctor: new (...args: any[]) => T, ...args: any[]): T {
  return new ctor(...args);
}

class Animal {
  constructor(public name: string, public sound: string) {}
  speak(): string { return `${this.name}: ${this.sound}`; }
}

const dog = createInstance(Animal, "바둑이", "멍멍");
console.log(dog.speak()); // 바둑이: 멍멍

// 제네릭 제약 조합 - 여러 조건 동시 적용
interface Serializable {
  serialize(): string;
}

interface Validatable {
  validate(): boolean;
}

function processEntity<T extends Serializable & Validatable>(entity: T): string {
  if (!entity.validate()) {
    return "유효하지 않음";
  }
  return entity.serialize();
}

class UserForm implements Serializable, Validatable {
  constructor(private name: string, private age: number) {}

  serialize(): string {
    return JSON.stringify({ name: this.name, age: this.age });
  }

  validate(): boolean {
    return this.name.length > 0 && this.age > 0;
  }
}

const form = new UserForm("김철수", 25);
console.log(processEntity(form)); // {"name":"김철수","age":25}

// 타입 추론 활용 - 체이닝 빌더 패턴
class QueryBuilder<T extends object> {
  private filters: Partial<T> = {};
  private sortKey?: keyof T;

  where<K extends keyof T>(key: K, value: T[K]): this {
    this.filters[key] = value;
    return this; // this 반환으로 체이닝
  }

  orderBy(key: keyof T): this {
    this.sortKey = key;
    return this;
  }

  build(): { filters: Partial<T>; sort?: keyof T } {
    return { filters: this.filters, sort: this.sortKey };
  }
}

interface Product {
  name: string;
  price: number;
  category: string;
}

const query = new QueryBuilder<Product>()
  .where("category", "전자제품")  // 타입 안전! value는 string
  .where("price", 50000)          // 타입 안전! value는 number
  .orderBy("price")
  .build();

console.log("쿼리:", query);

// 복잡한 제네릭 - 깊은 속성 접근 타입
type DeepValue<T, P extends string> =
  P extends `${infer K}.${infer Rest}`
    ? K extends keyof T
      ? DeepValue<T[K], Rest>
      : never
    : P extends keyof T
      ? T[P]
      : never;

interface AppConfig {
  server: {
    host: string;
    port: number;
  };
  db: {
    name: string;
  };
}

type HostType = DeepValue<AppConfig, "server.host">;  // string
type PortType = DeepValue<AppConfig, "server.port">;  // number

// 조건부 타입과 제네릭 조합
type ApiResponse<T> = T extends undefined
  ? { status: number; message: string }
  : { status: number; data: T; message: string };

function apiCall<T = undefined>(url: string, data?: T): ApiResponse<T> {
  return { status: 200, data, message: "성공" } as ApiResponse<T>;
}

const res1 = apiCall("/users", { name: "철수" });
console.log(res1.data); // { name: "철수" }

console.log("고급 제네릭 학습 완료!");
