// Event Loop

// execution order: sync -> microtask -> macrotask
console.log("=== 1. Execution order ===");
console.log("start");

setTimeout(() => {
  console.log("setTimeout (macrotask)");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise (microtask)");
});

console.log("end");
// order: start => end => Promise => setTimeout

// microtask queue vs macrotask queue
console.log("\n=== 2. Task priority ===");
setTimeout(() => console.log("A: setTimeout 1"), 0);
setTimeout(() => console.log("B: setTimeout 2"), 0);

Promise.resolve()
  .then(() => console.log("C: Promise 1"))
  .then(() => console.log("D: Promise 2"));

Promise.resolve().then(() => console.log("E: Promise 3"));
// order: C => E => D => A => B

// nested async
console.log("\n=== 3. Nested async ===");
setTimeout(() => {
  console.log("timeout 1");
  Promise.resolve().then(() => console.log("  -> promise inside timeout"));
}, 0);

Promise.resolve().then(() => {
  console.log("promise 1");
  setTimeout(() => console.log("  -> timeout inside promise"), 0);
});

// queueMicrotask
console.log("\n=== 4. queueMicrotask ===");
console.log("sync start");
queueMicrotask(() => console.log("microtask 1"));
queueMicrotask(() => console.log("microtask 2"));
setTimeout(() => console.log("macrotask"), 0);
console.log("sync end");
// order: sync start => sync end => microtask1 => microtask2 => macrotask
