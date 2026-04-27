// [9] 클래스와 생성자 - Class & Constructor
// 레벨: 3 | C#의 클래스와 생성자를 마스터합니다

using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        var a = new User();
        a.Print();

        var b = new User("Tom", 20);
        b.Add(10);
        b.Add(20);
        b.Print();

        var c = new User("Ann");
        c.Print();

        Console.WriteLine(User.Count);
    }
}

class User
{
    private List<int> data = new List<int>();

    public string Name { get; set; }
    public int Age { get; set; }

    public static int Count = 0;

    public User()
    {
        Name = "none";
        Age = 0;
        Count++;
    }

    public User(string n) : this()
    {
        Name = n;
    }

    public User(string n, int a)
    {
        Name = n;
        Age = a;
        Count++;
    }

    public void Add(int x)
    {
        data.Add(x);
    }

    public int Sum()
    {
        int s = 0;
        foreach (var x in data) s += x;
        return s;
    }

    public void Print()
    {
        Console.WriteLine(Name + " " + Age);
        Console.WriteLine(Sum());
    }
}
