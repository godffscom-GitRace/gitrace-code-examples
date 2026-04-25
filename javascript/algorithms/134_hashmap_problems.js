// Map Problems

function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (map.has(need)) return [map.get(need), i];
    map.set(nums[i], i);
  }
  return null;
}

const nums = [2, 7, 11, 15];
const r = twoSum(nums, 9);
console.log("twoSum: " + r);

function freqCount(arr) {
  const map = new Map();
  for (let i = 0; i < arr.length; i++) {
    const v = arr[i];
    map.set(v, (map.get(v) || 0) + 1);
  }
  return map;
}

const fruits = ["apple", "banana", "apple", "cherry", "banana"];
const f = freqCount(fruits);

console.log("freq:");
for (const [k, v] of f) {
  console.log(k + ": " + v);
}

function groupAnagrams(words) {
  const map = new Map();
  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    const key = w.split("").sort().join("");
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(w);
  }
  return map;
}

const g = groupAnagrams(["eat","tea","tan","ate"]);
console.log("groups:");
for (const [k, v] of g) {
  console.log(v.join(" "));
}
