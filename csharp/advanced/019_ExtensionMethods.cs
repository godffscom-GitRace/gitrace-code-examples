// [99] 확장 메서드 - Extension Methods
// 레벨: 4 | 기존 클래스에 메서드를 추가하는 확장 메서드를 배웁니다

using System;
using System.Collections.Generic;
using System.Linq;

namespace ExtensionMethods
{
    class Program
    {
        static void Main(string[] args)
        {
            // === string 확장 메서드 ===
            Console.WriteLine("=== String 확장 ===");
            string text = "hello, world!";

            Console.WriteLine(text.Capitalize());     // "Hello, world!"
            Console.WriteLine(text.WordCount());      // 2
            Console.WriteLine(text.Truncate(8));      // "hello..."
            Console.WriteLine("".IsNullOrEmpty());    // True
            Console.WriteLine("hello".IsNullOrEmpty()); // False

            // 체이닝
            string result = "  hello world  ".Trim().Capitalize().Truncate(8);
            Console.WriteLine($"체이닝: {result}");

            // === int 확장 메서드 ===
            Console.WriteLine("\n=== Int 확장 ===");
            Console.WriteLine(5.Factorial());          // 120
            Console.WriteLine(7.IsEven());             // False
            Console.WriteLine(3.Times(n => Console.Write($"{n} "))); // 0 1 2
            Console.WriteLine();

            // === IEnumerable 확장 메서드 ===
            Console.WriteLine("\n=== 컬렉션 확장 ===");
            var numbers = new List<int> { 5, 2, 8, 1, 9, 3 };

            Console.WriteLine($"두 번째로 큰 수: {numbers.SecondMax()}");
            numbers.ForEachWithIndex((item, idx) =>
                Console.WriteLine($"  [{idx}] {item}")
            );

            // Shuffle 확장
            var shuffled = numbers.Shuffle().ToList();
            Console.WriteLine($"섞기: {string.Join(", ", shuffled)}");

            // === LINQ도 확장 메서드! ===
            Console.WriteLine("\n=== LINQ = 확장 메서드 ===");
            // Where, Select, OrderBy 등 모두 IEnumerable<T>의 확장 메서드
            var filtered = numbers.Where(n => n > 3).OrderBy(n => n);
            Console.WriteLine($"필터+정렬: {string.Join(", ", filtered)}");
        }
    }

    // static class에 this 키워드로 확장 메서드 정의
    static class StringExtensions
    {
        // 첫 글자 대문자
        public static string Capitalize(this string str)
        {
            if (string.IsNullOrEmpty(str)) return str;
            return char.ToUpper(str[0]) + str.Substring(1);
        }

        // 단어 수
        public static int WordCount(this string str)
        {
            return str.Split(new[] { ' ', '\t', '\n' },
                StringSplitOptions.RemoveEmptyEntries).Length;
        }

        // 잘라내기
        public static string Truncate(this string str, int maxLength)
        {
            if (str.Length <= maxLength) return str;
            return str.Substring(0, maxLength - 3) + "...";
        }

        // null/빈 문자열 체크
        public static bool IsNullOrEmpty(this string str)
        {
            return string.IsNullOrEmpty(str);
        }
    }

    static class IntExtensions
    {
        public static int Factorial(this int n)
        {
            int result = 1;
            for (int i = 2; i <= n; i++) result *= i;
            return result;
        }

        public static bool IsEven(this int n) => n % 2 == 0;

        public static string Times(this int count, Action<int> action)
        {
            for (int i = 0; i < count; i++) action(i);
            return "";
        }
    }

    static class EnumerableExtensions
    {
        // 두 번째로 큰 값
        public static T SecondMax<T>(this IEnumerable<T> source) where T : IComparable<T>
        {
            return source.OrderByDescending(x => x).Skip(1).First();
        }

        // 인덱스와 함께 순회
        public static void ForEachWithIndex<T>(this IEnumerable<T> source, Action<T, int> action)
        {
            int index = 0;
            foreach (var item in source)
                action(item, index++);
        }

        // 셔플
        public static IEnumerable<T> Shuffle<T>(this IEnumerable<T> source)
        {
            var rng = new Random();
            return source.OrderBy(_ => rng.Next());
        }
    }
}
