// [8] 프로퍼티 (Properties) - Properties
// 레벨: 2 | C# 고유의 프로퍼티 문법을 학습합니다

using System;

class Program
{
    static void Main()
    {
        var s = new User("Tom", 20);
        Console.WriteLine(s.Info);

        s.Age = 25;
        Console.WriteLine(s.Info);

        s.Age = -1;
        Console.WriteLine(s.Age);

        var p = new Item { Name = "Pen", Price = 100 };
        Console.WriteLine(p.Label);

        Console.WriteLine(p.Discount(0.5));
    }
}

class User
{
    public string Name { get; private set; }

    private int age;
    public int Age
    {
        get { return age; }
        set
        {
            if (value > 0)
                age = value;
        }
    }

    public string Info => Name + " " + Age;

    public User(string n, int a)
    {
        Name = n;
        Age = a;
    }
}

class Item
{
    public string Name { get; set; } = "";
    public int Price { get; set; }

    public string Label => Name + " " + Price;

    public int Discount(double r)
    {
        return (int)(Price * (1 - r));
    }
}
