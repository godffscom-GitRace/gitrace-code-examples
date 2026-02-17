// [33] 클로저 - Closure
// 레벨: 4 | JavaScript의 핵심 개념인 클로저를 이해합니다

// 클로저 기본 - 외부 변수를 기억하는 함수
function outer() {
  let count = 0; // 외부 변수 (자유 변수)
  function inner() {
    count++;
    return count;
  }
  return inner;
}

const counter = outer();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

// 렉시컬 스코프 - 함수가 정의된 위치의 스코프를 기억
const name = "전역";
function createGreeter() {
  const name = "클로저";
  return function () {
    console.log(`안녕, ${name}!`); // "클로저" (정의된 위치 기준)
  };
}
const greet = createGreeter();
greet(); // 안녕, 클로저!

// 프라이빗 변수 구현
function createBankAccount(initialBalance) {
  let balance = initialBalance; // 외부에서 직접 접근 불가

  return {
    deposit(amount) {
      balance += amount;
      console.log(`입금 ${amount}원 → 잔액: ${balance}원`);
    },
    withdraw(amount) {
      if (amount > balance) {
        console.log("잔액 부족!");
        return;
      }
      balance -= amount;
      console.log(`출금 ${amount}원 → 잔액: ${balance}원`);
    },
    getBalance() {
      return balance;
    },
  };
}

const account = createBankAccount(10000);
account.deposit(5000); // 입금 5000원 → 잔액: 15000원
account.withdraw(3000); // 출금 3000원 → 잔액: 12000원
console.log(`현재 잔액: ${account.getBalance()}원`);
// console.log(balance); // ReferenceError! 접근 불가

// 즉시 실행 함수 (IIFE)
const module = (function () {
  let private_data = "비밀 데이터";

  return {
    getData() {
      return private_data;
    },
    setData(value) {
      private_data = value;
    },
  };
})();

console.log(module.getData()); // 비밀 데이터
module.setData("새 데이터");
console.log(module.getData()); // 새 데이터
