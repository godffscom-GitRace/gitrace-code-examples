// Iterator basics

function createRange(start, end) {
  return {
    [Symbol.iterator]() {
      let current = start;
      return {
        next() {
          if (current <= end) {
            return { value: current++, done: false };
          }
          return { done: true };
        }
      };
    }
  };
}

console.log([...createRange(1, 5)]);

// generator basic
function* simpleGen() {
  yield 1;
  yield 2;
  yield 3;
}

const g = simpleGen();

console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());

console.log([...simpleGen()]);

// infinite generator
function* infinite(start = 0) {
  let n = start;
  while (true) {
    yield n++;
  }
}

function take(gen, count) {
  const result = [];
  for (const v of gen) {
    result.push(v);
    if (result.length === count) break;
  }
  return result;
}

console.log(take(infinite(), 5));

// fibonacci generator
function* fib() {
  let a = 0;
  let b = 1;

  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

console.log(take(fib(), 8));

// generator communication
function* chat() {
  const name = yield "name?";
  const age = yield name + " age?";
  yield name + " is " + age;
}

const c = chat();

console.log(c.next().value);
console.log(c.next("Tom").value);
console.log(c.next(30).value);

// id generator
function* idGen() {
  let id = 1;
  while (true) {
    yield "ID-" + id++;
  }
}

const ids = idGen();

console.log(ids.next().value);
console.log(ids.next().value);
