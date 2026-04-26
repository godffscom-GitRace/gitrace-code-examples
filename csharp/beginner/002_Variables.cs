// [2] 변수와 자료형 - Variables & Types
// 레벨: 1 | C#의 변수와 자료형 시스템을 학습합니다

using System;

class Program
{
    static void Main(string[] args)
    {
        int age = 25;
        double height = 175.5;
        bool isStudent = true;

        Console.WriteLine("Age " + age);
        Console.WriteLine("Height " + height);
        Console.WriteLine("Student " + isStudent);

        string name = "Alex";
        Console.WriteLine("Name " + name);
        Console.WriteLine("Len " + name.Length);

        var score = 95;
        Console.WriteLine("Score " + score);

        double x = 3.99;
        int y = (int)x;
        Console.WriteLine("Cast " + y);

        string s = "123";
        int n = int.Parse(s);
        Console.WriteLine("Num " + n);
    }
}
