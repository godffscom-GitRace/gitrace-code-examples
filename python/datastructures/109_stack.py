# [109] 스택 (Stack) 구현
# 레벨: 3 | 스택 자료구조를 클래스로 직접 구현합니다

class Stack:
    def __init__(self):
        self._items = []

    def push(self, item):
        self._items.append(item)

    def pop(self):
        if self.is_empty():
            raise IndexError("스택이 비어있습니다")
        return self._items.pop()

    def peek(self):
        if self.is_empty():
            raise IndexError("스택이 비어있습니다")
        return self._items[-1]

    def is_empty(self):
        return len(self._items) == 0

    def size(self):
        return len(self._items)

    def __str__(self):
        return f"Stack({self._items})"

# 기본 사용
stack = Stack()
stack.push(10)
stack.push(20)
stack.push(30)
print(f"스택: {stack}")          # [10, 20, 30]
print(f"peek: {stack.peek()}")   # 30
print(f"pop: {stack.pop()}")     # 30
print(f"크기: {stack.size()}")   # 2

# 활용 1: 괄호 유효성 검사
def is_valid_brackets(s):
    stack = Stack()
    pairs = {')': '(', ']': '[', '}': '{'}
    for char in s:
        if char in '([{':
            stack.push(char)
        elif char in ')]}':
            if stack.is_empty() or stack.pop() != pairs[char]:
                return False
    return stack.is_empty()

print("\n=== 괄호 검사 ===")
tests = ["(())", "([{}])", "(]", "(()", "{[}]"]
for t in tests:
    print(f"  '{t}' → {'유효' if is_valid_brackets(t) else '무효'}")

# 활용 2: 문자열 뒤집기
def reverse_string(s):
    stack = Stack()
    for ch in s:
        stack.push(ch)
    result = ""
    while not stack.is_empty():
        result += stack.pop()
    return result

print(f"\n뒤집기: {reverse_string('Hello')}")  # olleH
