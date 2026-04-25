// Symbols basic

const id = Symbol("id");
const name = Symbol("name");

const user = {
  [id]: 1,
  [name]: "Alice",
  displayName: "Alice A"
};

console.log(user[id]);
console.log(user[name]);
console.log(user.displayName);

// Symbol uniqueness
const a = Symbol("test");
const b = Symbol("test");

console.log(a === b);

// hidden properties
console.log(Object.keys(user));
console.log(Object.getOwnPropertySymbols(user));

// Symbol.for
const g1 = Symbol.for("app.key");
const g2 = Symbol.for("app.key");

console.log(g1 === g2);
console.log(Symbol.keyFor(g1));

// iterator symbol
class Counter {
  constructor(max) {
    this.max = max;
  }

  [Symbol.iterator]() {
    let i = 1;
    const max = this.max;
    return {
      next() {
        return i <= max
          ? { value: i++, done: false }
          : { done: true };
      }
    };
  }
}

const counter = new Counter(5);
console.log([...counter]);

// toPrimitive symbol
class Box {
  constructor(value) {
    this.value = value;
  }

  [Symbol.toPrimitive](hint) {
    if (hint === "string") return "Box:" + this.value;
    if (hint === "number") return this.value;
    return this.value;
  }
}

const box = new Box(10);

console.log(String(box));
console.log(box + 5);
console.log(box > 3);
