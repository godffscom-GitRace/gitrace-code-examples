# [16] 클래스와 객체 - Class & OOP
# 레벨: 4 | 객체지향 프로그래밍의 기초인 클래스를 배웁니다

# class 키워드로 클래스 정의
class Student:
    # __init__ 생성자 - 객체 생성 시 호출
    def __init__(self, name, grade):
        self.name = name      # 인스턴스 변수
        self.grade = grade
        self.scores = []

    # 메서드 정의
    def add_score(self, score):
        self.scores.append(score)

    def average(self):
        if not self.scores:
            return 0
        return sum(self.scores) / len(self.scores)

    def info(self):
        avg = self.average()
        return f"{self.name} ({self.grade}학년) - 평균: {avg:.1f}점"

# 인스턴스 생성
s1 = Student("김철수", 2)
s1.add_score(85)
s1.add_score(92)
s1.add_score(78)
print(s1.info())  # 김철수 (2학년) - 평균: 85.0점

s2 = Student("이영희", 3)
s2.add_score(95)
s2.add_score(88)
print(s2.info())  # 이영희 (3학년) - 평균: 91.5점

# __str__ 매직 메서드
class Book:
    def __init__(self, title, author, price):
        self.title = title
        self.author = author
        self.price = price

    def __str__(self):
        return f"'{self.title}' by {self.author} ({self.price}원)"

    def discount(self, percent):
        return int(self.price * (1 - percent / 100))

book = Book("파이썬 입문", "홍길동", 25000)
print(book)  # '파이썬 입문' by 홍길동 (25000원)
print(f"20% 할인가: {book.discount(20)}원")
