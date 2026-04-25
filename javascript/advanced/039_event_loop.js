// Event Loop

console.log("1 start");
console.log("start");

setTimeout(() => {
  console.log("setTimeout");
}, 0);

Promise.resolve().then(() => {
  console.log("promise");
});

console.log("end");

console.log("2 tasks");

setTimeout(() => console.log("A"), 0);
setTimeout(() => console.log("B"), 0);

Promise.resolve()
  .then(() => console.log("C"))
  .then(() => console.log("D"));

Promise.resolve().then(() => console.log("E"));

console.log("3 nested");

setTimeout(() => {
  console.log("timeout 1");
  Promise.resolve().then(() => console.log("promise in timeout"));
}, 0);

Promise.resolve().then(() => {
  console.log("promise 1");
  setTimeout(() => console.log("timeout in promise"), 0);
});

console.log("4 microtask");

console.log("sync start");

queueMicrotask(() => console.log("micro 1"));
queueMicrotask(() => console.log("micro 2"));

setTimeout(() => console.log("macro"), 0);

console.log("sync end");
