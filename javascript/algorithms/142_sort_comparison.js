// Sort Comparison

// bubble sort O(n^2)
function bubbleSort(arr) {
  const a = [...arr];
  for (let i = 0; i < a.length; i++)
    for (let j = 0; j < a.length - i - 1; j++)
      if (a[j] > a[j+1]) [a[j], a[j+1]] = [a[j+1], a[j]];
  return a;
}

// selection sort O(n^2)
function selectionSort(arr) {
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    let min = i;
    for (let j = i+1; j < a.length; j++) if (a[j] < a[min]) min = j;
    if (min !== i) [a[i], a[min]] = [a[min], a[i]];
  }
  return a;
}

// insertion sort O(n^2)
function insertionSort(arr) {
  const a = [...arr];
  for (let i = 1; i < a.length; i++) {
    const key = a[i]; let j = i - 1;
    while (j >= 0 && a[j] > key) { a[j+1] = a[j]; j--; }
    a[j+1] = key;
  }
  return a;
}

// merge sort O(n log n)
function merge(l, r) {
  const out = []; let i = 0, j = 0;
  while (i < l.length && j < r.length)
    out.push(l[i] <= r[j] ? l[i++] : r[j++]);
  return out.concat(l.slice(i), r.slice(j));
}
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const m = Math.floor(arr.length / 2);
  return merge(mergeSort(arr.slice(0, m)), mergeSort(arr.slice(m)));
}

// quick sort O(n log n) avg
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[Math.floor(arr.length / 2)];
  return [...quickSort(arr.filter(x => x < pivot)), ...arr.filter(x => x === pivot), ...quickSort(arr.filter(x => x > pivot))];
}

// verify correctness
const sample = [64, 34, 25, 12, 22, 11, 90];
console.log(`original:  [${sample}]`);
console.log(`bubble:    [${bubbleSort(sample)}]`);
console.log(`selection: [${selectionSort(sample)}]`);
console.log(`insertion: [${insertionSort(sample)}]`);
console.log(`merge:     [${mergeSort(sample)}]`);
console.log(`quick:     [${quickSort(sample)}]`);

// performance benchmark
function genRandom(n) { return Array.from({length: n}, () => Math.floor(Math.random() * n)); }
function bench(name, fn, data) {
  const t = performance.now(); fn(data); return `${name}: ${(performance.now()-t).toFixed(2)}ms`;
}

for (const n of [1000, 5000]) {
  const data = genRandom(n);
  console.log(`\nn=${n}:`);
  [
    bench("bubble",    bubbleSort,    data),
    bench("selection", selectionSort, data),
    bench("insertion", insertionSort, data),
    bench("merge",     mergeSort,     data),
    bench("quick",     quickSort,     data),
    bench("built-in",  a => [...a].sort((x,y)=>x-y), data)
  ].forEach(r => console.log(`  ${r}`));
}
