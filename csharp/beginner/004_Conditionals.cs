// [4] 조건문 (if-switch) - Conditionals & Pattern Matching
// 레벨: 2 | C#의 조건문과 패턴 매칭을 배웁니다

using System;

class Program
{
    static void Main()
    {
        int score = 75;
        Console.WriteLine(score >= 80 ? "high" : "low");

        int day = 1;
        Console.WriteLine(day switch
        {
            1 => "Mon",
            _ => "Other"
        });

        object v = 3;
        if (v is int n) Console.WriteLine(n);

        int age = 6;
        Console.WriteLine(age < 8 ? 0 : 100);
    }
}
