// [142] 정렬 알고리즘 비교 (Sort Comparison)
// 레벨: 4 | 다양한 정렬 알고리즘을 구현하고 성능을 비교합니다

// 버블 정렬 O(n²)
function bubbleSort(arr) {
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      if (a[j] > a[j + 1]) [a[j], a[j + 1]] = [a[j + 1], a[j]];
    }
  }
  return a;
}

// 선택 정렬 O(n²)
function selectionSort(arr) {
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < a.length; j++) {
      if (a[j] < a[minIdx]) minIdx = j;
    }
    if (minIdx !== i) [a[i], a[minIdx]] = [a[minIdx], a[i]];
  }
  return a;
}

// 삽입 정렬 O(n²)
function insertionSort(arr) {
  const a = [...arr];
  for (let i = 1; i < a.length; i++) {
    const key = a[i];
    let j = i - 1;
    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j];
      j--;
    }
    a[j + 1] = key;
  }
  return a;
}

// 병합 정렬 O(n log n)
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i), right.slice(j));
}

// 퀵 정렬 O(n log n) 평균
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const mid = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  return [...quickSort(left), ...mid, ...quickSort(right)];
}

// 정렬 테스트
console.log("=== 정렬 결과 확인 ===");
const small = [64, 34, 25, 12, 22, 11, 90];
console.log(`  원본: [${small}]`);
console.log(`  버블: [${bubbleSort(small)}]`);
console.log(`  선택: [${selectionSort(small)}]`);
console.log(`  삽입: [${insertionSort(small)}]`);
console.log(`  병합: [${mergeSort(small)}]`);
console.log(`  퀵:   [${quickSort(small)}]`);

// 성능 비교
console.log("\n=== 성능 비교 ===");
function generateRandom(n) {
  return Array.from({ length: n }, () => Math.floor(Math.random() * n));
}

function benchmark(name, sortFn, arr) {
  const start = performance.now();
  sortFn(arr);
  const time = performance.now() - start;
  return { name, time };
}

const sizes = [1000, 5000];
for (const n of sizes) {
  const data = generateRandom(n);
  console.log(`\n  n = ${n}:`);

  const results = [
    benchmark("버블 정렬", bubbleSort, data),
    benchmark("선택 정렬", selectionSort, data),
    benchmark("삽입 정렬", insertionSort, data),
    benchmark("병합 정렬", mergeSort, data),
    benchmark("퀵 정렬  ", quickSort, data),
    benchmark("Array.sort", a => [...a].sort((x, y) => x - y), data),
  ];

  results.sort((a, b) => a.time - b.time);
  for (const r of results) {
    const bar = "█".repeat(Math.min(30, Math.ceil(r.time / 0.5)));
    console.log(`    ${r.name}: ${r.time.toFixed(2)}ms ${bar}`);
  }
}

// 정렬 복잡도 정리
console.log("\n=== 복잡도 정리 ===");
console.log("  알고리즘   | 최선     | 평균     | 최악     | 공간   | 안정");
console.log("  ----------|---------|---------|---------|-------|-----");
console.log("  버블       | O(n)    | O(n²)   | O(n²)   | O(1)  | O");
console.log("  선택       | O(n²)   | O(n²)   | O(n²)   | O(1)  | X");
console.log("  삽입       | O(n)    | O(n²)   | O(n²)   | O(1)  | O");
console.log("  병합       | O(nlogn)| O(nlogn)| O(nlogn)| O(n)  | O");
console.log("  퀵         | O(nlogn)| O(nlogn)| O(n²)   | O(logn)| X");
