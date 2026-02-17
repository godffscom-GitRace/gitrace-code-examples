// [53] 타입 가드 - Type Guards
// 레벨: 3 | 런타임에 타입을 체크하는 타입 가드를 배웁니다

// typeof - 기본 타입 체크
function formatValue(value: string | number): string {
  if (typeof value === "string") {
    return value.toUpperCase(); // string 메서드 사용 가능
  }
  return value.toFixed(2); // number 메서드 사용 가능
}

console.log(formatValue("hello"));  // "HELLO"
console.log(formatValue(3.14159));  // "3.14"

// instanceof - 클래스 인스턴스 체크
class Dog {
  bark(): string { return "멍멍!"; }
}

class Cat {
  meow(): string { return "야옹~"; }
}

function makeSound(animal: Dog | Cat): string {
  if (animal instanceof Dog) {
    return animal.bark();   // Dog 타입으로 좁혀짐
  }
  return animal.meow();     // Cat 타입으로 좁혀짐
}

console.log(makeSound(new Dog())); // "멍멍!"
console.log(makeSound(new Cat())); // "야옹~"

// in 연산자 - 속성 존재 여부로 타입 좁히기
interface Fish {
  swim(): void;
  name: string;
}

interface Bird {
  fly(): void;
  name: string;
}

function move(animal: Fish | Bird): string {
  if ("swim" in animal) {
    return `${animal.name}이(가) 수영합니다`;
  }
  return `${animal.name}이(가) 날아갑니다`;
}

const fish: Fish = { name: "니모", swim() {} };
const bird: Bird = { name: "참새", fly() {} };
console.log(move(fish)); // "니모이(가) 수영합니다"
console.log(move(bird)); // "참새이(가) 날아갑니다"

// 사용자 정의 타입 가드 - is 키워드
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  side: number;
}

type Shape = Circle | Square;

function isCircle(shape: Shape): shape is Circle {
  return shape.kind === "circle";
}

function getArea(shape: Shape): number {
  if (isCircle(shape)) {
    return Math.PI * shape.radius ** 2;  // Circle로 좁혀짐
  }
  return shape.side ** 2;                // Square로 좁혀짐
}

console.log(`원 넓이: ${getArea({ kind: "circle", radius: 5 }).toFixed(2)}`);
console.log(`사각형 넓이: ${getArea({ kind: "square", side: 4 })}`);

// 타입 좁히기 (narrowing) - null 체크
function printName(name: string | null | undefined): void {
  if (name == null) { // null과 undefined 모두 체크
    console.log("이름 없음");
    return;
  }
  console.log(`이름: ${name.toUpperCase()}`);
}

printName("철수");    // 이름: 철수
printName(null);      // 이름 없음
printName(undefined); // 이름 없음
