// Worker Threads basic (Node.js)

const { Worker, isMainThread, parentPort, workerData } = require("worker_threads");

function isPrime(n) {
  if (n < 2) return false;
  if (n < 4) return true;
  if (n % 2 === 0) return false;

  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false;
  }

  return true;
}

if (isMainThread) {
  console.log("main thread start");

  function runWorker(data) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename, { workerData: data });
      worker.on("message", resolve);
      worker.on("error", reject);
    });
  }

  async function run() {
    const limit = 50000;

    let count = 0;
    for (let i = 2; i <= limit; i++) {
      if (isPrime(i)) count++;
    }

    console.log("main result:", count);

    const result = await runWorker({ limit });
    console.log("worker result:", result.count);
  }

  run();

} else {
  const { limit } = workerData;

  let count = 0;
  for (let i = 2; i <= limit; i++) {
    if (isPrime(i)) count++;
  }

  parentPort.postMessage({ count });
}
