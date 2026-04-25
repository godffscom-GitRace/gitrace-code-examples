// Spread Operator

const original = [1, 2, 3];
const copy = [...original];
copy.push(4);

console.log("original:");
for (let i = 0; i < original.length; i++) {
  console.log(original[i]);
}

console.log("copy:");
for (let i = 0; i < copy.length; i++) {
  console.log(copy[i]);
}

const front = ["apple", "banana"];
const back = ["grape", "kiwi"];
const all = [...front, "mango", ...back];

console.log("merged array:");
for (let i = 0; i < all.length; i++) {
  console.log(all[i]);
}

const user = { name: "Alice", age: 25 };
const userCopy = { ...user };

console.log("obj copy:");
for (const k in userCopy) {
  console.log(k + ": " + userCopy[k]);
}

const defaults = { theme: "light", lang: "en", fontSize: 14 };
const settings = { theme: "dark", fontSize: 16 };
const merged = { ...defaults, ...settings };

console.log("merged object:");
for (const k in merged) {
  console.log(k + ": " + merged[k]);
}

function sum(a, b, c) {
  return a + b + c;
}

const nums = [10, 20, 30];
console.log("sum: " + sum(...nums));

function total() {
  let sum = 0;
  for (let i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
}

console.log("total: " + total(1, 2, 3, 4, 5));
