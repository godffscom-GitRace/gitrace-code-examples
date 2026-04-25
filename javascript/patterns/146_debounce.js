// Debounce

function debounce(fn, delay) {
  let timer = null;

  return function(arg) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(arg);
    }, delay);
  };
}

let count = 0;

const search = debounce(function(q) {
  count++;
  console.log("call " + count + ": " + q);
}, 200);

const inputs = ["h", "he", "hel", "hell", "hello"];

for (let i = 0; i < inputs.length; i++) {
  setTimeout(() => {
    console.log("type: " + inputs[i]);
    search(inputs[i]);
  }, i * 50);
}
