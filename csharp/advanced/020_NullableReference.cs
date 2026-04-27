// [20] Nullable 참조 형식 - Nullable Reference Types
// 레벨: 4 | C# 8.0의 nullable 참조 형식으로 null 안전성을 확보합니다

#nullable enable
using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        string? n = null;
        Console.WriteLine(n ?? "none");

        string? s = Get();
        if (s != null)
            Console.WriteLine(s!.ToUpper());

        User? u = Find(1);
        Console.WriteLine(u?.Name ?? "no");
        Console.WriteLine(u?.Addr?.City ?? "no");

        var list = GetList();
        Console.WriteLine(list?.Count ?? 0);

        foreach (var x in list ?? new List<string>())
            Console.Write(x);

        Console.WriteLine();

        Console.WriteLine(Name(1));
        Console.WriteLine(Name(2));
    }

    static string? Get()
    {
        return "hi";
    }

    static User? Find(int id)
    {
        if (id == 1)
            return new User("tom", new Addr("seoul"));
        return null;
    }

    static List<string>? GetList()
    {
        return new List<string> { "a", "b" };
    }

    static string Name(int id)
    {
        var u = Find(id);
        return u?.Name ?? "anon";
    }
}

class Addr
{
    public string City;
    public Addr(string c)
    {
        City = c;
    }
}

class User
{
    public string Name;
    public Addr? Addr;

    public User(string n, Addr? a = null)
    {
        Name = n;
        Addr = a;
    }
}
