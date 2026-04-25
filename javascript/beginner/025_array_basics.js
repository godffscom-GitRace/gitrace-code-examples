// Array Basics

const fruits = ["apple", "banana", "strawberry"];

console.log(fruits[0]);
console.log(fruits[fruits.length - 1]);

fruits.push("grape");
console.log(fruits.join(", "));

const last = fruits.pop();
console.log(last);

fruits.unshift("mango");
console.log(fruits.join(", "));

const first = fruits.shift();
console.log(first);

console.log("count: " + fruits.length);

for (let i = 0; i < fruits.length; i++) {
  console.log((i + 1) + ". " + fruits[i]);
}

for (const fruit of fruits) {
  console.log(fruit);
}

fruits.forEach((fruit, index) => {
  console.log("[" + index + "] " + fruit);
});

console.log(fruits.includes("banana"));
console.log(fruits.indexOf("strawberry"));
