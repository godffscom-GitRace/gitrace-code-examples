// [11] 인터페이스 (Interface) - Interface
// 레벨: 3 | C# 인터페이스를 활용합니다

using System;

class Program
{
    static void Main()
    {
        IRun a = new Dog();
        IRun b = new Car();

        a.Run();
        b.Run();

        IRun[] list = { a, b };
        foreach (var x in list)
            x.Run();

        ILog log = new ConsoleLog();
        log.Write("ok");
        log.Warn("warn");
    }
}

interface IRun
{
    void Run();
}

class Dog : IRun
{
    public void Run()
    {
        Console.WriteLine("dog run");
    }
}

class Car : IRun
{
    public void Run()
    {
        Console.WriteLine("car run");
    }
}

interface ILog
{
    void Write(string m);

    void Warn(string m)
    {
        Write("w " + m);
    }
}

class ConsoleLog : ILog
{
    public void Write(string m)
    {
        Console.WriteLine(m);
    }
}
