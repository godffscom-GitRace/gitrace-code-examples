# [121] 데코레이터 패턴 (Decorator Pattern)
# 레벨: 4 | 객체에 동적으로 기능을 추가하는 구조적 패턴입니다

from abc import ABC, abstractmethod

# 컴포넌트 인터페이스
class Coffee(ABC):
    @abstractmethod
    def cost(self):
        pass

    @abstractmethod
    def description(self):
        pass

# 기본 컴포넌트
class BasicCoffee(Coffee):
    def cost(self):
        return 3000

    def description(self):
        return "기본 커피"

class Espresso(Coffee):
    def cost(self):
        return 3500

    def description(self):
        return "에스프레소"

# 데코레이터 베이스
class CoffeeDecorator(Coffee):
    def __init__(self, coffee):
        self._coffee = coffee

    def cost(self):
        return self._coffee.cost()

    def description(self):
        return self._coffee.description()

# 구체적 데코레이터들
class MilkDecorator(CoffeeDecorator):
    def cost(self):
        return self._coffee.cost() + 500

    def description(self):
        return self._coffee.description() + " + 우유"

class SyrupDecorator(CoffeeDecorator):
    def __init__(self, coffee, flavor="바닐라"):
        super().__init__(coffee)
        self.flavor = flavor

    def cost(self):
        return self._coffee.cost() + 300

    def description(self):
        return self._coffee.description() + f" + {self.flavor}시럽"

class WhipDecorator(CoffeeDecorator):
    def cost(self):
        return self._coffee.cost() + 700

    def description(self):
        return self._coffee.description() + " + 휘핑크림"

class ShotDecorator(CoffeeDecorator):
    def cost(self):
        return self._coffee.cost() + 500

    def description(self):
        return self._coffee.description() + " + 샷추가"

# 사용
print("=== 데코레이터 패턴 - 커피 ===")

# 기본 커피
coffee = BasicCoffee()
print(f"  {coffee.description()}: {coffee.cost():,}원")

# 카페라떼 (커피 + 우유)
latte = MilkDecorator(BasicCoffee())
print(f"  {latte.description()}: {latte.cost():,}원")

# 바닐라 라떼 (커피 + 우유 + 바닐라시럽)
vanilla_latte = SyrupDecorator(MilkDecorator(BasicCoffee()), "바닐라")
print(f"  {vanilla_latte.description()}: {vanilla_latte.cost():,}원")

# 풀옵션 (에스프레소 + 우유 + 시럽 + 휘핑 + 샷)
full = ShotDecorator(
    WhipDecorator(
        SyrupDecorator(
            MilkDecorator(Espresso()),
            "카라멜"
        )
    )
)
print(f"  {full.description()}: {full.cost():,}원")

# 텍스트 포매팅 예제
print("\n=== 데코레이터 패턴 - 텍스트 ===")

class Text(ABC):
    @abstractmethod
    def render(self):
        pass

class PlainText(Text):
    def __init__(self, content):
        self.content = content

    def render(self):
        return self.content

class TextDecorator(Text):
    def __init__(self, text):
        self._text = text

class BoldDecorator(TextDecorator):
    def render(self):
        return f"<b>{self._text.render()}</b>"

class ItalicDecorator(TextDecorator):
    def render(self):
        return f"<i>{self._text.render()}</i>"

class UnderlineDecorator(TextDecorator):
    def render(self):
        return f"<u>{self._text.render()}</u>"

class ColorDecorator(TextDecorator):
    def __init__(self, text, color):
        super().__init__(text)
        self.color = color

    def render(self):
        return f'<span style="color:{self.color}">{self._text.render()}</span>'

# 텍스트 조합
plain = PlainText("안녕하세요")
bold = BoldDecorator(plain)
bold_italic = ItalicDecorator(BoldDecorator(plain))
styled = ColorDecorator(
    UnderlineDecorator(BoldDecorator(PlainText("중요!"))),
    "red"
)

print(f"  일반: {plain.render()}")
print(f"  굵게: {bold.render()}")
print(f"  굵게+기울임: {bold_italic.render()}")
print(f"  스타일: {styled.render()}")
