// Array Methods

const numbers = [1,2,3,4,5,6,7,8,9,10];

const doubled = numbers.map(n => n * 2);
console.log("map:");
for (let i = 0; i < doubled.length; i++) {
  console.log(doubled[i]);
}

const evens = numbers.filter(n => n % 2 === 0);
console.log("filter:");
for (let i = 0; i < evens.length; i++) {
  console.log(evens[i]);
}

const sum = numbers.reduce((acc, cur) => acc + cur, 0);
console.log("reduce: " + sum);

let line = "";
numbers.forEach(n => {
  line += n + " ";
});
console.log(line.trim());

const students = [
  { name: "Alice", score: 85 },
  { name: "Bob", score: 92 },
  { name: "Carol", score: 68 },
  { name: "Dave", score: 95 },
  { name: "Eve", score: 74 }
];

const passed = students
  .filter(s => s.score >= 80)
  .map(s => s.name);

console.log("passed:");
for (let i = 0; i < passed.length; i++) {
  console.log(passed[i]);
}

const total = students.reduce((acc, s) => acc + s.score, 0);
const avg = total / students.length;

console.log("avg: " + avg.toFixed(1));
