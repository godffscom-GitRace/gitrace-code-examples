// [86] 배열 기초 - Arrays
// 레벨: 2 | C#의 배열을 다루는 방법을 배웁니다

using System;

namespace Arrays
{
    class Program
    {
        static void Main(string[] args)
        {
            // 배열 선언과 초기화
            int[] scores = { 85, 92, 78, 95, 88 };
            string[] names = { "김철수", "이영희", "박민수" };

            // 크기만 지정
            int[] numbers = new int[5]; // [0, 0, 0, 0, 0]
            numbers[0] = 10;
            numbers[1] = 20;

            // 배열 접근
            Console.WriteLine($"첫 번째: {scores[0]}");
            Console.WriteLine($"마지막: {scores[^1]}");  // C# 8.0 인덱스
            Console.WriteLine($"길이: {scores.Length}");

            // 배열 순회
            Console.WriteLine("\n=== 성적표 ===");
            for (int i = 0; i < names.Length; i++)
            {
                Console.WriteLine($"{names[i]}: {scores[i]}점");
            }

            // 다차원 배열
            int[,] matrix = {
                { 1, 2, 3 },
                { 4, 5, 6 },
                { 7, 8, 9 }
            };

            Console.WriteLine("\n=== 행렬 ===");
            for (int i = 0; i < matrix.GetLength(0); i++)
            {
                for (int j = 0; j < matrix.GetLength(1); j++)
                {
                    Console.Write($"{matrix[i, j]} ");
                }
                Console.WriteLine();
            }

            // 가변 배열 (jagged array)
            int[][] jagged = new int[3][];
            jagged[0] = new int[] { 1, 2 };
            jagged[1] = new int[] { 3, 4, 5 };
            jagged[2] = new int[] { 6 };

            Console.WriteLine("\n=== 가변 배열 ===");
            foreach (int[] row in jagged)
            {
                Console.WriteLine(string.Join(", ", row));
            }

            // Array 클래스
            Array.Sort(scores);
            Console.WriteLine($"\n정렬: {string.Join(", ", scores)}");
            Console.WriteLine($"검색 92: index {Array.IndexOf(scores, 92)}");
            Array.Reverse(scores);
            Console.WriteLine($"역순: {string.Join(", ", scores)}");
        }
    }
}
