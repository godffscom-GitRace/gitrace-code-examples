// Array Basics

// create and access
const fruits = ["apple", "banana", "strawberry"];
console.log(fruits[0]);               // "apple"
console.log(fruits[fruits.length - 1]); // "strawberry"

// push / pop — add/remove at end
fruits.push("grape");
console.log(fruits);
const last = fruits.pop();
console.log(last); // "grape"

// unshift / shift — add/remove at front
fruits.unshift("mango");
console.log(fruits);
const first = fruits.shift();
console.log(first); // "mango"

console.log(`count: ${fruits.length}`);

// for loop
for (let i = 0; i < fruits.length; i++) {
  console.log(`${i + 1}. ${fruits[i]}`);
}

// for...of
for (const fruit of fruits) {
  console.log(fruit);
}

// forEach
fruits.forEach((fruit, index) => {
  console.log(`[${index}] ${fruit}`);
});

// search
console.log(fruits.includes("banana")); // true
console.log(fruits.indexOf("strawberry")); // 1
