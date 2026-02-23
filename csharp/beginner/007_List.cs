// [7] List<T> 컬렉션 - Generic List
// 레벨: 2 | C# 제네릭 컬렉션의 List를 활용합니다

using System;
using System.Collections.Generic;
using System.Linq;

namespace ListExample
{
    class Program
    {
        static void Main(string[] args)
        {
            // List<T> 생성
            List<string> fruits = new List<string>();

            // Add() - 요소 추가
            fruits.Add("사과");
            fruits.Add("바나나");
            fruits.Add("딸기");
            fruits.Add("포도");
            Console.WriteLine($"과일: {string.Join(", ", fruits)}");

            // Count - 개수
            Console.WriteLine($"개수: {fruits.Count}");

            // Contains() - 포함 여부
            Console.WriteLine($"바나나 있음: {fruits.Contains("바나나")}");

            // Remove() - 삭제
            fruits.Remove("딸기");
            Console.WriteLine($"딸기 삭제: {string.Join(", ", fruits)}");

            // IndexOf() - 인덱스 찾기
            Console.WriteLine($"포도 위치: {fruits.IndexOf("포도")}");

            // Insert() - 특정 위치에 삽입
            fruits.Insert(1, "망고");
            Console.WriteLine($"삽입 후: {string.Join(", ", fruits)}");

            // 인덱스로 접근
            Console.WriteLine($"첫 번째: {fruits[0]}");
            fruits[0] = "청사과";
            Console.WriteLine($"수정 후: {string.Join(", ", fruits)}");

            // 순회
            Console.WriteLine("\n=== 과일 목록 ===");
            for (int i = 0; i < fruits.Count; i++)
            {
                Console.WriteLine($"{i + 1}. {fruits[i]}");
            }

            // 숫자 리스트 + LINQ 미리보기
            List<int> scores = new List<int> { 85, 92, 78, 95, 88 };

            scores.Sort();
            Console.WriteLine($"\n정렬: {string.Join(", ", scores)}");
            Console.WriteLine($"합계: {scores.Sum()}");
            Console.WriteLine($"평균: {scores.Average():F1}");
            Console.WriteLine($"최대: {scores.Max()}");
            Console.WriteLine($"최소: {scores.Min()}");
        }
    }
}
