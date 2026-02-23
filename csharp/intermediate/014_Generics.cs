// [14] 제네릭 (Generics) - Generics
// 레벨: 3 | C# 제네릭으로 타입 안전성을 확보합니다

using System;
using System.Collections.Generic;

namespace Generics
{
    class Program
    {
        static void Main(string[] args)
        {
            // 제네릭 클래스 사용
            var strBox = new Box<string>("안녕하세요");
            var intBox = new Box<int>(42);
            Console.WriteLine($"문자열 박스: {strBox.Value}");
            Console.WriteLine($"정수 박스: {intBox.Value}");

            // 제네릭 메서드
            Console.WriteLine($"\n첫 번째: {GetFirst(new[] { "사과", "바나나" })}");
            Console.WriteLine($"첫 번째: {GetFirst(new[] { 10, 20, 30 })}");

            Swap(out string a, out string b, "A", "B");
            Console.WriteLine($"Swap: {a}, {b}");  // B, A

            // 제네릭 스택
            Console.WriteLine("\n=== 제네릭 스택 ===");
            var stack = new SimpleStack<string>(5);
            stack.Push("첫 번째");
            stack.Push("두 번째");
            stack.Push("세 번째");

            Console.WriteLine($"Pop: {stack.Pop()}");  // 세 번째
            Console.WriteLine($"Peek: {stack.Peek()}"); // 두 번째
            Console.WriteLine($"크기: {stack.Count}");

            // 제약 조건 (where)
            Console.WriteLine("\n=== 제약 조건 ===");
            var repo = new Repository<Product>();
            repo.Add(new Product { Id = 1, Name = "노트북", Price = 1500000 });
            repo.Add(new Product { Id = 2, Name = "마우스", Price = 50000 });

            var item = repo.GetById(1);
            Console.WriteLine($"찾음: {item?.Name} ({item?.Price}원)");
            repo.PrintAll();
        }

        // 제네릭 메서드
        static T GetFirst<T>(T[] array)
        {
            return array[0];
        }

        static void Swap<T>(out T a, out T b, T x, T y)
        {
            a = y;
            b = x;
        }
    }

    // 제네릭 클래스
    class Box<T>
    {
        public T Value { get; set; }
        public Box(T value) { Value = value; }
    }

    // 제네릭 스택 구현
    class SimpleStack<T>
    {
        private T[] _items;
        public int Count { get; private set; }

        public SimpleStack(int capacity)
        {
            _items = new T[capacity];
            Count = 0;
        }

        public void Push(T item)
        {
            _items[Count++] = item;
        }

        public T Pop()
        {
            return _items[--Count];
        }

        public T Peek()
        {
            return _items[Count - 1];
        }
    }

    // 제약 조건 - where T : IEntity
    interface IEntity
    {
        int Id { get; set; }
    }

    class Product : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
    }

    // where T : IEntity - T는 IEntity를 구현해야 함
    class Repository<T> where T : IEntity
    {
        private List<T> _items = new List<T>();

        public void Add(T item) => _items.Add(item);

        public T GetById(int id) => _items.Find(x => x.Id == id);

        public void PrintAll()
        {
            Console.WriteLine($"전체 {_items.Count}개:");
            foreach (var item in _items)
                Console.WriteLine($"  ID: {item.Id} - {item}");
        }
    }
}
