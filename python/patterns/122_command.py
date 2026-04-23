# [122] 커맨드 패턴 (Command Pattern)
# 레벨: 5 | 요청을 객체로 캡슐화하여 실행 취소 등을 지원하는 패턴입니다

from abc import ABC, abstractmethod


class Command(ABC):
    @abstractmethod
    def execute(self):
        pass

    @abstractmethod
    def undo(self):
        pass


class TextEditor:
    def __init__(self):
        self.text = ""

    def insert(self, t):
        self.text += t

    def delete(self, n):
        removed = self.text[-n:]
        self.text = self.text[:-n]
        return removed


class InsertCommand(Command):
    def __init__(self, editor, text):
        self.editor = editor
        self.text = text

    def execute(self):
        self.editor.insert(self.text)

    def undo(self):
        self.editor.delete(len(self.text))


class DeleteCommand(Command):
    def __init__(self, editor, n):
        self.editor = editor
        self.n = n
        self.removed = ""

    def execute(self):
        self.removed = self.editor.delete(self.n)

    def undo(self):
        self.editor.insert(self.removed)


class Manager:
    def __init__(self):
        self.history = []
        self.redo = []

    def run(self, cmd):
        cmd.execute()
        self.history.append(cmd)
        self.redo.clear()

    def undo(self):
        if self.history:
            cmd = self.history.pop()
            cmd.undo()
            self.redo.append(cmd)

    def redo(self):
        if self.redo:
            cmd = self.redo.pop()
            cmd.execute()
            self.history.append(cmd)


print("=== COMMAND TEXT EDITOR ===")

editor = TextEditor()
m = Manager()

m.run(InsertCommand(editor, "Hello"))
m.run(InsertCommand(editor, " World"))
m.run(InsertCommand(editor, "!"))

print(editor.text)

m.undo()
print(editor.text)

m.undo()
print(editor.text)

m.redo()
print(editor.text)

m.run(DeleteCommand(editor, 6))
print(editor.text)

m.undo()
print(editor.text)


class Macro(Command):
    def __init__(self, cmds):
        self.cmds = cmds

    def execute(self):
        for c in self.cmds:
            c.execute()

    def undo(self):
        for c in reversed(self.cmds):
            c.undo()


print("\n=== MACRO ===")

editor2 = TextEditor()
m2 = Manager()

macro = Macro([
    InsertCommand(editor2, "Py"),
    InsertCommand(editor2, "thon")
])

m2.run(macro)
print(editor2.text)

m2.undo()
print(editor2.text)


class Calculator:
    def __init__(self):
        self.v = 0


class Add(Command):
    def __init__(self, calc, n):
        self.calc = calc
        self.n = n

    def execute(self):
        self.calc.v += self.n

    def undo(self):
        self.calc.v -= self.n


class Mul(Command):
    def __init__(self, calc, n):
        self.calc = calc
        self.n = n

    def execute(self):
        self.calc.v *= self.n

    def undo(self):
        self.calc.v //= self.n


print("\n=== CALCULATOR ===")

calc = Calculator()
m3 = Manager()

m3.run(Add(calc, 10))
m3.run(Mul(calc, 3))
m3.run(Add(calc, 5))

print(calc.v)

m3.undo()
print(calc.v)

m3.undo()
print(calc.v)
