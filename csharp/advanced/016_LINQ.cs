// [16] LINQ 기초 - LINQ Basics
// 레벨: 4 | C#의 LINQ로 데이터 쿼리를 마스터합니다

using System;
using System.Linq;

class Program
{
    static void Main()
    {
        int[] a = { 1, 2, 3, 4 };

        var ev = a.Where(x => x % 2 == 0);
        foreach (var x in ev)
            Console.Write(x);

        Console.WriteLine();

        Console.WriteLine(a.Sum());
        Console.WriteLine(a.Max());

        var f = a.First(x => x > 2);
        Console.WriteLine(f);

        var q =
            from x in a
            where x > 2
            select x;

        foreach (var x in q)
            Console.Write(x);
    }
}
