// Sort Comparison

function bubbleSort(arr) {
  const a = arr.slice();
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      if (a[j] > a[j + 1]) {
        const t = a[j];
        a[j] = a[j + 1];
        a[j + 1] = t;
      }
    }
  }
  return a;
}

function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const p = arr[0];
  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < p) left.push(arr[i]);
    else right.push(arr[i]);
  }

  return quickSort(left).concat([p], quickSort(right));
}

const data = [5, 3, 8, 4, 2];

console.log("bubble: " + bubbleSort(data).join(" "));
console.log("quick: " + quickSort(data).join(" "));
