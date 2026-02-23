// [9] 클래스와 생성자 - Class & Constructor
// 레벨: 3 | C#의 클래스와 생성자를 마스터합니다

using System;
using System.Collections.Generic;

namespace ClassConstructor
{
    class Program
    {
        static void Main(string[] args)
        {
            // 기본 생성자
            var s1 = new Student();
            s1.PrintInfo();

            // 매개변수 있는 생성자
            var s2 = new Student("김철수", 20, "컴퓨터공학");
            s2.AddScore(85);
            s2.AddScore(92);
            s2.AddScore(78);
            s2.PrintInfo();

            // 생성자 체이닝 (this)
            var s3 = new Student("이영희");
            s3.PrintInfo();

            // 객체 초기화 구문
            var s4 = new Student("박민수", 22, "경영학")
            {
                StudentId = "2024001"
            };
            s4.PrintInfo();

            Console.WriteLine($"\n총 학생 수: {Student.Count}");
        }
    }

    class Student
    {
        // 필드
        private List<int> _scores = new List<int>();

        // 프로퍼티
        public string Name { get; set; }
        public int Age { get; set; }
        public string Major { get; set; }
        public string StudentId { get; set; } = "";

        // 정적 필드
        public static int Count { get; private set; } = 0;

        // 기본 생성자
        public Student()
        {
            Name = "미정";
            Age = 0;
            Major = "미정";
            Count++;
        }

        // 생성자 오버로딩 + this로 체이닝
        public Student(string name) : this()
        {
            Name = name;
        }

        // 매개변수 있는 생성자
        public Student(string name, int age, string major)
        {
            Name = name;
            Age = age;
            Major = major;
            Count++;
        }

        // 메서드
        public void AddScore(int score)
        {
            _scores.Add(score);
        }

        public double GetAverage()
        {
            if (_scores.Count == 0) return 0;
            int sum = 0;
            foreach (int s in _scores) sum += s;
            return (double)sum / _scores.Count;
        }

        public void PrintInfo()
        {
            Console.WriteLine($"\n=== {Name} ===");
            Console.WriteLine($"나이: {Age}살 | 전공: {Major}");
            if (StudentId != "") Console.WriteLine($"학번: {StudentId}");
            Console.WriteLine($"평균: {GetAverage():F1}점");
        }
    }
}
