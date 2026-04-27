// [14] 제네릭 (Generics) - Generics
// 레벨: 3 | C# 제네릭으로 타입 안전성을 확보합니다

using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        var box = new Box<int>(5);
        Console.WriteLine(box.Value);

        Console.WriteLine(First(new int[] { 7, 8 }));

        Swap(out int a, out int b, 1, 2);
        Console.WriteLine(a + " " + b);

        var st = new Stack<int>();
        st.Push(3);
        st.Push(4);
        Console.WriteLine(st.Pop());

        var repo = new Repo<Item>();
        repo.Add(new Item { Id = 1 });
        Console.WriteLine(repo.Get(1).Id);
    }

    static T First<T>(T[] arr)
    {
        return arr[0];
    }

    static void Swap<T>(out T a, out T b, T x, T y)
    {
        a = y;
        b = x;
    }
}

class Box<T>
{
    public T Value;
    public Box(T v) { Value = v; }
}

interface IId
{
    int Id { get; set; }
}

class Item : IId
{
    public int Id { get; set; }
}

class Repo<T> where T : IId, new()
{
    List<T> list = new List<T>();

    public void Add(T x)
    {
        list.Add(x);
    }

    public T Get(int id)
    {
        foreach (var x in list)
            if (x.Id == id) return x;

        return new T();
    }
}
