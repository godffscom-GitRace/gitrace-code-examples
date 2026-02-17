// [134] 해시맵 활용 (HashMap Problems)
// 레벨: 3 | Map을 활용하여 알고리즘 문제를 효율적으로 해결합니다

// 1. 두 수의 합 (Two Sum) - O(n)
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement), i];
    map.set(nums[i], i);
  }
  return null;
}

console.log("=== Two Sum ===");
const nums = [2, 7, 11, 15];
const target = 9;
const result = twoSum(nums, target);
console.log(`  [${nums}], target=${target} → [${result}]`);
console.log(`  ${nums[result[0]]} + ${nums[result[1]]} = ${target}`);

// 2. 빈도수 세기
function frequencyCount(arr) {
  const freq = new Map();
  for (const item of arr) {
    freq.set(item, (freq.get(item) || 0) + 1);
  }
  return freq;
}

console.log("\n=== 빈도수 세기 ===");
const fruits = ["사과", "바나나", "사과", "딸기", "바나나", "사과"];
const freq = frequencyCount(fruits);
for (const [item, count] of freq) {
  console.log(`  ${item}: ${"★".repeat(count)} (${count}개)`);
}

// 3. 가장 많이 등장한 요소
function topKFrequent(nums, k) {
  const freq = frequencyCount(nums);
  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(([val]) => val);
}

console.log("\n=== Top K 빈도 ===");
const data = [1, 1, 1, 2, 2, 3, 3, 3, 3, 4];
console.log(`  [${data}] 상위 2개: [${topKFrequent(data, 2)}]`);

// 4. 애너그램 그룹
function groupAnagrams(words) {
  const map = new Map();
  for (const word of words) {
    const key = [...word].sort().join("");
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(word);
  }
  return [...map.values()];
}

console.log("\n=== 애너그램 그룹 ===");
const words = ["eat", "tea", "tan", "ate", "nat", "bat"];
const groups = groupAnagrams(words);
groups.forEach((g, i) => console.log(`  그룹 ${i + 1}: [${g}]`));

// 5. 연속된 수열 찾기 (Longest Consecutive Sequence)
function longestConsecutive(nums) {
  const numSet = new Set(nums);
  let maxLen = 0;

  for (const num of numSet) {
    if (!numSet.has(num - 1)) { // 수열의 시작점
      let current = num;
      let len = 1;
      while (numSet.has(current + 1)) {
        current++;
        len++;
      }
      maxLen = Math.max(maxLen, len);
    }
  }
  return maxLen;
}

console.log("\n=== 가장 긴 연속 수열 ===");
const arr = [100, 4, 200, 1, 3, 2];
console.log(`  [${arr}] → 최대 길이: ${longestConsecutive(arr)} (1,2,3,4)`);

// 6. 서로 다른 문자 조합 검사 (isomorphic)
function isIsomorphic(s, t) {
  if (s.length !== t.length) return false;
  const mapST = new Map();
  const mapTS = new Map();

  for (let i = 0; i < s.length; i++) {
    if (mapST.has(s[i]) && mapST.get(s[i]) !== t[i]) return false;
    if (mapTS.has(t[i]) && mapTS.get(t[i]) !== s[i]) return false;
    mapST.set(s[i], t[i]);
    mapTS.set(t[i], s[i]);
  }
  return true;
}

console.log("\n=== 동형 문자열 ===");
const pairs = [["egg", "add"], ["foo", "bar"], ["paper", "title"]];
for (const [a, b] of pairs) {
  console.log(`  "${a}" ↔ "${b}": ${isIsomorphic(a, b) ? "O" : "X"}`);
}
