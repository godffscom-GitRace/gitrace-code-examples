// [18] async/await 비동기 - Async/Await
// 레벨: 5 | C#의 비동기 프로그래밍 패턴을 마스터합니다

using System;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        Console.WriteLine(await Get(1));

        var t1 = Get(2);
        var t2 = Get(3);
        var all = await Task.WhenAll(t1,t2);

        foreach (var x in all)
            Console.Write(x);

        Console.WriteLine();

        var any = await Task.WhenAny(Get(4),Get(5));
        Console.WriteLine(await any);

        try
        {
            await Fail();
        }
        catch
        {
            Console.WriteLine("err");
        }
    }

    static async Task<int> Get(int x)
    {
        await Task.Delay(10);
        return x;
    }

    static async Task Fail()
    {
        await Task.Delay(1);
        throw new Exception();
    }
}
