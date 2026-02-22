// [97] LINQ 고급 - LINQ Advanced
// 레벨: 5 | LINQ의 고급 기능을 활용합니다

using System;
using System.Collections.Generic;
using System.Linq;

namespace LINQAdvanced
{
    class Program
    {
        static void Main(string[] args)
        {
            var students = new List<Student>
            {
                new Student(1, "김철수", 1),
                new Student(2, "이영희", 2),
                new Student(3, "박민수", 1),
            };

            var departments = new List<Department>
            {
                new Department(1, "컴퓨터공학"),
                new Department(2, "경영학"),
                new Department(3, "수학"),
            };

            var scores = new List<Score>
            {
                new Score(1, "수학", 85), new Score(1, "영어", 92),
                new Score(2, "수학", 95), new Score(2, "영어", 88),
                new Score(3, "수학", 78), new Score(3, "영어", 72),
            };

            // === Join ===
            Console.WriteLine("=== Join ===");
            var joined = students.Join(
                departments,
                s => s.DeptId,
                d => d.Id,
                (s, d) => new { s.Name, Dept = d.Name }
            );
            foreach (var item in joined)
                Console.WriteLine($"  {item.Name} - {item.Dept}");

            // === GroupBy + 집계 ===
            Console.WriteLine("\n=== GroupBy + 집계 ===");
            var avgBySubject = scores
                .GroupBy(s => s.Subject)
                .Select(g => new { Subject = g.Key, Avg = g.Average(s => s.Value) });

            foreach (var item in avgBySubject)
                Console.WriteLine($"  {item.Subject}: {item.Avg:F1}점");

            // === Aggregate ===
            Console.WriteLine("\n=== Aggregate ===");
            var numbers = new List<int> { 1, 2, 3, 4, 5 };

            // 팩토리얼 계산
            int factorial = numbers.Aggregate((acc, n) => acc * n);
            Console.WriteLine($"5! = {factorial}");

            // 문자열 결합
            var names = students.Select(s => s.Name);
            string combined = names.Aggregate((acc, name) => $"{acc}, {name}");
            Console.WriteLine($"학생: {combined}");

            // === Zip ===
            Console.WriteLine("\n=== Zip ===");
            var labels = new[] { "1등", "2등", "3등" };
            var topStudents = new[] { "최지은", "이영희", "한솔" };

            var ranking = labels.Zip(topStudents, (label, name) => $"{label}: {name}");
            foreach (var item in ranking)
                Console.WriteLine($"  {item}");

            // === 지연 실행 (Deferred Execution) ===
            Console.WriteLine("\n=== 지연 실행 ===");
            var nums = new List<int> { 1, 2, 3, 4, 5 };

            // 쿼리 정의 (아직 실행 안 됨)
            var query = nums.Where(n => n > 2).Select(n => n * 10);

            nums.Add(6);  // 쿼리 실행 전에 데이터 변경

            // 이제 실행 - 6도 포함됨!
            Console.WriteLine($"결과: {string.Join(", ", query)}");
            // 30, 40, 50, 60

            // 즉시 실행 - ToList()
            var cached = nums.Where(n => n > 2).Select(n => n * 10).ToList();
            nums.Add(7);
            Console.WriteLine($"캐시됨: {string.Join(", ", cached)}");
            // 30, 40, 50, 60 (7은 미포함)

            // === 복잡한 쿼리 ===
            Console.WriteLine("\n=== 복잡한 쿼리 ===");
            var report = from s in students
                         join sc in scores on s.Id equals sc.StudentId into studentScores
                         select new
                         {
                             s.Name,
                             Avg = studentScores.Average(sc => sc.Value),
                             Max = studentScores.Max(sc => sc.Value)
                         };

            foreach (var item in report)
                Console.WriteLine($"  {item.Name}: 평균 {item.Avg:F1}, 최고 {item.Max}");
        }
    }

    class Student
    {
        public int Id { get; }
        public string Name { get; }
        public int DeptId { get; }
        public Student(int id, string name, int deptId) { Id = id; Name = name; DeptId = deptId; }
    }

    class Department
    {
        public int Id { get; }
        public string Name { get; }
        public Department(int id, string name) { Id = id; Name = name; }
    }

    class Score
    {
        public int StudentId { get; }
        public string Subject { get; }
        public int Value { get; }
        public Score(int studentId, string subject, int value)
        { StudentId = studentId; Subject = subject; Value = value; }
    }
}
