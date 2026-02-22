// [133] 슬라이딩 윈도우 (Sliding Window)
// 레벨: 4 | 고정/가변 윈도우를 이동하며 효율적으로 문제를 해결합니다

// 1. 고정 크기 윈도우 - 최대 합
function maxSumSubarray(arr, k) {
  let windowSum = 0;
  // 첫 윈도우
  for (let i = 0; i < k; i++) windowSum += arr[i];

  let maxSum = windowSum;
  let maxStart = 0;

  // 윈도우 슬라이드
  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - k]; // 새 원소 추가, 오래된 원소 제거
    if (windowSum > maxSum) {
      maxSum = windowSum;
      maxStart = i - k + 1;
    }
  }
  return { maxSum, subarray: arr.slice(maxStart, maxStart + k) };
}

console.log("=== 고정 윈도우: 최대 합 ===");
const nums = [2, 1, 5, 1, 3, 2, 8, 4, 1];
const k = 3;
const result = maxSumSubarray(nums, k);
console.log(`  배열: [${nums}], k=${k}`);
console.log(`  최대 합: ${result.maxSum} → [${result.subarray}]`);

// 2. 이동 평균 (Moving Average)
function movingAverage(arr, k) {
  const averages = [];
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    if (i >= k) sum -= arr[i - k];
    if (i >= k - 1) averages.push(+(sum / k).toFixed(2));
  }
  return averages;
}

console.log("\n=== 이동 평균 ===");
const prices = [100, 120, 110, 130, 125, 140, 135];
console.log(`  가격: [${prices}]`);
console.log(`  3일 이동평균: [${movingAverage(prices, 3)}]`);

// 3. 가변 윈도우 - 합이 target 이상인 최소 길이
function minSubarrayLen(arr, target) {
  let left = 0, sum = 0;
  let minLen = Infinity;

  for (let right = 0; right < arr.length; right++) {
    sum += arr[right];
    while (sum >= target) {
      minLen = Math.min(minLen, right - left + 1);
      sum -= arr[left];
      left++;
    }
  }
  return minLen === Infinity ? 0 : minLen;
}

console.log("\n=== 가변 윈도우: 최소 길이 ===");
const arr2 = [2, 3, 1, 2, 4, 3];
const target = 7;
console.log(`  배열: [${arr2}], target=${target}`);
console.log(`  최소 길이: ${minSubarrayLen(arr2, target)}`);

// 4. 중복 없는 가장 긴 부분 문자열
function longestUniqueSubstring(s) {
  const charMap = new Map();
  let left = 0, maxLen = 0, maxStart = 0;

  for (let right = 0; right < s.length; right++) {
    if (charMap.has(s[right]) && charMap.get(s[right]) >= left) {
      left = charMap.get(s[right]) + 1;
    }
    charMap.set(s[right], right);
    if (right - left + 1 > maxLen) {
      maxLen = right - left + 1;
      maxStart = left;
    }
  }
  return { length: maxLen, substring: s.slice(maxStart, maxStart + maxLen) };
}

console.log("\n=== 가장 긴 고유 문자열 ===");
const strings = ["abcabcbb", "bbbbb", "pwwkew", "abcdef"];
for (const s of strings) {
  const res = longestUniqueSubstring(s);
  console.log(`  "${s}" → "${res.substring}" (길이: ${res.length})`);
}

// 5. 특정 문자 포함 최소 윈도우
function minWindow(s, t) {
  const need = new Map();
  for (const c of t) need.set(c, (need.get(c) || 0) + 1);

  let left = 0, matched = 0;
  let minLen = Infinity, minStart = 0;

  for (let right = 0; right < s.length; right++) {
    if (need.has(s[right])) {
      need.set(s[right], need.get(s[right]) - 1);
      if (need.get(s[right]) === 0) matched++;
    }
    while (matched === need.size) {
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        minStart = left;
      }
      if (need.has(s[left])) {
        if (need.get(s[left]) === 0) matched--;
        need.set(s[left], need.get(s[left]) + 1);
      }
      left++;
    }
  }
  return minLen === Infinity ? "" : s.slice(minStart, minStart + minLen);
}

console.log("\n=== 최소 윈도우 ===");
console.log(`  minWindow("ADOBECODEBANC", "ABC") = "${minWindow("ADOBECODEBANC", "ABC")}"`);
