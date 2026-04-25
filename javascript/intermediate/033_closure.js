// Closure

// closure: inner function remembers outer variable
function outer() {
  let count = 0;
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

// lexical scope: uses the scope where defined
const name = "global";
function createGreeter() {
  const name = "closure";
  return function() {
    console.log(`Hello, ${name}!`);
  };
}
const greet = createGreeter();
greet(); // Hello, closure!

// private variable via closure
function createAccount(initialBalance) {
  let balance = initialBalance;

  return {
    deposit(amount) {
      balance += amount;
      console.log(`deposit ${amount} => balance: ${balance}`);
    },
    withdraw(amount) {
      if (amount > balance) { console.log("insufficient funds"); return; }
      balance -= amount;
      console.log(`withdraw ${amount} => balance: ${balance}`);
    },
    getBalance() { return balance; }
  };
}

const account = createAccount(1000);
account.deposit(500);
account.withdraw(300);
console.log(`balance: ${account.getBalance()}`);

// IIFE module pattern
const module = (function() {
  let _data = "secret";
  return {
    getData() { return _data; },
    setData(v) { _data = v; }
  };
})();

console.log(module.getData());
module.setData("new data");
console.log(module.getData());
