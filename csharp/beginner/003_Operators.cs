// [3] 연산자와 표현식 - Operators & Expressions
// 레벨: 1 | C#의 다양한 연산자를 마스터합니다

using System;

namespace OperatorsPractice
{
    class Program
    {
        static void Main(string[] args)
        {
            int a = 10;
            int b = 3;

            Console.WriteLine("Basic");
            Console.WriteLine(a + b);
            Console.WriteLine(a - b);
            Console.WriteLine(a * b);

            Console.WriteLine("\nCheck");
            Console.WriteLine(a > b);
            Console.WriteLine(a == b);

            bool flag = true;
            Console.WriteLine("\nLogic");
            Console.WriteLine(!flag);

            string name = null;
            Console.WriteLine("\nNull");
            Console.WriteLine(name ?? "none");

            string text = "hi";
            Console.WriteLine(text?.Length);

            object obj = "ok";
            Console.WriteLine(obj is string);

            string cast = obj as string;
            Console.WriteLine(cast);
        }
    }
}
