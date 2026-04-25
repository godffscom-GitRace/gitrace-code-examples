// Set & WeakSet

const set = new Set([1, 2, 3, 2]);
console.log("set: " + [...set].join(" "));
console.log("size: " + set.size);

const arr = [1, 2, 2, 3, 4, 3];
const unique = [...new Set(arr)];
console.log("unique: " + unique.join(" "));

const A = new Set([1, 2, 3]);
const B = new Set([2, 3, 4]);

const inter = [...A].filter(x => B.has(x));
console.log("inter: " + inter.join(" "));

const visited = new Set();
const pages = ["home", "about", "home"];

for (let i = 0; i < pages.length; i++) {
  const p = pages[i];
  const type = visited.has(p) ? "dup" : "new";
  visited.add(p);
  console.log(type + " " + p);
}

const ws = new WeakSet();
let obj = { id: 1 };
ws.add(obj);

console.log("has obj: " + ws.has(obj));
