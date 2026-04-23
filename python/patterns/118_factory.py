# [118] 팩토리 패턴 (Factory Pattern)
# 레벨: 4 | 객체 생성을 서브클래스에 위임하는 패턴입니다

from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def speak(self):
        pass


class Dog(Animal):
    def __init__(self, name):
        self.name = name

    def speak(self):
        return self.name + " bark"


class Cat(Animal):
    def __init__(self, name):
        self.name = name

    def speak(self):
        return self.name + " meow"


class Bird(Animal):
    def __init__(self, name):
        self.name = name

    def speak(self):
        return self.name + " chirp"


class AnimalFactory:
    @staticmethod
    def create(kind, name):
        mapping = {
            "dog": Dog,
            "cat": Cat,
            "bird": Bird
        }
        if kind not in mapping:
            raise ValueError("unknown animal")
        return mapping[kind](name)


print("=== SIMPLE FACTORY ===")
animals = [
    AnimalFactory.create("dog", "A"),
    AnimalFactory.create("cat", "B"),
    AnimalFactory.create("bird", "C"),
]

for a in animals:
    print(a.speak())


class Document(ABC):
    @abstractmethod
    def render(self):
        pass


class PDF(Document):
    def render(self):
        return "PDF"


class HTML(Document):
    def render(self):
        return "HTML"


class Creator(ABC):
    @abstractmethod
    def create(self):
        pass

    def run(self):
        return self.create().render()


class PDFCreator(Creator):
    def create(self):
        return PDF()


class HTMLCreator(Creator):
    def create(self):
        return HTML()


print("\n=== FACTORY METHOD ===")
for c in [PDFCreator(), HTMLCreator()]:
    print(c.run())


class Button(ABC):
    @abstractmethod
    def click(self):
        pass


class DarkButton(Button):
    def click(self):
        return "dark click"


class LightButton(Button):
    def click(self):
        return "light click"


class UIFactory(ABC):
    @abstractmethod
    def create_button(self):
        pass


class DarkFactory(UIFactory):
    def create_button(self):
        return DarkButton()


class LightFactory(UIFactory):
    def create_button(self):
        return LightButton()


print("\n=== ABSTRACT FACTORY ===")
for f in [DarkFactory(), LightFactory()]:
    print(f.create_button().click())
