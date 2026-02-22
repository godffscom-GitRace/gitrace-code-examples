// [51] 클래스와 접근 제어자 - Class Modifiers
// 레벨: 3 | TypeScript 클래스와 접근 제어자를 마스터합니다

// public, private, protected
class BankAccount {
  public owner: string;          // 어디서든 접근 가능 (기본값)
  private balance: number;       // 클래스 내부에서만 접근
  protected accountId: string;   // 클래스 + 자식 클래스에서 접근

  constructor(owner: string, initialBalance: number) {
    this.owner = owner;
    this.balance = initialBalance;
    this.accountId = `ACC-${Date.now()}`;
  }

  public deposit(amount: number): void {
    this.balance += amount;
    console.log(`입금 ${amount}원 → 잔액: ${this.balance}원`);
  }

  public withdraw(amount: number): boolean {
    if (amount > this.balance) {
      console.log("잔액 부족!");
      return false;
    }
    this.balance -= amount;
    console.log(`출금 ${amount}원 → 잔액: ${this.balance}원`);
    return true;
  }

  public getBalance(): number {
    return this.balance;
  }
}

const account = new BankAccount("김철수", 10000);
account.deposit(5000);           // 입금 5000원 → 잔액: 15000원
account.withdraw(3000);          // 출금 3000원 → 잔액: 12000원
console.log(account.owner);     // "김철수" (public)
// console.log(account.balance); // Error! private

// readonly 속성 - 생성 후 변경 불가
class Config {
  readonly appName: string;
  readonly version: string;

  constructor(name: string, version: string) {
    this.appName = name;
    this.version = version;
  }
}

const config = new Config("GitRace", "1.0.0");
console.log(config.appName);     // "GitRace"
// config.appName = "Other";     // Error! readonly

// static 멤버 - 인스턴스 없이 접근
class Counter {
  static count: number = 0;

  constructor() {
    Counter.count++;
  }

  static getCount(): number {
    return Counter.count;
  }
}

new Counter();
new Counter();
new Counter();
console.log(`생성된 인스턴스: ${Counter.getCount()}개`); // 3개

// 추상 클래스 - 직접 인스턴스 생성 불가, 상속 전용
abstract class Shape {
  abstract getArea(): number;
  abstract getName(): string;

  describe(): string {
    return `${this.getName()}: 넓이 = ${this.getArea().toFixed(2)}`;
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }

  getArea(): number {
    return Math.PI * this.radius ** 2;
  }

  getName(): string {
    return "원";
  }
}

class Rectangle extends Shape {
  constructor(private width: number, private height: number) {
    super();
  }

  getArea(): number {
    return this.width * this.height;
  }

  getName(): string {
    return "사각형";
  }
}

const shapes: Shape[] = [new Circle(5), new Rectangle(4, 6)];
shapes.forEach((s) => console.log(s.describe()));
