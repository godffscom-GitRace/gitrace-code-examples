// [6] 배열 기초 - Arrays
// 레벨: 2 | C#의 배열을 다루는 방법을 배웁니다

using System;

class Program
{
    static void Main()
    {
        int[] a = { 3, 1, 2 };
        Console.WriteLine(a[0]);
        Console.WriteLine(a.Length);

        foreach (var x in a)
            Console.Write(x);

        Console.WriteLine();

        Array.Sort(a);
        Console.WriteLine(a[0]);
    }
}
