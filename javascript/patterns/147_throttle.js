// Throttle basic

function throttle(fn, interval) {
  let last = 0;
  return function(...args) {
    const now = Date.now();
    if (now - last >= interval) {
      last = now;
      fn.apply(this, args);
    }
  };
}

// test
console.log("Throttle test start");

const logs = [];
const throttled = throttle(v => logs.push(v), 200);

let i = 0;
const timer = setInterval(() => {
  i++;
  throttled(i);

  if (i >= 20) {
    clearInterval(timer);
    setTimeout(() => {
      console.log("Total calls:", logs.length);
      console.log("Values:", logs.join(","));
    }, 300);
  }
}, 50);
