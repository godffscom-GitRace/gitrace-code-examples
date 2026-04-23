// Web Workers (Node.js worker_threads)

const { Worker, isMainThread, parentPort, workerData } = require("worker_threads");

function isPrime(n) {
  if (n < 2) return false;
  if (n < 4) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

if (isMainThread) {
  console.log("Main thread");

  function runWorker(task) {
    return new Promise((resolve, reject) => {
      const w = new Worker(__filename, { workerData: task });
      w.on("message", resolve);
      w.on("error", reject);
    });
  }

  async function demo() {
    const limit = 100000;

    // count primes on main thread
    let count = 0;
    const t0 = performance.now();
    for (let i = 2; i <= limit; i++) if (isPrime(i)) count++;
    console.log(`main: ${count} primes (${(performance.now() - t0).toFixed(1)}ms)`);

    // count primes in worker
    const t1 = performance.now();
    const r = await runWorker({ type: "countPrimes", limit });
    console.log(`worker: ${r.count} primes (${(performance.now() - t1).toFixed(1)}ms)`);

    // parallel workers
    const ranges = [
      { type: "range", start: 2,     end: 25000 },
      { type: "range", start: 25001, end: 50000 },
      { type: "range", start: 50001, end: 75000 },
      { type: "range", start: 75001, end: 100000 }
    ];
    const t2 = performance.now();
    const results = await Promise.all(ranges.map(r => runWorker(r)));
    const total = results.reduce((s, r) => s + r.count, 0);
    console.log(`parallel: ${total} primes (${(performance.now() - t2).toFixed(1)}ms)`);
  }

  demo().catch(console.error);

} else {
  const task = workerData;
  if (task.type === "countPrimes") {
    let count = 0;
    for (let i = 2; i <= task.limit; i++) if (isPrime(i)) count++;
    parentPort.postMessage({ count });
  } else if (task.type === "range") {
    let count = 0;
    for (let i = task.start; i <= task.end; i++) if (isPrime(i)) count++;
    parentPort.postMessage({ count });
  }
}
