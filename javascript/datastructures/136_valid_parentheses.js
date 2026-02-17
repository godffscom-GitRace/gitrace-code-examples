// [136] 스택으로 괄호 검사 (Valid Parentheses)
// 레벨: 3 | 스택을 사용해 괄호가 올바르게 닫혔는지 검사합니다

// 스택 구현
class Stack {
  constructor() {
    this.items = [];
  }
  push(item) { this.items.push(item); }
  pop() { return this.items.pop(); }
  peek() { return this.items[this.items.length - 1]; }
  isEmpty() { return this.items.length === 0; }
  get size() { return this.items.length; }
}

// 기본 괄호 검사
function isValid(s) {
  const stack = new Stack();
  const pairs = { ")": "(", "]": "[", "}": "{" };

  for (const char of s) {
    if ("([{".includes(char)) {
      stack.push(char);
    } else if (")]}" .includes(char)) {
      if (stack.isEmpty() || stack.pop() !== pairs[char]) {
        return false;
      }
    }
  }
  return stack.isEmpty();
}

console.log("=== 괄호 검사 ===");
const tests = [
  "()",       // true
  "()[]{}",   // true
  "(]",       // false
  "([)]",     // false
  "{[()]}",   // true
  "",         // true
  "(((",      // false
];

for (const t of tests) {
  const result = isValid(t);
  console.log(`  [${result ? "O" : "X"}] "${t || "(빈 문자열)"}"`);
}

// 괄호 위치 찾기 (어디서 틀렸는지)
function findInvalidPosition(s) {
  const stack = []; // { char, index }
  for (let i = 0; i < s.length; i++) {
    if ("([{".includes(s[i])) {
      stack.push({ char: s[i], index: i });
    } else if (")]}".includes(s[i])) {
      const pairs = { ")": "(", "]": "[", "}": "{" };
      if (stack.length === 0) return { index: i, reason: "짝이 없는 닫는 괄호" };
      if (stack[stack.length - 1].char !== pairs[s[i]]) {
        return { index: i, reason: `'${stack[stack.length - 1].char}'에 대해 '${s[i]}'가 매칭되지 않음` };
      }
      stack.pop();
    }
  }
  if (stack.length > 0) {
    return { index: stack[stack.length - 1].index, reason: "닫히지 않은 여는 괄호" };
  }
  return null;
}

console.log("\n=== 오류 위치 찾기 ===");
const invalid = ["(]", "({[})", "(()", "abc)"];
for (const s of invalid) {
  const err = findInvalidPosition(s);
  if (err) {
    console.log(`  "${s}" → 위치 ${err.index}: ${err.reason}`);
  }
}

// HTML 태그 검사
function isValidHTML(html) {
  const stack = [];
  const tagRegex = /<\/?([a-z]+)>/g;
  let match;

  while ((match = tagRegex.exec(html)) !== null) {
    const [fullTag, tagName] = match;
    if (!fullTag.startsWith("</")) {
      stack.push(tagName);
    } else {
      if (stack.length === 0 || stack.pop() !== tagName) return false;
    }
  }
  return stack.length === 0;
}

console.log("\n=== HTML 태그 검사 ===");
const htmlTests = [
  "<div><p>hello</p></div>",
  "<div><p>hello</div></p>",
  "<b><i>text</i></b>",
];
for (const h of htmlTests) {
  console.log(`  [${isValidHTML(h) ? "O" : "X"}] ${h}`);
}

// 수식 계산 (후위 표기법)
function evalPostfix(expression) {
  const stack = new Stack();
  const tokens = expression.split(" ");

  for (const token of tokens) {
    if ("+-*/".includes(token)) {
      const b = stack.pop();
      const a = stack.pop();
      switch (token) {
        case "+": stack.push(a + b); break;
        case "-": stack.push(a - b); break;
        case "*": stack.push(a * b); break;
        case "/": stack.push(Math.trunc(a / b)); break;
      }
    } else {
      stack.push(Number(token));
    }
  }
  return stack.pop();
}

console.log("\n=== 후위 표기법 계산 ===");
console.log(`  "3 4 + 2 *" = ${evalPostfix("3 4 + 2 *")}`);   // (3+4)*2 = 14
console.log(`  "5 1 2 + 4 * + 3 -" = ${evalPostfix("5 1 2 + 4 * + 3 -")}`);  // 14
