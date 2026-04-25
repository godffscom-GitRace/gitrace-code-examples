// Sliding Window (short)

function maxSum(arr, k) {
  let sum = 0;
  for (let i = 0; i < k; i++) sum += arr[i];

  let max = sum;
  for (let i = k; i < arr.length; i++) {
    sum += arr[i] - arr[i - k];
    if (sum > max) max = sum;
  }
  return max;
}

const nums = [2, 1, 5, 1, 3, 2, 8];
console.log("max sum: " + maxSum(nums, 3));

function longestUnique(s) {
  const map = {};
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    if (map[c] !== undefined && map[c] >= left) {
      left = map[c] + 1;
    }
    map[c] = right;
    const len = right - left + 1;
    if (len > maxLen) maxLen = len;
  }
  return maxLen;
}

console.log("unique len: " + longestUnique("abcabcbb"));
