// Arrow Functions

const add = (a, b) => {
  return a + b;
};
console.log(add(3, 5));

const multiply = (a, b) => a * b;
console.log(multiply(4, 3));

const double = x => x * 2;
console.log(double(7));

function tradAdd(a, b) {
  return a + b;
}
const arrowAdd = (a, b) => a + b;

console.log(tradAdd(1, 2));
console.log(arrowAdd(1, 2));

const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);

console.log("doubled:");
for (let i = 0; i < doubled.length; i++) {
  console.log(doubled[i]);
}

console.log("evens:");
for (let i = 0; i < evens.length; i++) {
  console.log(evens[i]);
}

const obj = {
  name: "Alice",
  sayHi: function() {
    console.log("Hi from " + this.name);
  },
  sayHiArrow: () => {
    console.log("arrow this.name: " + this.name);
  }
};

obj.sayHi();
obj.sayHiArrow();
