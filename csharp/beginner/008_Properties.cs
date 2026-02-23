// [8] 프로퍼티 (Properties) - Properties
// 레벨: 2 | C# 고유의 프로퍼티 문법을 학습합니다

using System;

namespace Properties
{
    class Program
    {
        static void Main(string[] args)
        {
            // 객체 생성 및 프로퍼티 사용
            Student s1 = new Student("김철수", 20);
            Console.WriteLine(s1.Name);      // get 호출
            Console.WriteLine(s1.Age);
            Console.WriteLine(s1.Info);       // 표현식 본문 프로퍼티

            s1.Age = 21;                      // set 호출
            Console.WriteLine($"변경 후: {s1.Age}살");

            // s1.Name = "이영희";            // Error! private set

            // 나이 유효성 검사
            s1.Age = -5;                      // set에서 검증 → 무시됨
            Console.WriteLine($"잘못된 값 후: {s1.Age}살"); // 여전히 21

            // 객체 초기화 구문
            var s2 = new Product
            {
                Name = "노트북",
                Price = 1500000
            };
            Console.WriteLine($"\n{s2.Name}: {s2.FormattedPrice}");
            Console.WriteLine($"할인가: {s2.GetDiscountPrice(0.1):N0}원");
        }
    }

    class Student
    {
        // 자동 프로퍼티 + private set
        public string Name { get; private set; }

        // get, set 접근자 (유효성 검사)
        private int _age;
        public int Age
        {
            get { return _age; }
            set
            {
                if (value > 0 && value < 150)
                    _age = value;
            }
        }

        // 표현식 본문 프로퍼티 (읽기 전용)
        public string Info => $"{Name}, {Age}살";

        public Student(string name, int age)
        {
            Name = name;
            Age = age;
        }
    }

    class Product
    {
        // 자동 프로퍼티
        public string Name { get; set; } = "";
        public int Price { get; set; }

        // 읽기 전용 표현식 본문
        public string FormattedPrice => $"{Price:N0}원";

        public double GetDiscountPrice(double rate)
        {
            return Price * (1 - rate);
        }
    }
}
