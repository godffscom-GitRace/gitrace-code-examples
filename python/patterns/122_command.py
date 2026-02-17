# [122] 커맨드 패턴 (Command Pattern)
# 레벨: 5 | 요청을 객체로 캡슐화하여 실행 취소 등을 지원하는 패턴입니다

from abc import ABC, abstractmethod

# 커맨드 인터페이스
class Command(ABC):
    @abstractmethod
    def execute(self):
        pass

    @abstractmethod
    def undo(self):
        pass

# 리시버 - 텍스트 에디터
class TextEditor:
    def __init__(self):
        self.text = ""

    def insert(self, text):
        self.text += text

    def delete(self, count):
        removed = self.text[-count:]
        self.text = self.text[:-count]
        return removed

    def __str__(self):
        return f'"{self.text}"'

# 구체적 커맨드들
class InsertCommand(Command):
    def __init__(self, editor, text):
        self.editor = editor
        self.text = text

    def execute(self):
        self.editor.insert(self.text)

    def undo(self):
        self.editor.delete(len(self.text))

class DeleteCommand(Command):
    def __init__(self, editor, count):
        self.editor = editor
        self.count = count
        self.deleted = ""

    def execute(self):
        self.deleted = self.editor.delete(self.count)

    def undo(self):
        self.editor.insert(self.deleted)

# 인보커 - 커맨드 관리자
class CommandManager:
    def __init__(self):
        self.history = []
        self.redo_stack = []

    def execute(self, command):
        command.execute()
        self.history.append(command)
        self.redo_stack.clear()

    def undo(self):
        if not self.history:
            print("  되돌릴 작업이 없습니다")
            return
        command = self.history.pop()
        command.undo()
        self.redo_stack.append(command)

    def redo(self):
        if not self.redo_stack:
            print("  다시 실행할 작업이 없습니다")
            return
        command = self.redo_stack.pop()
        command.execute()
        self.history.append(command)

# 사용
print("=== 커맨드 패턴 - 텍스트 에디터 ===")
editor = TextEditor()
manager = CommandManager()

# 텍스트 입력
manager.execute(InsertCommand(editor, "Hello"))
print(f"  입력 후: {editor}")

manager.execute(InsertCommand(editor, " World"))
print(f"  입력 후: {editor}")

manager.execute(InsertCommand(editor, "!"))
print(f"  입력 후: {editor}")

# Undo
print("\n--- Undo ---")
manager.undo()
print(f"  Undo 1: {editor}")
manager.undo()
print(f"  Undo 2: {editor}")

# Redo
print("\n--- Redo ---")
manager.redo()
print(f"  Redo: {editor}")

# 삭제 후 Undo
manager.execute(DeleteCommand(editor, 5))
print(f"\n5글자 삭제: {editor}")
manager.undo()
print(f"삭제 Undo: {editor}")

# 매크로 커맨드 (여러 커맨드를 하나로 묶기)
class MacroCommand(Command):
    def __init__(self, commands):
        self.commands = commands

    def execute(self):
        for cmd in self.commands:
            cmd.execute()

    def undo(self):
        for cmd in reversed(self.commands):
            cmd.undo()

print("\n=== 매크로 커맨드 ===")
editor2 = TextEditor()
manager2 = CommandManager()

# "Python" 입력을 매크로로
macro = MacroCommand([
    InsertCommand(editor2, "Py"),
    InsertCommand(editor2, "th"),
    InsertCommand(editor2, "on"),
])

manager2.execute(macro)
print(f"  매크로 실행: {editor2}")
manager2.undo()
print(f"  매크로 Undo: {editor2}")

# 계산기 예제
print("\n=== 커맨드 패턴 - 계산기 ===")

class Calculator:
    def __init__(self):
        self.value = 0

class AddCommand(Command):
    def __init__(self, calc, amount):
        self.calc = calc
        self.amount = amount

    def execute(self):
        self.calc.value += self.amount

    def undo(self):
        self.calc.value -= self.amount

class MultiplyCommand(Command):
    def __init__(self, calc, factor):
        self.calc = calc
        self.factor = factor

    def execute(self):
        self.calc.value *= self.factor

    def undo(self):
        self.calc.value //= self.factor

calc = Calculator()
mgr = CommandManager()

mgr.execute(AddCommand(calc, 10))
print(f"  +10 = {calc.value}")
mgr.execute(MultiplyCommand(calc, 3))
print(f"  ×3  = {calc.value}")
mgr.execute(AddCommand(calc, 5))
print(f"  +5  = {calc.value}")

mgr.undo()
print(f"  Undo = {calc.value}")
mgr.undo()
print(f"  Undo = {calc.value}")
