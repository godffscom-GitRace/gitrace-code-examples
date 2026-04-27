// [10] 상속과 다형성 - Inheritance & Polymorphism
// 레벨: 3 | C#의 상속과 다형성을 이해합니다

using System;

class Program
{
    static void Main()
    {
        Animal[] list =
        {
            new Dog("d",1),
            new Cat("c",2)
        };

        foreach (var a in list)
        {
            a.Speak();
        }

        ((Dog)list[0]).Run();
    }
}

abstract class Animal
{
    public string Name;
    public int Age;

    public Animal(string n,int a)
    {
        Name=n;
        Age=a;
    }

    public virtual void Speak()
    {
        Console.WriteLine("none");
    }
}

class Dog:Animal
{
    public Dog(string n,int a):base(n,a){}

    public override void Speak()
    {
        Console.WriteLine(Name+" bark");
    }

    public void Run()
    {
        Console.WriteLine(Name+" run");
    }
}

class Cat:Animal
{
    public Cat(string n,int a):base(n,a){}

    public override void Speak()
    {
        Console.WriteLine(Name+" meow");
    }
}
