// Sliding Window

// fixed window — max sum of k elements
function maxSumSubarray(arr, k) {
  let sum = 0;
  for (let i = 0; i < k; i++) sum += arr[i];
  let maxSum = sum, maxStart = 0;
  for (let i = k; i < arr.length; i++) {
    sum += arr[i] - arr[i - k];
    if (sum > maxSum) { maxSum = sum; maxStart = i - k + 1; }
  }
  return { maxSum, subarray: arr.slice(maxStart, maxStart + k) };
}

const nums = [2, 1, 5, 1, 3, 2, 8, 4, 1];
const r = maxSumSubarray(nums, 3);
console.log(`max sum(k=3): ${r.maxSum} => [${r.subarray}]`);

// moving average
function movingAverage(arr, k) {
  const avgs = [];
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    if (i >= k) sum -= arr[i - k];
    if (i >= k - 1) avgs.push(+(sum / k).toFixed(2));
  }
  return avgs;
}

const prices = [100, 120, 110, 130, 125, 140, 135];
console.log(`moving avg(k=3): [${movingAverage(prices, 3)}]`);

// variable window — min length with sum >= target
function minSubarrayLen(arr, target) {
  let left = 0, sum = 0, minLen = Infinity;
  for (let right = 0; right < arr.length; right++) {
    sum += arr[right];
    while (sum >= target) {
      minLen = Math.min(minLen, right - left + 1);
      sum -= arr[left++];
    }
  }
  return minLen === Infinity ? 0 : minLen;
}

console.log(`min len (sum>=7): ${minSubarrayLen([2,3,1,2,4,3], 7)}`); // 2

// longest substring without repeated chars
function longestUnique(s) {
  const map = new Map();
  let left = 0, maxLen = 0, maxStart = 0;
  for (let right = 0; right < s.length; right++) {
    if (map.has(s[right]) && map.get(s[right]) >= left) {
      left = map.get(s[right]) + 1;
    }
    map.set(s[right], right);
    if (right - left + 1 > maxLen) { maxLen = right - left + 1; maxStart = left; }
  }
  return { length: maxLen, substring: s.slice(maxStart, maxStart + maxLen) };
}

for (const s of ["abcabcbb", "bbbbb", "pwwkew"]) {
  const r = longestUnique(s);
  console.log(`  "${s}" => "${r.substring}" (len:${r.length})`);
}

// minimum window substring
function minWindow(s, t) {
  const need = new Map();
  for (const c of t) need.set(c, (need.get(c) || 0) + 1);
  let left = 0, matched = 0, minLen = Infinity, minStart = 0;
  for (let right = 0; right < s.length; right++) {
    if (need.has(s[right])) {
      need.set(s[right], need.get(s[right]) - 1);
      if (need.get(s[right]) === 0) matched++;
    }
    while (matched === need.size) {
      if (right - left + 1 < minLen) { minLen = right - left + 1; minStart = left; }
      if (need.has(s[left])) {
        if (need.get(s[left]) === 0) matched--;
        need.set(s[left], need.get(s[left]) + 1);
      }
      left++;
    }
  }
  return minLen === Infinity ? "" : s.slice(minStart, minStart + minLen);
}

console.log(`minWindow("ADOBECODEBANC","ABC"): "${minWindow("ADOBECODEBANC","ABC")}"`);
