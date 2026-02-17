// [81] Hello World와 메서드 - Hello World & Methods
// 레벨: 1 | C#의 기본 구조와 메서드를 배웁니다

using System;

namespace HelloWorld
{
    class Program
    {
        // static void Main() - 프로그램 시작점
        static void Main(string[] args)
        {
            // Console.WriteLine() - 출력
            Console.WriteLine("Hello, C# World!");

            // 메서드 호출
            string msg = Greet("김철수");
            Console.WriteLine(msg);

            SayHello("이영희");
            SayHello("박민수");

            int result = Add(3, 5);
            Console.WriteLine($"3 + 5 = {result}");
        }

        // 반환값 있는 메서드
        static string Greet(string name)
        {
            return $"안녕하세요, {name}님!";
        }

        // 반환값 없는 메서드 (void)
        static void SayHello(string name)
        {
            Console.WriteLine($"Hello, {name}!");
        }

        // 매개변수와 반환값
        static int Add(int a, int b)
        {
            return a + b;
        }
    }
}
