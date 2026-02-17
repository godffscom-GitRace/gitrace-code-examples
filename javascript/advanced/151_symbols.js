// [151] Symbol 활용 (Symbols)
// 레벨: 4 | Symbol을 사용해 유일한 속성 키를 만드는 방법을 배웁니다

// === Symbol 기본 ===
console.log("=== Symbol 기본 ===");
const sym1 = Symbol();
const sym2 = Symbol();
const sym3 = Symbol("설명용");

console.log(`  sym1: ${sym1.toString()}`);
console.log(`  sym3: ${sym3.toString()}`);
console.log(`  sym3.description: ${sym3.description}`);
console.log(`  sym1 === sym2: ${sym1 === sym2}`);  // false (항상 유일)

// === 객체 속성 키로 사용 ===
console.log("\n=== 객체 속성 키 ===");
const ID = Symbol("id");
const NAME = Symbol("name");

const user = {
  [ID]: 1,
  [NAME]: "홍길동",
  name: "표시용 이름",  // 일반 속성과 충돌 없음
};

console.log(`  user[ID]: ${user[ID]}`);
console.log(`  user[NAME]: ${user[NAME]}`);
console.log(`  user.name: ${user.name}`);

// Symbol 속성은 일반 열거에서 보이지 않음
console.log(`  Object.keys: [${Object.keys(user)}]`);
console.log(`  JSON: ${JSON.stringify(user)}`);
console.log(`  Symbol keys: ${Object.getOwnPropertySymbols(user).map(s => s.toString())}`);

// === Symbol.for() - 전역 레지스트리 ===
console.log("\n=== Symbol.for() 전역 레지스트리 ===");
const globalSym1 = Symbol.for("app.id");
const globalSym2 = Symbol.for("app.id");
console.log(`  같은 키: ${globalSym1 === globalSym2}`);  // true
console.log(`  keyFor: ${Symbol.keyFor(globalSym1)}`);

// === 비공개 속성 구현 ===
console.log("\n=== 비공개 속성 ===");
const _balance = Symbol("balance");
const _pin = Symbol("pin");

class BankAccount {
  constructor(owner, balance, pin) {
    this.owner = owner;
    this[_balance] = balance;
    this[_pin] = pin;
  }

  checkBalance(pin) {
    if (pin !== this[_pin]) return "PIN 오류";
    return `${this.owner}: ${this[_balance].toLocaleString()}원`;
  }

  deposit(amount, pin) {
    if (pin !== this[_pin]) return "PIN 오류";
    this[_balance] += amount;
    return `${amount.toLocaleString()}원 입금 → 잔액: ${this[_balance].toLocaleString()}원`;
  }
}

const account = new BankAccount("김철수", 1000000, "1234");
console.log(`  ${account.checkBalance("1234")}`);
console.log(`  ${account.deposit(500000, "1234")}`);
console.log(`  직접 접근 - balance: ${account.balance}`);  // undefined
console.log(`  직접 접근 - pin: ${account.pin}`);          // undefined

// === Well-known Symbols ===
console.log("\n=== Well-known Symbols ===");

// Symbol.iterator - 커스텀 반복자
class Range {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;
    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false };
        }
        return { done: true };
      }
    };
  }
}

const range = new Range(1, 5);
console.log(`  Range(1,5): [${[...range]}]`);
for (const n of range) process.stdout.write(`${n} `);
console.log();

// Symbol.toPrimitive - 타입 변환 제어
class Money {
  constructor(amount, currency) {
    this.amount = amount;
    this.currency = currency;
  }

  [Symbol.toPrimitive](hint) {
    if (hint === "number") return this.amount;
    if (hint === "string") return `${this.amount}${this.currency}`;
    return this.amount; // default
  }
}

const price = new Money(50000, "원");
console.log(`\n  문자열: ${`가격: ${price}`}`);
console.log(`  숫자: ${price + 1000}`);
console.log(`  비교: ${price > 40000}`);

// Symbol.hasInstance - instanceof 커스터마이징
class EvenNumber {
  static [Symbol.hasInstance](num) {
    return typeof num === "number" && num % 2 === 0;
  }
}

console.log(`\n  4 instanceof EvenNumber: ${4 instanceof EvenNumber}`);
console.log(`  7 instanceof EvenNumber: ${7 instanceof EvenNumber}`);

// Symbol.toStringTag
class MyClass {
  get [Symbol.toStringTag]() {
    return "MyCustomClass";
  }
}

console.log(`  toString: ${Object.prototype.toString.call(new MyClass())}`);
