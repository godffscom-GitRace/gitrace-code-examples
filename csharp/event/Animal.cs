namespace AnimalWorld
{
    abstract class Animal
    {
        public string Name { get; set; }
        public int Age { get; set; }

        public Animal(string name, int age)
        {
            Name = name;
            Age = age;
        }

        public abstract string MakeSound();

        public void Introduce()
        {
            Console.WriteLine($"이름: {Name}, 나이: {Age}살");
            Console.WriteLine($"소리: {MakeSound()}");
        }
    }
}
