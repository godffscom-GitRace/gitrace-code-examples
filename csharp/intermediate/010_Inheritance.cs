// [10] 상속과 다형성 - Inheritance & Polymorphism
// 레벨: 3 | C#의 상속과 다형성을 이해합니다

using System;

namespace Inheritance
{
    class Program
    {
        static void Main(string[] args)
        {
            Dog dog = new Dog("바둑이", 3);
            Cat cat = new Cat("나비", 2);
            Bird bird = new Bird("짹짹이", 1);

            // 다형성 - 부모 타입으로 참조
            Animal[] animals = { dog, cat, bird };

            foreach (Animal animal in animals)
            {
                animal.Introduce();
                animal.Speak();   // 각 자식의 오버라이딩된 메서드 호출
                Console.WriteLine();
            }

            // 자식 클래스 고유 메서드
            dog.Fetch();
            cat.Purr();
            bird.Fly();
        }
    }

    // 부모 클래스 (abstract도 가능)
    abstract class Animal
    {
        public string Name { get; set; }
        public int Age { get; set; }

        // base 키워드 - 부모 생성자 호출
        protected Animal(string name, int age)
        {
            Name = name;
            Age = age;
        }

        public void Introduce()
        {
            Console.WriteLine($"{Name} ({Age}살)");
        }

        // virtual - 자식에서 재정의 가능
        public virtual void Speak()
        {
            Console.WriteLine("...");
        }
    }

    // 자식 클래스 - : 으로 상속
    class Dog : Animal
    {
        public Dog(string name, int age) : base(name, age) { }

        // override - 메서드 재정의
        public override void Speak()
        {
            Console.WriteLine($"{Name}: 멍멍!");
        }

        public void Fetch()
        {
            Console.WriteLine($"{Name}이(가) 공을 물어옵니다!");
        }
    }

    class Cat : Animal
    {
        public Cat(string name, int age) : base(name, age) { }

        public override void Speak()
        {
            Console.WriteLine($"{Name}: 야옹~");
        }

        public void Purr()
        {
            Console.WriteLine($"{Name}이(가) 그르릉 합니다.");
        }
    }

    class Bird : Animal
    {
        public Bird(string name, int age) : base(name, age) { }

        public override void Speak()
        {
            Console.WriteLine($"{Name}: 짹짹!");
        }

        public void Fly()
        {
            Console.WriteLine($"{Name}이(가) 하늘을 날아갑니다!");
        }
    }
}
