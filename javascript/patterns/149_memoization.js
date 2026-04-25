// Memoization basic

function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// fibonacci
const fib = memoize(function(n) {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
});

console.log("fib(10) =", fib(10));
console.log("fib(20) =", fib(20));

// factorial
const factorial = memoize(function(n) {
  return n <= 1 ? 1 : n * factorial(n - 1);
});

console.log("5! =", factorial(5));
console.log("6! =", factorial(6));

// cache test
function slowAdd(a, b) {
  let sum = 0;
  for (let i = 0; i < 1000000; i++) {
    sum = a + b;
  }
  return sum;
}

const fastAdd = memoize(slowAdd);

console.log("first:", fastAdd(2, 3));
console.log("cached:", fastAdd(2, 3));
