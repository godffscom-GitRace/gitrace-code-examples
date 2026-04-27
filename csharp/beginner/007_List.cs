// [7] List<T> 컬렉션 - Generic List
// 레벨: 2 | C# 제네릭 컬렉션의 List를 활용합니다

using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        var list = new List<int> { 2, 1 };
        list.Add(3);

        Console.WriteLine(list.Count);

        foreach (var x in list)
            Console.Write(x);

        Console.WriteLine();

        list.Sort();
        Console.WriteLine(list[0]);
    }
}
