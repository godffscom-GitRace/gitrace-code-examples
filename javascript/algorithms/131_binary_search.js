// [131] 이진 탐색 (Binary Search)
// 레벨: 3 | 정렬된 배열에서 효율적으로 값을 찾는 알고리즘입니다

// 방법 1: 반복문
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

// 방법 2: 재귀
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) return -1;
  const mid = Math.floor((left + right) / 2);
  if (arr[mid] === target) return mid;
  if (arr[mid] < target) return binarySearchRecursive(arr, target, mid + 1, right);
  return binarySearchRecursive(arr, target, left, mid - 1);
}

// 테스트
console.log("=== 이진 탐색 ===");
const sorted = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
console.log(`배열: [${sorted}]`);

const targets = [23, 72, 1, 91, 50];
for (const t of targets) {
  const idx = binarySearch(sorted, t);
  console.log(`  ${t} → ${idx >= 0 ? `인덱스 ${idx}` : "없음"}`);
}

// 과정 시각화
function binarySearchVerbose(arr, target) {
  let left = 0, right = arr.length - 1, step = 0;
  console.log(`\n${target} 탐색 과정:`);

  while (left <= right) {
    step++;
    const mid = Math.floor((left + right) / 2);
    console.log(`  ${step}단계: [${left}..${mid}..${right}] arr[${mid}]=${arr[mid]}`);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

binarySearchVerbose(sorted, 38);

// Lower Bound (target 이상인 첫 위치)
function lowerBound(arr, target) {
  let left = 0, right = arr.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] < target) left = mid + 1;
    else right = mid;
  }
  return left;
}

console.log("\n=== Lower Bound ===");
const nums = [1, 3, 3, 5, 5, 5, 7, 9];
console.log(`배열: [${nums}]`);
for (const t of [3, 5, 6]) {
  console.log(`  ${t} 이상 첫 위치: 인덱스 ${lowerBound(nums, t)}`);
}
