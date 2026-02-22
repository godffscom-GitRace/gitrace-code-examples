# [17] 상속과 오버라이딩 - Inheritance
# 레벨: 4 | 기존 클래스를 확장하는 상속을 학습합니다

# 부모 클래스
class Animal:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def speak(self):
        return "..."

    def info(self):
        return f"{self.name} ({self.age}살)"

# 자식 클래스 - 상속
class Dog(Animal):
    def __init__(self, name, age, breed):
        super().__init__(name, age)  # 부모 생성자 호출
        self.breed = breed

    # 메서드 오버라이딩
    def speak(self):
        return "멍멍!"

    def info(self):
        return f"{super().info()} - {self.breed}"

class Cat(Animal):
    def __init__(self, name, age, indoor):
        super().__init__(name, age)
        self.indoor = indoor

    def speak(self):
        return "야옹~"

    def info(self):
        status = "실내" if self.indoor else "실외"
        return f"{super().info()} - {status}"

# 인스턴스 생성
dog = Dog("바둑이", 3, "진돗개")
cat = Cat("나비", 2, True)

print(dog.info())    # 바둑이 (3살) - 진돗개
print(dog.speak())   # 멍멍!
print(cat.info())    # 나비 (2살) - 실내
print(cat.speak())   # 야옹~

# 다형성 - 같은 메서드, 다른 동작
animals = [dog, cat, Dog("초코", 1, "푸들")]
print("\n=== 동물 소리 ===")
for animal in animals:
    print(f"{animal.name}: {animal.speak()}")

# isinstance() 타입 확인
print(f"\ndog은 Animal? {isinstance(dog, Animal)}")  # True
print(f"cat은 Dog? {isinstance(cat, Dog)}")          # False
