// [3] 연산자와 표현식 - Operators & Expressions
// 레벨: 1 | C#의 다양한 연산자를 마스터합니다

using System;

namespace Operators
{
    class Program
    {
        static void Main(string[] args)
        {
            // 산술/비교/논리 연산자
            int a = 17, b = 5;
            Console.WriteLine("=== 산술 연산자 ===");
            Console.WriteLine($"{a} + {b} = {a + b}");   // 22
            Console.WriteLine($"{a} - {b} = {a - b}");   // 12
            Console.WriteLine($"{a} * {b} = {a * b}");   // 85
            Console.WriteLine($"{a} / {b} = {a / b}");   // 3
            Console.WriteLine($"{a} % {b} = {a % b}");   // 2

            Console.WriteLine("\n=== 비교 연산자 ===");
            Console.WriteLine($"10 == 10: {10 == 10}");   // True
            Console.WriteLine($"10 != 5: {10 != 5}");     // True
            Console.WriteLine($"10 > 5: {10 > 5}");       // True

            Console.WriteLine("\n=== 논리 연산자 ===");
            bool x = true, y = false;
            Console.WriteLine($"true && false: {x && y}");  // False
            Console.WriteLine($"true || false: {x || y}");  // True
            Console.WriteLine($"!true: {!x}");               // False

            // null 병합 연산자 (??)
            string? nickname = null;
            string display = nickname ?? "닉네임 없음";
            Console.WriteLine($"\n?? 연산자: {display}");

            // null 조건 연산자 (?.)
            string? text = null;
            int? length = text?.Length;  // null이면 null 반환
            Console.WriteLine($"?. 연산자: {length}");  // (빈 출력)

            text = "Hello";
            length = text?.Length;
            Console.WriteLine($"?. 연산자: {length}");  // 5

            // is, as 연산자
            object obj = "문자열입니다";
            Console.WriteLine($"\nis string: {obj is string}");  // True
            string? str = obj as string;  // 캐스팅 (실패 시 null)
            Console.WriteLine($"as string: {str}");
        }
    }
}
