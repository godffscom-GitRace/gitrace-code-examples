namespace AnimalWorld
{
    class Dog : Animal
    {
        public string Breed { get; set; }

        public Dog(string name, int age, string breed)
            : base(name, age)
        {
            Breed = breed;
        }

        public override string MakeSound() => "멍멍!";

        public void Fetch()
        {
            Console.WriteLine($"{Name}이(가) 공을 가져옵니다!");
        }
    }

    class Cat : Animal
    {
        public bool IsIndoor { get; set; }

        public Cat(string name, int age, bool isIndoor)
            : base(name, age)
        {
            IsIndoor = isIndoor;
        }

        public override string MakeSound() => "야옹~";

        public void Purr()
        {
            Console.WriteLine($"{Name}이(가) 그르렁거립니다.");
        }
    }
}
