// Two Pointers

function twoSum(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }
  return null;
}

const sorted = [1, 3, 5, 7, 11, 15, 20];

const targets = [12, 26, 100];
for (let i = 0; i < targets.length; i++) {
  const t = targets[i];
  const r = twoSum(sorted, t);
  if (r) {
    console.log("sum " + t + " => " + sorted[r[0]] + " + " + sorted[r[1]]);
  } else {
    console.log("sum " + t + " => not found");
  }
}

function isPalindrome(s) {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  let left = 0;
  let right = clean.length - 1;
  while (left < right) {
    if (clean[left] !== clean[right]) return false;
    left++;
    right--;
  }
  return true;
}

console.log("palindrome:");
const words = ["racecar", "hello", "A man a plan a canal Panama"];
for (let i = 0; i < words.length; i++) {
  const ok = isPalindrome(words[i]) ? "O" : "X";
  console.log(ok + " " + words[i]);
}

function removeDuplicates(arr) {
  let slow = 0;
  for (let fast = 1; fast < arr.length; fast++) {
    if (arr[fast] !== arr[slow]) {
      slow++;
      arr[slow] = arr[fast];
    }
  }
  return slow + 1;
}

const nums = [1, 1, 2, 2, 3, 4, 4, 5];
const len = removeDuplicates(nums);

let out = "";
for (let i = 0; i < len; i++) {
  out += nums[i] + " ";
}
console.log("remove dupes:");
console.log(out.trim());

function maxWater(heights) {
  let left = 0;
  let right = heights.length - 1;
  let max = 0;
  while (left < right) {
    const h = Math.min(heights[left], heights[right]);
    const area = h * (right - left);
    if (area > max) max = area;
    if (heights[left] < heights[right]) left++;
    else right--;
  }
  return max;
}

const h = [1, 8, 6, 2, 5, 4, 8, 3, 7];
console.log("max water: " + maxWater(h));
