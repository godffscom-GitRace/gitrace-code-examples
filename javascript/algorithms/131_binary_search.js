// Binary Search

function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

function binarySearchRec(arr, target, left, right) {
  if (left === undefined) left = 0;
  if (right === undefined) right = arr.length - 1;
  if (left > right) return -1;
  const mid = Math.floor((left + right) / 2);
  if (arr[mid] === target) return mid;
  if (arr[mid] < target) return binarySearchRec(arr, target, mid + 1, right);
  return binarySearchRec(arr, target, left, mid - 1);
}

const sorted = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];

console.log("array:");
let arrStr = "";
for (let i = 0; i < sorted.length; i++) {
  arrStr += sorted[i] + " ";
}
console.log(arrStr.trim());

const targets = [23, 72, 1, 91];
for (let i = 0; i < targets.length; i++) {
  const t = targets[i];
  const idx = binarySearch(sorted, t);
  if (idx >= 0) console.log(t + " => index " + idx);
  else console.log(t + " => not found");
}

function binarySearchVerbose(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let step = 0;
  console.log("search " + target);
  while (left <= right) {
    step++;
    const mid = Math.floor((left + right) / 2);
    console.log("step" + step + ": " + left + " " + mid + " " + right + " val " + arr[mid]);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

binarySearchVerbose(sorted, 38);

function lowerBound(arr, target) {
  let left = 0;
  let right = arr.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] < target) left = mid + 1;
    else right = mid;
  }
  return left;
}

const nums = [1, 3, 3, 5, 5, 5, 7, 9];

console.log("nums:");
let numsStr = "";
for (let i = 0; i < nums.length; i++) {
  numsStr += nums[i] + " ";
}
console.log(numsStr.trim());

const tests = [3, 5, 6];
for (let i = 0; i < tests.length; i++) {
  const t = tests[i];
  console.log("first index >= " + t + ": " + lowerBound(nums, t));
}
