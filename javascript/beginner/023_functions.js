// Functions

function greet(name) {
  return "Hello, " + name + "!";
}
console.log(greet("Alice"));

function add(a, b) {
  return a + b;
}
console.log(add(3, 5));

function introduce(name, age = 20) {
  return name + ", age " + age;
}
console.log(introduce("Bob"));
console.log(introduce("Carol", 25));

function isAdult(age) {
  return age >= 18;
}
console.log(isAdult(20));
console.log(isAdult(15));

function calcStats(numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  let avg = sum / numbers.length;
  return { sum: sum, avg: avg };
}

const scores = [85, 92, 78, 95, 88];
const result = calcStats(scores);

console.log("sum: " + result.sum + ", avg: " + result.avg);
