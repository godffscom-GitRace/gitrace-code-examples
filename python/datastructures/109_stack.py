# [109] 스택 (Stack) 구현
# 레벨: 3 | 스택 자료구조를 클래스로 직접 구현합니다

# Simple Stack Class (Beginner Friendly)

class Stack:
    def __init__(self):
        self.items = []

    def push(self, value):
        self.items.append(value)
        print(f"Push: {value}")

    def pop(self):
        if not self.items:
            print("Stack is empty!")
            return None
        value = self.items.pop()
        print(f"Pop: {value}")
        return value

    def peek(self):
        if not self.items:
            return None
        return self.items[-1]


print("📦 Stack Game\n")

stack = Stack()

stack.push("A")
stack.push("B")
stack.push("C")

print("\nTop:", stack.peek())

stack.pop()
stack.pop()

print("\nTop after pop:", stack.peek())

print("\n🎯 Try it yourself!")
stack.push(input("Enter a value: "))
print("Top now:", stack.peek())
