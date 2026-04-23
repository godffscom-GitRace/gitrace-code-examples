// Functions

// basic function declaration
function greet(name) {
  return `Hello, ${name}!`;
}
console.log(greet("Alice"));

// parameters and arguments
function add(a, b) {
  return a + b;
}
console.log(add(3, 5)); // 8

// default parameter
function introduce(name, age = 20) {
  return `${name}, age ${age}`;
}
console.log(introduce("Bob"));       // Bob, age 20
console.log(introduce("Carol", 25)); // Carol, age 25

// return statement
function isAdult(age) {
  return age >= 18;
}
console.log(isAdult(20)); // true
console.log(isAdult(15)); // false

// return multiple values as object
function calcStats(numbers) {
  const sum = numbers.reduce((a, b) => a + b, 0);
  const avg = sum / numbers.length;
  return { sum, avg };
}

const scores = [85, 92, 78, 95, 88];
const result = calcStats(scores);
console.log(`sum: ${result.sum}, avg: ${result.avg}`);
