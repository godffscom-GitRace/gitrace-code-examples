// [15] Dictionary와 컬렉션 - Dictionary & Collections
// 레벨: 3 | C# 컬렉션 프레임워크를 완벽히 이해합니다

using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        var map = new Dictionary<string,int>();
        map["a"] = 1;
        map["b"] = 2;

        Console.WriteLine(map["a"]);
        Console.WriteLine(map.Count);

        foreach (var kv in map)
            Console.Write(kv.Key);

        Console.WriteLine();

        var set = new HashSet<int> { 1,1,2 };
        Console.WriteLine(set.Count);

        var q = new Queue<int>();
        q.Enqueue(5);
        q.Enqueue(6);
        Console.WriteLine(q.Dequeue());

        var s = new Stack<int>();
        s.Push(7);
        s.Push(8);
        Console.WriteLine(s.Pop());
    }
}
