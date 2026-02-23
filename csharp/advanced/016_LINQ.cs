// [16] LINQ 기초 - LINQ Basics
// 레벨: 4 | C#의 LINQ로 데이터 쿼리를 마스터합니다

using System;
using System.Collections.Generic;
using System.Linq;

namespace LINQBasics
{
    class Program
    {
        static void Main(string[] args)
        {
            var students = new List<Student>
            {
                new Student("김철수", 85, "컴공"),
                new Student("이영희", 92, "경영"),
                new Student("박민수", 78, "컴공"),
                new Student("최지은", 95, "수학"),
                new Student("정하늘", 62, "경영"),
                new Student("한솔", 88, "컴공"),
            };

            // === 메서드 구문 ===
            Console.WriteLine("=== Where (필터링) ===");
            var passed = students.Where(s => s.Score >= 80);
            foreach (var s in passed)
                Console.WriteLine($"  {s.Name}: {s.Score}점");

            // Select (변환)
            Console.WriteLine("\n=== Select (변환) ===");
            var names = students.Select(s => s.Name);
            Console.WriteLine($"이름: {string.Join(", ", names)}");

            // OrderBy (정렬)
            Console.WriteLine("\n=== OrderBy (정렬) ===");
            var sorted = students.OrderByDescending(s => s.Score);
            foreach (var s in sorted)
                Console.WriteLine($"  {s.Name}: {s.Score}점");

            // === 쿼리 구문 ===
            Console.WriteLine("\n=== 쿼리 구문 ===");
            var query = from s in students
                        where s.Score >= 80
                        orderby s.Score descending
                        select new { s.Name, Grade = s.Score >= 90 ? "A" : "B" };

            foreach (var item in query)
                Console.WriteLine($"  {item.Name}: {item.Grade}");

            // 람다 표현식 활용
            Console.WriteLine("\n=== 집계 함수 ===");
            Console.WriteLine($"최고점: {students.Max(s => s.Score)}");
            Console.WriteLine($"최저점: {students.Min(s => s.Score)}");
            Console.WriteLine($"평균: {students.Average(s => s.Score):F1}");
            Console.WriteLine($"합계: {students.Sum(s => s.Score)}");
            Console.WriteLine($"인원: {students.Count()}");

            // Any, All, First
            Console.WriteLine($"\n만점자 있음? {students.Any(s => s.Score == 100)}");
            Console.WriteLine($"모두 합격? {students.All(s => s.Score >= 60)}");
            Console.WriteLine($"첫 번째 컴공: {students.First(s => s.Major == "컴공").Name}");

            // GroupBy
            Console.WriteLine("\n=== GroupBy ===");
            var groups = students.GroupBy(s => s.Major);
            foreach (var group in groups)
            {
                Console.WriteLine($"{group.Key}: {group.Average(s => s.Score):F1}점 ({group.Count()}명)");
            }
        }
    }

    class Student
    {
        public string Name { get; }
        public int Score { get; }
        public string Major { get; }

        public Student(string name, int score, string major)
        {
            Name = name;
            Score = score;
            Major = major;
        }
    }
}
