// [84] 조건문 (if-switch) - Conditionals & Pattern Matching
// 레벨: 2 | C#의 조건문과 패턴 매칭을 배웁니다

using System;

namespace Conditionals
{
    class Program
    {
        static void Main(string[] args)
        {
            // if-else if-else
            int score = 85;
            string grade;

            if (score >= 90)
                grade = "A";
            else if (score >= 80)
                grade = "B";
            else if (score >= 70)
                grade = "C";
            else if (score >= 60)
                grade = "D";
            else
                grade = "F";

            Console.WriteLine($"{score}점 → {grade}");

            // switch-case
            int day = 3;
            string dayName = day switch
            {
                1 => "월요일",
                2 => "화요일",
                3 => "수요일",
                4 => "목요일",
                5 => "금요일",
                6 => "토요일",
                7 => "일요일",
                _ => "잘못된 입력"
            };
            Console.WriteLine($"요일: {dayName}");

            // switch 표현식 (C# 8.0) - 패턴 매칭
            string category = score switch
            {
                >= 90 => "우수",
                >= 80 => "양호",
                >= 70 => "보통",
                _ => "노력 필요"
            };
            Console.WriteLine($"카테고리: {category}");

            // 패턴 매칭 with is
            object value = 42;
            if (value is int number)
            {
                Console.WriteLine($"\n정수입니다: {number}");
            }

            // 입장료 계산
            int[] ages = { 5, 12, 16, 30, 70 };
            foreach (int age in ages)
            {
                int fee = CalcFee(age);
                Console.WriteLine($"나이 {age}세 → 입장료: {fee}원");
            }
        }

        static int CalcFee(int age) => age switch
        {
            < 8 => 0,
            < 14 => 3000,
            < 19 => 5000,
            >= 65 => 0,
            _ => 10000
        };
    }
}
