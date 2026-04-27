// [19] 확장 메서드 - Extension Methods
// 레벨: 4 | 기존 클래스에 메서드를 추가하는 확장 메서드를 배웁니다

using System;
using System.Linq;

class Program
{
    static void Main()
    {
        string s = "hello world";

        Console.WriteLine(s.Cap());
        Console.WriteLine(s.CountW());

        Console.WriteLine(5.Fact());
        Console.WriteLine(4.IsEven());

        int[] a = { 3, 1, 2 };
        Console.WriteLine(a.Max2());

        foreach (var x in a.SortUp())
            Console.Write(x);
    }
}

static class Ext
{
    public static string Cap(this string s)
    {
        if (string.IsNullOrEmpty(s)) return s;
        return char.ToUpper(s[0]) + s.Substring(1);
    }

    public static int CountW(this string s)
    {
        return s.Split(' ').Length;
    }

    public static int Fact(this int n)
    {
        int r = 1;
        for (int i = 2; i <= n; i++) r *= i;
        return r;
    }

    public static bool IsEven(this int n)
    {
        return n % 2 == 0;
    }

    public static int Max2(this int[] a)
    {
        return a.OrderByDescending(x => x).Skip(1).First();
    }

    public static int[] SortUp(this int[] a)
    {
        return a.OrderBy(x => x).ToArray();
    }
}
