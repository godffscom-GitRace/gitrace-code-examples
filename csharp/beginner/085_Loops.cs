// [85] 반복문 (for-foreach) - Loops
// 레벨: 2 | C#의 반복문으로 반복 작업을 수행합니다

using System;

namespace Loops
{
    class Program
    {
        static void Main(string[] args)
        {
            // for 반복문
            Console.WriteLine("=== 구구단 3단 ===");
            for (int i = 1; i <= 9; i++)
            {
                Console.WriteLine($"3 x {i} = {3 * i}");
            }

            // foreach 반복문
            Console.WriteLine("\n=== foreach ===");
            string[] fruits = { "사과", "바나나", "딸기", "포도" };
            foreach (string fruit in fruits)
            {
                Console.WriteLine($"과일: {fruit}");
            }

            // while 반복문
            Console.WriteLine("\n=== 카운트다운 ===");
            int count = 5;
            while (count > 0)
            {
                Console.Write($"{count} ");
                count--;
            }
            Console.WriteLine("발사!");

            // do-while (최소 1번 실행)
            Console.WriteLine("\n=== do-while ===");
            int num = 1;
            do
            {
                Console.Write($"{num} ");
                num++;
            } while (num <= 5);
            Console.WriteLine();

            // break - 반복 중단
            Console.WriteLine("\n=== break ===");
            for (int i = 1; i <= 10; i++)
            {
                if (i == 6)
                {
                    Console.WriteLine("6에서 중단!");
                    break;
                }
                Console.Write($"{i} ");
            }

            // continue - 현재 반복 건너뛰기
            Console.WriteLine("\n\n=== continue (3의 배수 건너뛰기) ===");
            for (int i = 1; i <= 10; i++)
            {
                if (i % 3 == 0) continue;
                Console.Write($"{i} ");
            }

            // 1~100 합산
            int total = 0;
            for (int i = 1; i <= 100; i++)
                total += i;
            Console.WriteLine($"\n\n1~100 합: {total}");
        }
    }
}
