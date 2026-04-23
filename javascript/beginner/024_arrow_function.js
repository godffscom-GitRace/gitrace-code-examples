// Arrow Functions

// basic arrow function
const add = (a, b) => {
  return a + b;
};
console.log(add(3, 5)); // 8

// implicit return (single expression)
const multiply = (a, b) => a * b;
console.log(multiply(4, 3)); // 12

// single param — no parentheses needed
const double = x => x * 2;
console.log(double(7)); // 14

// vs regular function
function tradAdd(a, b) { return a + b; }
const arrowAdd = (a, b) => a + b;
console.log(tradAdd(1, 2));  // 3
console.log(arrowAdd(1, 2)); // 3

// with array methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
console.log(doubled); // [2, 4, 6, 8, 10]
console.log(evens);   // [2, 4]

// this binding difference
const obj = {
  name: "Alice",
  // regular: this = obj
  sayHi: function() {
    console.log(`Hi from ${this.name}`);
  },
  // arrow: this = outer scope
  sayHiArrow: () => {
    console.log(`arrow this.name: ${this?.name}`);
  }
};
obj.sayHi();
obj.sayHiArrow();
