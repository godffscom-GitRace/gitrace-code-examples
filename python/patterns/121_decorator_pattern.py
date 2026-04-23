# [121] 데코레이터 패턴 (Decorator Pattern)
# 레벨: 4 | 객체에 동적으로 기능을 추가하는 구조적 패턴입니다

from abc import ABC, abstractmethod


class Coffee(ABC):
    @abstractmethod
    def cost(self):
        pass

    @abstractmethod
    def desc(self):
        pass


class BasicCoffee(Coffee):
    def cost(self):
        return 3000

    def desc(self):
        return "basic coffee"


class Espresso(Coffee):
    def cost(self):
        return 3500

    def desc(self):
        return "espresso"


class CoffeeDecorator(Coffee):
    def __init__(self, coffee):
        self.coffee = coffee

    def cost(self):
        return self.coffee.cost()

    def desc(self):
        return self.coffee.desc()


class Milk(CoffeeDecorator):
    def cost(self):
        return self.coffee.cost() + 500

    def desc(self):
        return self.coffee.desc() + " + milk"


class Syrup(CoffeeDecorator):
    def __init__(self, coffee, flavor="vanilla"):
        super().__init__(coffee)
        self.flavor = flavor

    def cost(self):
        return self.coffee.cost() + 300

    def desc(self):
        return self.coffee.desc() + " + " + self.flavor


class Whip(CoffeeDecorator):
    def cost(self):
        return self.coffee.cost() + 700

    def desc(self):
        return self.coffee.desc() + " + whip"


class Shot(CoffeeDecorator):
    def cost(self):
        return self.coffee.cost() + 500

    def desc(self):
        return self.coffee.desc() + " + shot"


print("=== COFFEE DECORATOR ===")

c1 = BasicCoffee()
print(c1.desc(), c1.cost())

c2 = Milk(BasicCoffee())
print(c2.desc(), c2.cost())

c3 = Syrup(Milk(BasicCoffee()), "caramel")
print(c3.desc(), c3.cost())

c4 = Shot(Whip(Syrup(Milk(Espresso()), "vanilla")))
print(c4.desc(), c4.cost())


class Text(ABC):
    @abstractmethod
    def render(self):
        pass


class Plain(Text):
    def __init__(self, t):
        self.t = t

    def render(self):
        return self.t


class TextDecorator(Text):
    def __init__(self, text):
        self.text = text


class Bold(TextDecorator):
    def render(self):
        return "<b>" + self.text.render() + "</b>"


class Italic(TextDecorator):
    def render(self):
        return "<i>" + self.text.render() + "</i>"


class Underline(TextDecorator):
    def render(self):
        return "<u>" + self.text.render() + "</u>"


class Color(TextDecorator):
    def __init__(self, text, color):
        super().__init__(text)
        self.color = color

    def render(self):
        return f"<span style='color:{self.color}'>" + self.text.render() + "</span>"


print("\n=== TEXT DECORATOR ===")

t = Plain("hello")

print(t.render())
print(Bold(t).render())
print(Italic(Bold(t)).render())
print(Color(Underline(Bold(Plain("IMPORTANT"))), "red").render())
