// Recursion vs Iteration

function factRec(n) {
  if (n <= 1) return 1;
  return n * factRec(n - 1);
}

function factIter(n) {
  let r = 1;
  for (let i = 2; i <= n; i++) {
    r *= i;
  }
  return r;
}

console.log("factorial:");
const list = [5, 6];
for (let i = 0; i < list.length; i++) {
  const n = list[i];
  console.log(n + " => " + factRec(n) + " / " + factIter(n));
}

function fibRec(n) {
  if (n <= 1) return n;
  return fibRec(n - 1) + fibRec(n - 2);
}

function fibIter(n) {
  if (n <= 1) return n;
  let a = 0;
  let b = 1;
  for (let i = 2; i <= n; i++) {
    const temp = a + b;
    a = b;
    b = temp;
  }
  return b;
}

console.log("fibonacci:");
let line = "";
for (let i = 0; i < 8; i++) {
  line += fibIter(i) + " ";
}
console.log(line.trim());
