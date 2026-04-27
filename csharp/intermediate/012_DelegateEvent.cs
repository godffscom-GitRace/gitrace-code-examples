// [12] 대리자와 이벤트 - Delegate & Event
// 레벨: 4 | C# 고유의 대리자와 이벤트 시스템을 배웁니다

using System;

delegate int Calc(int a,int b);

class Program
{
    static void Main()
    {
        Calc add = (a,b)=>a+b;
        Console.WriteLine(add(2,3));

        Action<string> n = null;
        n += m=>Console.WriteLine("a "+m);
        n += m=>Console.WriteLine("b "+m);
        n("ok");

        var btn = new Btn();
        btn.Clicked += t=>Console.WriteLine("hit "+t);
        btn.Click();

        var d = new Down();
        d.Step += p=>Console.WriteLine(p);
        d.Done += ()=>Console.WriteLine("end");
        d.Run();
    }
}

class Btn
{
    public event Action<string> Clicked;

    public void Click()
    {
        Clicked?.Invoke("btn");
    }
}

class Down
{
    public event Action<int> Step;
    public event Action Done;

    public void Run()
    {
        for(int i=1;i<=3;i++)
            Step?.Invoke(i);

        Done?.Invoke();
    }
}
