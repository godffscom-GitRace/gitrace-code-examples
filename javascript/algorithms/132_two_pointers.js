// Two Pointers

// two sum in sorted array
function twoSum(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }
  return null;
}

const sorted = [1, 3, 5, 7, 11, 15, 20];
for (const t of [12, 26, 100]) {
  const r = twoSum(sorted, t);
  if (r) console.log(`  sum=${t} => [${sorted[r[0]]}+${sorted[r[1]]}]`);
  else   console.log(`  sum=${t} => not found`);
}

// palindrome check
function isPalindrome(s) {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  let left = 0, right = clean.length - 1;
  while (left < right) {
    if (clean[left] !== clean[right]) return false;
    left++; right--;
  }
  return true;
}

console.log("\npalindrome:");
for (const w of ["racecar", "hello", "A man a plan a canal Panama"]) {
  console.log(`  [${isPalindrome(w) ? "O" : "X"}] "${w}"`);
}

// remove duplicates in-place from sorted array
function removeDuplicates(arr) {
  let slow = 0;
  for (let fast = 1; fast < arr.length; fast++) {
    if (arr[fast] !== arr[slow]) arr[++slow] = arr[fast];
  }
  return slow + 1;
}

const nums = [1, 1, 2, 2, 3, 4, 4, 5];
const len = removeDuplicates(nums);
console.log(`\nremove dupes: [${nums.slice(0, len)}]`);

// container with most water
function maxWater(heights) {
  let left = 0, right = heights.length - 1, max = 0;
  while (left < right) {
    max = Math.max(max, Math.min(heights[left], heights[right]) * (right - left));
    if (heights[left] < heights[right]) left++;
    else right--;
  }
  return max;
}

const h = [1, 8, 6, 2, 5, 4, 8, 3, 7];
console.log(`\nmax water: ${maxWater(h)}`);
