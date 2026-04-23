// Iterator & Generator

// custom iterator protocol
function createCounter(start, end) {
  return {
    [Symbol.iterator]() {
      let cur = start;
      return { next() { return cur <= end ? { value: cur++, done: false } : { done: true }; } };
    }
  };
}

console.log([...createCounter(1, 5)]); // [1,2,3,4,5]

// generator basics
function* numGen() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = numGen();
console.log(gen.next()); // {value:1, done:false}
console.log(gen.next()); // {value:2, done:false}
console.log(gen.next()); // {value:3, done:false}
console.log(gen.next()); // {value:undefined, done:true}
console.log([...numGen()]); // [1,2,3]

// infinite sequence with take helper
function* infiniteCounter(start = 0) {
  let n = start;
  while (true) yield n++;
}

function take(gen, count) {
  const result = [];
  for (const val of gen) {
    result.push(val);
    if (result.length >= count) break;
  }
  return result;
}

console.log(take(infiniteCounter(), 5));    // [0,1,2,3,4]

// fibonacci generator
function* fibonacci() {
  let a = 0, b = 1;
  while (true) { yield a; [a, b] = [b, a + b]; }
}
console.log(take(fibonacci(), 8)); // [0,1,1,2,3,5,8,13]

// two-way communication via yield
function* conversation() {
  const name = yield "What is your name?";
  const age  = yield `${name}, how old are you?`;
  yield `${name} is ${age} years old!`;
}

const chat = conversation();
console.log(chat.next().value);
console.log(chat.next("Alice").value);
console.log(chat.next(25).value);

// unique ID generator
function* idGenerator(prefix = "ID") {
  let id = 1;
  while (true) yield `${prefix}-${String(id++).padStart(4, "0")}`;
}

const userIds = idGenerator("USER");
console.log(userIds.next().value); // USER-0001
console.log(userIds.next().value); // USER-0002
