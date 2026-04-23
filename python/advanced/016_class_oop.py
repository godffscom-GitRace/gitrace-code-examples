# [16] 클래스와 객체 - Class & OOP
# 레벨: 4 | 객체지향 프로그래밍의 기초인 클래스를 배웁니다

# class 키워드로 클래스 정의
class Student:
    def __init__(self, name):
        self.name = name
        self.scores = []

    def add(self, score):
        self.scores.append(score)

    def avg(self):
        return sum(self.scores) / len(self.scores)

    def info(self):
        return f"{self.name}: {round(self.avg(), 1)}"

s = Student("Tom")
s.add(80)
s.add(90)

print(s.info())

class Book:
    def __init__(self, title):
        self.title = title

    def __str__(self):
        return f"Book: {self.title}"

b = Book("Python")
print(b)
