// Types & Type Conversion

// primitive types
const num = 42;
const str = "Hello";
const bool = true;

// typeof operator
console.log(typeof num);   // "number"
console.log(typeof str);   // "string"
console.log(typeof bool);  // "boolean"

// null vs undefined
let empty = null;
let notDefined;
console.log(typeof empty);      // "object" (JS quirk)
console.log(typeof notDefined); // "undefined"
console.log(empty == notDefined);  // true
console.log(empty === notDefined); // false

// Number()
console.log(Number("123"));  // 123
console.log(Number("abc"));  // NaN
console.log(Number(true));   // 1
console.log(Number(false));  // 0

// String()
console.log(String(123));   // "123"
console.log(String(null));  // "null"

// implicit coercion
console.log("5" + 3);   // "53"
console.log("5" - 3);   // 2
console.log(Boolean(0));  // false
console.log(Boolean(""));  // false
console.log(Boolean("hi")); // true
