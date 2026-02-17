// [153] Web Worker 활용 (Web Workers)
// 레벨: 5 | Web Worker로 멀티스레딩을 구현합니다
// 참고: Web Worker는 브라우저 환경에서 동작합니다. Node.js에서는 worker_threads를 사용합니다.

// === Node.js Worker Threads ===
const { Worker, isMainThread, parentPort, workerData } = require("worker_threads");

if (isMainThread) {
  // 메인 스레드
  console.log("=== Web Worker (Node.js worker_threads) ===");
  console.log("  메인 스레드에서 실행 중\n");

  // 1. 인라인 Worker 생성
  function runWorker(task) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename, { workerData: task });
      worker.on("message", resolve);
      worker.on("error", reject);
    });
  }

  // 2. 무거운 계산 비교 (메인 vs Worker)
  async function demo() {
    // 메인 스레드에서 계산
    console.log("  === 소수 개수 세기 ===");
    const limit = 100000;

    const start1 = performance.now();
    let count = 0;
    for (let i = 2; i <= limit; i++) {
      if (isPrime(i)) count++;
    }
    const mainTime = performance.now() - start1;
    console.log(`  메인 스레드: ${count}개 소수 (${mainTime.toFixed(1)}ms)`);

    // Worker에서 계산
    const start2 = performance.now();
    const result = await runWorker({ type: "countPrimes", limit });
    const workerTime = performance.now() - start2;
    console.log(`  Worker 스레드: ${result.count}개 소수 (${workerTime.toFixed(1)}ms)\n`);

    // 3. 병렬 처리
    console.log("  === 병렬 처리 ===");
    const ranges = [
      { start: 2, end: 25000 },
      { start: 25001, end: 50000 },
      { start: 50001, end: 75000 },
      { start: 75001, end: 100000 },
    ];

    const start3 = performance.now();
    const promises = ranges.map(range =>
      runWorker({ type: "countPrimesRange", ...range })
    );
    const results = await Promise.all(promises);
    const totalPrimes = results.reduce((sum, r) => sum + r.count, 0);
    const parallelTime = performance.now() - start3;

    console.log(`  4개 Worker 병렬: ${totalPrimes}개 소수 (${parallelTime.toFixed(1)}ms)`);
    results.forEach((r, i) =>
      console.log(`    Worker ${i + 1}: ${ranges[i].start}~${ranges[i].end} → ${r.count}개`)
    );

    // 4. 메시지 기반 통신
    console.log("\n  === 메시지 통신 패턴 ===");
    const calcResult = await runWorker({ type: "fibonacci", n: 40 });
    console.log(`  fib(40) = ${calcResult.value}`);

    console.log("\n  === Worker 활용 사례 ===");
    console.log("  1. 대량 데이터 정렬/필터링");
    console.log("  2. 이미지/비디오 처리");
    console.log("  3. 암호화/해싱");
    console.log("  4. 복잡한 수학 계산");
    console.log("  5. 파일 파싱 (CSV, JSON)");

    console.log("\n  === 브라우저 Web Worker 예시 코드 ===");
    console.log(`  // main.js`);
    console.log(`  const worker = new Worker('worker.js');`);
    console.log(`  worker.postMessage({ data: [1,2,3] });`);
    console.log(`  worker.onmessage = (e) => console.log(e.data);`);
    console.log(`  `);
    console.log(`  // worker.js`);
    console.log(`  self.onmessage = (e) => {`);
    console.log(`    const result = heavyCompute(e.data);`);
    console.log(`    self.postMessage(result);`);
    console.log(`  };`);
  }

  function isPrime(n) {
    if (n < 2) return false;
    if (n < 4) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    for (let i = 5; i * i <= n; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
  }

  demo().catch(console.error);

} else {
  // Worker 스레드
  const task = workerData;

  function isPrime(n) {
    if (n < 2) return false;
    if (n < 4) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    for (let i = 5; i * i <= n; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
  }

  switch (task.type) {
    case "countPrimes": {
      let count = 0;
      for (let i = 2; i <= task.limit; i++) {
        if (isPrime(i)) count++;
      }
      parentPort.postMessage({ count });
      break;
    }
    case "countPrimesRange": {
      let count = 0;
      for (let i = task.start; i <= task.end; i++) {
        if (isPrime(i)) count++;
      }
      parentPort.postMessage({ count });
      break;
    }
    case "fibonacci": {
      function fib(n) {
        if (n <= 1) return n;
        let a = 0, b = 1;
        for (let i = 2; i <= n; i++) [a, b] = [b, a + b];
        return b;
      }
      parentPort.postMessage({ value: fib(task.n) });
      break;
    }
  }
}
