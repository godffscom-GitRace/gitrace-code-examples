// Currying basic

const add = a => b => a + b;
console.log("add(2)(3) =", add(2)(3));

const add5 = add(5);
console.log("add5(10) =", add5(10));

// multiply
const multiply = a => b => a * b;
const double = multiply(2);
console.log("double(4) =", double(4));

// simple curry
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function(...next) {
      return curried.apply(this, args.concat(next));
    };
  };
}

function sum3(a, b, c) {
  return a + b + c;
}

const curriedSum = curry(sum3);

console.log("sum3(1,2,3) =", curriedSum(1, 2, 3));
console.log("sum3(1)(2)(3) =", curriedSum(1)(2)(3));

// simple use
const numbers = [1, 2, 3, 4, 5];

const map = curry((fn, arr) => arr.map(fn));
const filter = curry((fn, arr) => arr.filter(fn));

const result = map(n => n * 2)(
  filter(n => n % 2 === 0)(numbers)
);

console.log("result:", result.join(","));
