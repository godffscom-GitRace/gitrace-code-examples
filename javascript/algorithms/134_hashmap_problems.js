// HashMap Problems

// two sum O(n)
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const comp = target - nums[i];
    if (map.has(comp)) return [map.get(comp), i];
    map.set(nums[i], i);
  }
  return null;
}

const nums = [2, 7, 11, 15];
const r = twoSum(nums, 9);
console.log(`twoSum([${nums}], 9) => [${r}]`);

// frequency count
function freqCount(arr) {
  const freq = new Map();
  for (const x of arr) freq.set(x, (freq.get(x) || 0) + 1);
  return freq;
}

const fruits = ["apple", "banana", "apple", "cherry", "banana", "apple"];
const freq = freqCount(fruits);
for (const [item, count] of freq) console.log(`  ${item}: ${"*".repeat(count)} (${count})`);

// top K frequent elements
function topK(nums, k) {
  return [...freqCount(nums).entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(([v]) => v);
}

console.log(`\ntop 2: [${topK([1,1,1,2,2,3,3,3,3], 2)}]`);

// group anagrams
function groupAnagrams(words) {
  const map = new Map();
  for (const w of words) {
    const key = [...w].sort().join("");
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(w);
  }
  return [...map.values()];
}

const groups = groupAnagrams(["eat","tea","tan","ate","nat","bat"]);
groups.forEach((g, i) => console.log(`  group${i+1}: [${g}]`));

// longest consecutive sequence
function longestConsecutive(nums) {
  const set = new Set(nums);
  let max = 0;
  for (const n of set) {
    if (!set.has(n - 1)) {
      let cur = n, len = 1;
      while (set.has(cur + 1)) { cur++; len++; }
      max = Math.max(max, len);
    }
  }
  return max;
}

console.log(`\nlongest consecutive [100,4,200,1,3,2]: ${longestConsecutive([100,4,200,1,3,2])}`);
