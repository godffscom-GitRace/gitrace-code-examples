// Variables: let, const, var

let age = 25;
age = 26;
console.log("age: " + age);

const name = "kim";
console.log("name: " + name);

var score = 90;
score = 95;

if (true) {
  let blockLet = "block only";
  var blockVar = "anywhere";
}

console.log(blockVar);

var hoisted = "ok";

const fruits = ["apple", "banana"];
fruits.push("mango");

console.log("fruits:");
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
