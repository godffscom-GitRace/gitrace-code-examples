// [58] 데코레이터 - Decorators
// 레벨: 5 | TypeScript의 데코레이터를 사용합니다
// ※ tsconfig.json에서 "experimentalDecorators": true 필요

// === 클래스 데코레이터 ===
function Logger(constructor: Function) {
  console.log(`[Logger] 클래스 생성: ${constructor.name}`);
}

@Logger
class UserService {
  getUser(id: number) {
    return { id, name: `사용자${id}` };
  }
}

// 팩토리 데코레이터 - 인자를 받는 데코레이터
function Component(config: { selector: string; template: string }) {
  return function (constructor: Function) {
    console.log(`[Component] ${config.selector} 등록`);
    (constructor as any).selector = config.selector;
    (constructor as any).template = config.template;
  };
}

@Component({ selector: "app-header", template: "<h1>Header</h1>" })
class HeaderComponent {
  title = "GitRace";
}

// === 메서드 데코레이터 ===
function Log(target: any, name: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`[Log] ${name}(${args.join(", ")}) 호출`);
    const result = original.apply(this, args);
    console.log(`[Log] ${name} → ${result}`);
    return result;
  };
}

class Calculator {
  @Log
  add(a: number, b: number): number {
    return a + b;
  }

  @Log
  multiply(a: number, b: number): number {
    return a * b;
  }
}

const calc = new Calculator();
calc.add(3, 5);       // [Log] add(3, 5) 호출 → [Log] add → 8
calc.multiply(4, 6);  // [Log] multiply(4, 6) 호출 → [Log] multiply → 24

// === 프로퍼티 데코레이터 ===
function Required(target: any, propertyKey: string) {
  let value: any;

  Object.defineProperty(target, propertyKey, {
    get() { return value; },
    set(newValue: any) {
      if (newValue === null || newValue === undefined || newValue === "") {
        throw new Error(`${propertyKey}는 필수 값입니다!`);
      }
      value = newValue;
    },
  });
}

class Profile {
  @Required
  name!: string;

  age?: number;
}

const profile = new Profile();
profile.name = "김철수";   // OK
console.log(profile.name); // "김철수"
// profile.name = "";      // Error! 필수 값입니다!

// === 메타데이터 활용 (reflect-metadata) ===
// 데코레이터로 메타데이터를 추가하고 런타임에 활용
function Validate(min: number, max: number) {
  return function (target: any, propertyKey: string) {
    let value: number;
    Object.defineProperty(target, propertyKey, {
      get() { return value; },
      set(newValue: number) {
        if (newValue < min || newValue > max) {
          throw new Error(`${propertyKey}: ${min}~${max} 범위여야 합니다`);
        }
        value = newValue;
      },
    });
  };
}

class Student {
  name: string;
  @Validate(0, 100)
  score!: number;

  constructor(name: string, score: number) {
    this.name = name;
    this.score = score;
  }
}

const student = new Student("김철수", 85);
console.log(`${student.name}: ${student.score}점`);
