// Symbols

// every Symbol is unique
const sym1 = Symbol();
const sym2 = Symbol();
const sym3 = Symbol("label");
console.log(sym3.toString());         // Symbol(label)
console.log(sym3.description);        // "label"
console.log(sym1 === sym2);           // false

// Symbol as object property key
const ID   = Symbol("id");
const NAME = Symbol("name");
const user = {
  [ID]: 1,
  [NAME]: "Alice",
  name: "display name"    // no collision with NAME symbol
};
console.log(user[ID], user[NAME], user.name);

// Symbols are not visible in normal enumeration
console.log(Object.keys(user));   // ["name"]
console.log(JSON.stringify(user)); // {"name":"display name"}
console.log(Object.getOwnPropertySymbols(user).map(s => s.toString()));

// Symbol.for() — global registry
const g1 = Symbol.for("app.id");
const g2 = Symbol.for("app.id");
console.log(g1 === g2);         // true
console.log(Symbol.keyFor(g1)); // "app.id"

// well-known Symbol: Symbol.iterator
class Range {
  constructor(start, end) { this.start = start; this.end = end; }
  [Symbol.iterator]() {
    let cur = this.start, end = this.end;
    return { next() { return cur <= end ? { value: cur++, done: false } : { done: true }; } };
  }
}

const range = new Range(1, 5);
console.log([...range]); // [1,2,3,4,5]

// Symbol.toPrimitive — control type coercion
class Money {
  constructor(amount, currency) { this.amount = amount; this.currency = currency; }
  [Symbol.toPrimitive](hint) {
    if (hint === "number") return this.amount;
    if (hint === "string") return `${this.amount}${this.currency}`;
    return this.amount;
  }
}

const price = new Money(500, "USD");
console.log(`price: ${price}`);    // 500USD
console.log(price + 100);          // 600
console.log(price > 400);          // true
