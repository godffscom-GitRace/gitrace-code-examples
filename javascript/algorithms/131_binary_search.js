// Binary Search

// iterative
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

// recursive
function binarySearchRec(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) return -1;
  const mid = Math.floor((left + right) / 2);
  if (arr[mid] === target) return mid;
  if (arr[mid] < target) return binarySearchRec(arr, target, mid + 1, right);
  return binarySearchRec(arr, target, left, mid - 1);
}

const sorted = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
console.log(`array: [${sorted}]`);

for (const t of [23, 72, 1, 91]) {
  const idx = binarySearch(sorted, t);
  console.log(`  ${t} => ${idx >= 0 ? `index ${idx}` : "not found"}`);
}

// verbose: show steps
function binarySearchVerbose(arr, target) {
  let left = 0, right = arr.length - 1, step = 0;
  console.log(`\nsearching ${target}:`);
  while (left <= right) {
    step++;
    const mid = Math.floor((left + right) / 2);
    console.log(`  step${step}: [${left}..${mid}..${right}] arr[${mid}]=${arr[mid]}`);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
binarySearchVerbose(sorted, 38);

// lower bound — first index >= target
function lowerBound(arr, target) {
  let left = 0, right = arr.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] < target) left = mid + 1;
    else right = mid;
  }
  return left;
}

const nums = [1, 3, 3, 5, 5, 5, 7, 9];
console.log(`\narray: [${nums}]`);
for (const t of [3, 5, 6]) {
  console.log(`  first index >= ${t}: ${lowerBound(nums, t)}`);
}
