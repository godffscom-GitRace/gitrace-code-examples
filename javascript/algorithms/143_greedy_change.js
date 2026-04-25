// Greedy Coin Change

function coinChange(amount, coins) {
  coins.sort((a, b) => b - a);
  let rem = amount;
  let out = "";

  for (let i = 0; i < coins.length; i++) {
    const c = coins[i];
    const cnt = Math.floor(rem / c);
    if (cnt > 0) {
      out += c + "x" + cnt + " ";
      rem -= c * cnt;
    }
  }

  return out.trim();
}

const coins = [500, 100, 50, 10];

console.log("1260:");
console.log(coinChange(1260, coins));

console.log("880:");
console.log(coinChange(880, coins));
