# [17] 상속과 오버라이딩 - Inheritance
# 레벨: 4 | 기존 클래스를 확장하는 상속을 학습합니다

# 부모 클래스
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "..."

class Dog(Animal):
    def speak(self):
        return "woof"

class Cat(Animal):
    def speak(self):
        return "meow"

dog = Dog("Buddy")
cat = Cat("Kitty")

print(dog.name, dog.speak())
print(cat.name, cat.speak())

animals = [dog, cat]

print("\nall sounds:")
for a in animals:
    print(a.name, a.speak())
