// [91] 인터페이스 (Interface) - Interface
// 레벨: 3 | C# 인터페이스를 활용합니다

using System;

namespace Interface
{
    class Program
    {
        static void Main(string[] args)
        {
            // 인터페이스 타입으로 참조 (다형성)
            IDrawable circle = new Circle("원", 5);
            IDrawable rect = new Rectangle("사각형", 4, 6);

            IDrawable[] shapes = { circle, rect };
            foreach (var shape in shapes)
            {
                shape.Draw();
                Console.WriteLine($"  넓이: {shape.GetArea():F2}");
            }

            // 다중 인터페이스
            Console.WriteLine("\n=== 다중 인터페이스 ===");
            var phone = new SmartPhone("Galaxy S25");
            phone.Call("010-1234-5678");
            phone.TakePicture();
            phone.Browse("www.google.com");

            // default 구현 (C# 8.0)
            ILogger logger = new ConsoleLogger();
            logger.Log("일반 로그");
            logger.LogWarning("경고 메시지");  // default 구현 사용
        }
    }

    // interface 선언
    interface IDrawable
    {
        void Draw();
        double GetArea();

        // default 구현 (C# 8.0)
        void Describe()
        {
            Console.WriteLine($"도형 넓이: {GetArea():F2}");
        }
    }

    // 명시적 구현
    class Circle : IDrawable
    {
        public string Name { get; }
        public double Radius { get; }

        public Circle(string name, double radius)
        {
            Name = name;
            Radius = radius;
        }

        public void Draw()
        {
            Console.WriteLine($"{Name} 그리기 (반지름: {Radius})");
        }

        public double GetArea()
        {
            return Math.PI * Radius * Radius;
        }
    }

    class Rectangle : IDrawable
    {
        public string Name { get; }
        public double Width { get; }
        public double Height { get; }

        public Rectangle(string name, double width, double height)
        {
            Name = name;
            Width = width;
            Height = height;
        }

        public void Draw()
        {
            Console.WriteLine($"{Name} 그리기 ({Width} x {Height})");
        }

        public double GetArea()
        {
            return Width * Height;
        }
    }

    // 다중 인터페이스
    interface IPhone { void Call(string number); }
    interface ICamera { void TakePicture(); }
    interface IBrowser { void Browse(string url); }

    class SmartPhone : IPhone, ICamera, IBrowser
    {
        public string Model { get; }

        public SmartPhone(string model) { Model = model; }

        public void Call(string number) =>
            Console.WriteLine($"{Model}: {number}에 전화 걸기");
        public void TakePicture() =>
            Console.WriteLine($"{Model}: 사진 촬영!");
        public void Browse(string url) =>
            Console.WriteLine($"{Model}: {url} 접속");
    }

    // default 구현 예시
    interface ILogger
    {
        void Log(string message);

        // default 구현
        void LogWarning(string message)
        {
            Log($"[경고] {message}");
        }
    }

    class ConsoleLogger : ILogger
    {
        public void Log(string message)
        {
            Console.WriteLine($"[LOG] {message}");
        }
    }
}
