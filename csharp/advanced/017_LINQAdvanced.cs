// [17] LINQ 고급 - LINQ Advanced
// 레벨: 5 | LINQ의 고급 기능을 활용합니다

using System;
using System.Linq;

class Program
{
    static void Main()
    {
        var a = new[]
        {
            new S(1,10),
            new S(2,20),
            new S(1,30)
        };

        var g = a.GroupBy(x=>x.Id)
                 .Select(x=>new { k=x.Key, s=x.Sum(v=>v.V) });

        foreach (var x in g)
            Console.WriteLine(x.k+" "+x.s);

        var b = new[] { "a","b" };
        var c = new[] { 1,2 };

        var z = b.Zip(c,(x,y)=>x+y);
        foreach (var x in z)
            Console.Write(x);

        Console.WriteLine();

        var d = a.Where(x=>x.V>10).Select(x=>x.V);
        Console.WriteLine(d.Sum());
    }
}

class S
{
    public int Id;
    public int V;

    public S(int i,int v)
    {
        Id=i;
        V=v;
    }
}
