// ES6 Modules

// Real module syntax (requires "type":"module" in package.json):
// export function add(a, b) { return a + b; }
// export const PI = 3.14159;
// export default class Calculator { ... }

// import { add } from './math.js';
// import * as MathUtils from './math.js';
// import Calculator from './calculator.js';

// IIFE module pattern demo
const MathModule = (function() {
  const _PI = 3.14159;
  return {
    PI: _PI,
    add(a, b)       { return a + b; },
    subtract(a, b)  { return a - b; },
    circleArea(r)   { return _PI * r * r; }
  };
})();

console.log(MathModule.add(10, 5));
console.log(MathModule.PI);
console.log(`circle(r=5): ${MathModule.circleArea(5).toFixed(2)}`);

// default export simulation
const StringUtils = (function() {
  function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function reverse(s)    { return s.split("").reverse().join(""); }
  function truncate(s, n){ return s.length > n ? s.slice(0, n) + "..." : s; }
  return { capitalize, reverse, truncate };
})();

console.log(StringUtils.capitalize("hello"));
console.log(StringUtils.reverse("abcde"));
console.log(StringUtils.truncate("long string here", 7));

// combine modules
const app = { math: MathModule, string: StringUtils };
console.log(`sum: ${app.math.add(1, 2)}`);
console.log(`reversed: ${app.string.reverse("JavaScript")}`);
