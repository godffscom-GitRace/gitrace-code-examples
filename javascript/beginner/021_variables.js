// Variables: let, const, var

// let - reassignable, block scope
let age = 25;
age = 26;
console.log(`age: ${age}`);

// const - not reassignable, block scope
const name = "kim";
console.log(`name: ${name}`);

// var - function scope (not recommended)
var score = 90;
score = 95;

// block scope difference
if (true) {
  let blockLet = "block only";
  var blockVar = "anywhere";
}
console.log(blockVar);

// hoisting
var hoisted = "ok";
const fruits = ["apple", "banana"];
fruits.push("mango");
console.log(fruits);
