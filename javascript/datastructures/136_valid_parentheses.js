// Valid Parentheses

class Stack {
  constructor() {
    this.items = [];
  }
  push(x) {
    this.items.push(x);
  }
  pop() {
    return this.items.pop();
  }
  isEmpty() {
    return this.items.length === 0;
  }
}

function isValid(s) {
  const stack = new Stack();
  const pairs = { ")": "(", "]": "[", "}": "{" };

  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === "(" || c === "[" || c === "{") {
      stack.push(c);
    } else {
      if (stack.isEmpty() || stack.pop() !== pairs[c]) {
        return false;
      }
    }
  }
  return stack.isEmpty();
}

const tests = ["()", "()[]{}", "(]", "([)]", "{[()]}"];

for (let i = 0; i < tests.length; i++) {
  const t = tests[i];
  const ok = isValid(t) ? "O" : "X";
  console.log(ok + " " + t);
}
