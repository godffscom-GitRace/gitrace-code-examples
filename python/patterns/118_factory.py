# [118] 팩토리 패턴 (Factory Pattern)
# 레벨: 4 | 객체 생성을 서브클래스에 위임하는 패턴입니다

from abc import ABC, abstractmethod

# 제품 인터페이스
class Animal(ABC):
    @abstractmethod
    def speak(self):
        pass

    @abstractmethod
    def info(self):
        pass

# 구체적 제품들
class Dog(Animal):
    def __init__(self, name):
        self.name = name

    def speak(self):
        return f"{self.name}: 멍멍!"

    def info(self):
        return f"개 - {self.name}"

class Cat(Animal):
    def __init__(self, name):
        self.name = name

    def speak(self):
        return f"{self.name}: 야옹~"

    def info(self):
        return f"고양이 - {self.name}"

class Bird(Animal):
    def __init__(self, name):
        self.name = name

    def speak(self):
        return f"{self.name}: 짹짹!"

    def info(self):
        return f"새 - {self.name}"

# 심플 팩토리
class AnimalFactory:
    @staticmethod
    def create(animal_type, name):
        factories = {
            "dog": Dog,
            "cat": Cat,
            "bird": Bird,
        }
        cls = factories.get(animal_type.lower())
        if cls is None:
            raise ValueError(f"알 수 없는 동물: {animal_type}")
        return cls(name)

print("=== 심플 팩토리 ===")
animals = [
    AnimalFactory.create("dog", "바둑이"),
    AnimalFactory.create("cat", "나비"),
    AnimalFactory.create("bird", "짹짹이"),
]
for animal in animals:
    print(f"  {animal.info()} → {animal.speak()}")

# 팩토리 메서드 패턴
class Document(ABC):
    @abstractmethod
    def render(self):
        pass

class PDFDocument(Document):
    def render(self):
        return "PDF 문서 렌더링"

class HTMLDocument(Document):
    def render(self):
        return "HTML 문서 렌더링"

class MarkdownDocument(Document):
    def render(self):
        return "Markdown 문서 렌더링"

class DocumentCreator(ABC):
    @abstractmethod
    def create_document(self):
        pass

    def process(self):
        doc = self.create_document()
        return doc.render()

class PDFCreator(DocumentCreator):
    def create_document(self):
        return PDFDocument()

class HTMLCreator(DocumentCreator):
    def create_document(self):
        return HTMLDocument()

class MarkdownCreator(DocumentCreator):
    def create_document(self):
        return MarkdownDocument()

print("\n=== 팩토리 메서드 ===")
creators = [PDFCreator(), HTMLCreator(), MarkdownCreator()]
for creator in creators:
    print(f"  {creator.process()}")

# 추상 팩토리 - UI 테마
class Button(ABC):
    @abstractmethod
    def click(self): pass

class TextBox(ABC):
    @abstractmethod
    def input(self, text): pass

class DarkButton(Button):
    def click(self): return "[Dark 버튼] 클릭"

class DarkTextBox(TextBox):
    def input(self, text): return f"[Dark 입력] {text}"

class LightButton(Button):
    def click(self): return "[Light 버튼] 클릭"

class LightTextBox(TextBox):
    def input(self, text): return f"[Light 입력] {text}"

class UIFactory(ABC):
    @abstractmethod
    def create_button(self): pass
    @abstractmethod
    def create_textbox(self): pass

class DarkThemeFactory(UIFactory):
    def create_button(self): return DarkButton()
    def create_textbox(self): return DarkTextBox()

class LightThemeFactory(UIFactory):
    def create_button(self): return LightButton()
    def create_textbox(self): return LightTextBox()

print("\n=== 추상 팩토리 (UI 테마) ===")
for factory in [DarkThemeFactory(), LightThemeFactory()]:
    btn = factory.create_button()
    txt = factory.create_textbox()
    print(f"  {btn.click()} | {txt.input('안녕하세요')}")
