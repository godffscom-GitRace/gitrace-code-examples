using System;
using System.Collections.Generic;

namespace AnimalWorld
{
    class Program
    {
        static void Main(string[] args)
        {
            List<Animal> animals = new List<Animal>
            {
                new Dog("바둑이", 3, "진돗개"),
                new Cat("나비", 2, true),
                new Dog("맥스", 5, "골든 리트리버")
            };

            Console.WriteLine("=== 동물 소개 ===");
            foreach (Animal animal in animals)
            {
                animal.Introduce();
                Console.WriteLine();
            }

            if (animals[0] is Dog firstDog)
            {
                firstDog.Fetch();
            }
        }
    }
}
