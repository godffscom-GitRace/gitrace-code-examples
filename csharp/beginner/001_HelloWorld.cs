// [1] Hello World와 메서드 - Hello World & Methods
// 레벨: 1 | C#의 기본 구조와 메서드를 배웁니다

using System;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("Hello CSharp");

        string msg = Greet("Alex");
        Console.WriteLine(msg);

        Say("Sam");
        Say("Lee");

        int result = Add(3, 5);
        Console.WriteLine("3 + 5 = " + result);
    }

    static string Greet(string name)
    {
        return "Hello " + name;
    }

    static void Say(string name)
    {
        Console.WriteLine("Hi " + name);
    }

    static int Add(int a, int b)
    {
        return a + b;
    }
}
