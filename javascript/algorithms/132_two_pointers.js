// [132] 두 포인터 기법 (Two Pointers)
// 레벨: 3 | 배열 양쪽에서 접근하여 효율적으로 문제를 해결합니다

// 1. 두 수의 합 (정렬된 배열)
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

console.log("=== 두 수의 합 ===");
const sorted = [1, 3, 5, 7, 11, 15, 20];
console.log(`배열: [${sorted}]`);
for (const target of [12, 26, 100]) {
  const result = twoSum(sorted, target);
  if (result) {
    console.log(`  합=${target} → [${result}] (${sorted[result[0]]}+${sorted[result[1]]})`);
  } else {
    console.log(`  합=${target} → 없음`);
  }
}

// 2. 팰린드롬 검사
function isPalindrome(s) {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  let left = 0, right = clean.length - 1;
  while (left < right) {
    if (clean[left] !== clean[right]) return false;
    left++;
    right--;
  }
  return true;
}

console.log("\n=== 팰린드롬 검사 ===");
const words = ["racecar", "hello", "A man a plan a canal Panama", "Was It A Car"];
for (const w of words) {
  console.log(`  [${isPalindrome(w) ? "O" : "X"}] "${w}"`);
}

// 3. 배열에서 중복 제거 (in-place)
function removeDuplicates(arr) {
  if (arr.length === 0) return 0;
  let slow = 0;
  for (let fast = 1; fast < arr.length; fast++) {
    if (arr[fast] !== arr[slow]) {
      slow++;
      arr[slow] = arr[fast];
    }
  }
  return slow + 1;
}

console.log("\n=== 중복 제거 (in-place) ===");
const nums = [1, 1, 2, 2, 3, 4, 4, 5];
console.log(`  원본: [${nums}]`);
const len = removeDuplicates(nums);
console.log(`  결과: [${nums.slice(0, len)}] (${len}개)`);

// 4. 물 담기 (Container With Most Water)
function maxWater(heights) {
  let left = 0, right = heights.length - 1;
  let maxArea = 0;

  while (left < right) {
    const width = right - left;
    const height = Math.min(heights[left], heights[right]);
    const area = width * height;
    maxArea = Math.max(maxArea, area);

    if (heights[left] < heights[right]) left++;
    else right--;
  }
  return maxArea;
}

console.log("\n=== 물 담기 ===");
const heights = [1, 8, 6, 2, 5, 4, 8, 3, 7];
console.log(`  높이: [${heights}]`);
console.log(`  최대 넓이: ${maxWater(heights)}`);

// 5. 세 수의 합 (3Sum)
function threeSum(arr, target) {
  arr.sort((a, b) => a - b);
  const results = [];

  for (let i = 0; i < arr.length - 2; i++) {
    if (i > 0 && arr[i] === arr[i - 1]) continue; // 중복 건너뛰기
    let left = i + 1, right = arr.length - 1;

    while (left < right) {
      const sum = arr[i] + arr[left] + arr[right];
      if (sum === target) {
        results.push([arr[i], arr[left], arr[right]]);
        while (left < right && arr[left] === arr[left + 1]) left++;
        while (left < right && arr[right] === arr[right - 1]) right--;
        left++;
        right--;
      } else if (sum < target) left++;
      else right--;
    }
  }
  return results;
}

console.log("\n=== 세 수의 합 = 0 ===");
const arr3 = [-1, 0, 1, 2, -1, -4];
console.log(`  배열: [${arr3}]`);
const triples = threeSum(arr3, 0);
triples.forEach(t => console.log(`  [${t}]`));
