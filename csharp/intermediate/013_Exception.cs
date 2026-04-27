// [13] 예외 처리 - Exception Handling
// 레벨: 3 | C#의 예외 처리를 마스터합니다

using System;

class Program
{
    static void Main()
    {
        try
        {
            int x = 5 / 0;
            Console.WriteLine(x);
        }
        catch
        {
            Console.WriteLine("err");
        }

        string[] data = { "1", "a", null };

        foreach (var s in data)
        {
            try
            {
                Console.WriteLine(int.Parse(s));
            }
            catch
            {
                Console.WriteLine("bad");
            }
        }

        try
        {
            Check(-1);
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
        }
    }

    static void Check(int n)
    {
        if (n < 0)
            throw new Exception("neg");

        Console.WriteLine(n);
    }
}
