// ES6 Modules

const MathModule = (function() {
  const PI = 3.14159;
  return {
    PI: PI,
    add(a, b) { return a + b; },
    subtract(a, b) { return a - b; },
    circleArea(r) { return PI * r * r; }
  };
})();

console.log(MathModule.add(10, 5));
console.log(MathModule.PI);
console.log("circle r=5: " + MathModule.circleArea(5).toFixed(2));

const StringUtils = (function() {
  function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  function reverse(s) {
    let out = "";
    for (let i = s.length - 1; i >= 0; i--) {
      out += s[i];
    }
    return out;
  }
  function truncate(s, n) {
    if (s.length > n) return s.slice(0, n) + "...";
    return s;
  }
  return { capitalize: capitalize, reverse: reverse, truncate: truncate };
})();

console.log(StringUtils.capitalize("hello"));
console.log(StringUtils.reverse("abcde"));
console.log(StringUtils.truncate("long string here", 7));

const app = { math: MathModule, string: StringUtils };

console.log("sum: " + app.math.add(1, 2));
console.log("reversed: " + app.string.reverse("JavaScript"));
