// Object Literal

// create object with { }
const student = {
  name: "Alice",
  age: 20,
  scores: [85, 92, 78],
  isActive: true
};

// dot notation
console.log(student.name); // "Alice"
console.log(student.age);  // 20

// bracket notation
const key = "name";
console.log(student[key]); // "Alice"

// methods with chaining
const calculator = {
  result: 0,
  add(num) { this.result += num; return this; },
  subtract(num) { this.result -= num; return this; },
  getResult() { return this.result; }
};

calculator.add(10).add(5).subtract(3);
console.log(`result: ${calculator.getResult()}`); // 12

// add / update / delete properties
student.grade = "A";
student.age = 21;
delete student.isActive;
console.log(student);

// iterate with Object.entries
for (const [k, v] of Object.entries(student)) {
  console.log(`${k}: ${v}`);
}
