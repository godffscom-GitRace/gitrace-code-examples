// Types and Conversion

const num = 42;
const str = "Hello";
const bool = true;

console.log(typeof num);
console.log(typeof str);
console.log(typeof bool);

let empty = null;
let notDefined;

console.log(typeof empty);
console.log(typeof notDefined);

console.log(empty == notDefined);
console.log(empty === notDefined);

console.log(Number("123"));
console.log(Number("abc"));
console.log(Number(true));
console.log(Number(false));

console.log(String(123));
console.log(String(null));

console.log("5" + 3);
console.log("5" - 3);

console.log(Boolean(0));
console.log(Boolean(""));
console.log(Boolean("hi"));
