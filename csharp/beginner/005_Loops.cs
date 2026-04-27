// [5] 반복문 (for-foreach) - Loops
// 레벨: 2 | C#의 반복문으로 반복 작업을 수행합니다

using System;

class Program
{
    static void Main()
    {
        for (int i = 1; i <= 3; i++)
            Console.Write(i);

        Console.WriteLine();

        int n = 3;
        while (n > 0)
        {
            Console.Write(n);
            n--;
        }

        Console.WriteLine();

        string[] a = { "a", "b" };
        foreach (var x in a)
            Console.Write(x);
    }
}
