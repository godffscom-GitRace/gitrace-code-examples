// Promise Basics

function delay(ms) {
  return new Promise(resolve => {
    setTimeout(() => resolve("done in " + ms + "ms"), ms);
  });
}

delay(200).then(msg => console.log(msg));

function divide(a, b) {
  return new Promise((resolve, reject) => {
    if (b === 0) reject("division by zero");
    else resolve(a / b);
  });
}

divide(10, 3)
  .then(r => console.log("result: " + r.toFixed(2)))
  .catch(e => console.log("error: " + e));

divide(10, 0)
  .then(r => console.log(r))
  .catch(e => console.log("error: " + e));

function addOne(n) {
  return new Promise(resolve => {
    setTimeout(() => resolve(n + 1), 100);
  });
}

addOne(1)
  .then(r => { console.log("step1: " + r); return addOne(r); })
  .then(r => { console.log("step2: " + r); return addOne(r); })
  .then(r => console.log("step3: " + r));

Promise.all([delay(100), delay(150)]).then(results => {
  console.log("all done:");
  for (let i = 0; i < results.length; i++) {
    console.log(results[i]);
  }
});

Promise.race([delay(100), delay(300)]).then(result => {
  console.log("fastest: " + result);
});
