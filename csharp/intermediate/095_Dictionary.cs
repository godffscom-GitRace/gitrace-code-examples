// [95] Dictionary와 컬렉션 - Dictionary & Collections
// 레벨: 3 | C# 컬렉션 프레임워크를 완벽히 이해합니다

using System;
using System.Collections.Generic;
using System.Linq;

namespace DictionaryCollections
{
    class Program
    {
        static void Main(string[] args)
        {
            // Dictionary<K, V>
            var scores = new Dictionary<string, int>();

            // Add() - 추가
            scores.Add("김철수", 85);
            scores.Add("이영희", 92);
            scores["박민수"] = 78;    // 인덱서로 추가
            scores["최지은"] = 95;
            Console.WriteLine($"성적표: {scores.Count}명");

            // 값 조회
            Console.WriteLine($"김철수: {scores["김철수"]}점");

            // TryGetValue() - 안전한 조회
            if (scores.TryGetValue("홍길동", out int score))
                Console.WriteLine($"홍길동: {score}점");
            else
                Console.WriteLine("홍길동: 없음");

            // ContainsKey
            Console.WriteLine($"이영희 존재? {scores.ContainsKey("이영희")}");

            // 순회
            Console.WriteLine("\n=== 전체 조회 ===");
            foreach (var kvp in scores)
            {
                Console.WriteLine($"{kvp.Key}: {kvp.Value}점");
            }

            // 삭제
            scores.Remove("박민수");
            Console.WriteLine($"\n삭제 후: {scores.Count}명");

            // === HashSet - 중복 없는 집합 ===
            Console.WriteLine("\n=== HashSet ===");
            var fruits = new HashSet<string>();
            fruits.Add("사과");
            fruits.Add("바나나");
            fruits.Add("사과");   // 중복 무시!
            fruits.Add("딸기");
            Console.WriteLine($"과일: {string.Join(", ", fruits)}");
            Console.WriteLine($"크기: {fruits.Count}");  // 3

            // 집합 연산
            var tropical = new HashSet<string> { "바나나", "망고", "파인애플" };
            var common = new HashSet<string>(fruits);
            common.IntersectWith(tropical);  // 교집합
            Console.WriteLine($"교집합: {string.Join(", ", common)}");

            // === Queue - 선입선출 (FIFO) ===
            Console.WriteLine("\n=== Queue ===");
            var queue = new Queue<string>();
            queue.Enqueue("첫 번째");
            queue.Enqueue("두 번째");
            queue.Enqueue("세 번째");
            Console.WriteLine($"Dequeue: {queue.Dequeue()}");  // 첫 번째
            Console.WriteLine($"Peek: {queue.Peek()}");        // 두 번째

            // === Stack - 후입선출 (LIFO) ===
            Console.WriteLine("\n=== Stack ===");
            var stack = new Stack<string>();
            stack.Push("첫 번째");
            stack.Push("두 번째");
            stack.Push("세 번째");
            Console.WriteLine($"Pop: {stack.Pop()}");    // 세 번째
            Console.WriteLine($"Peek: {stack.Peek()}");  // 두 번째

            // === 컬렉션 선택 가이드 ===
            // List<T>       : 순서 있는 배열, 인덱스 접근
            // Dictionary    : 키-값 쌍, 빠른 조회
            // HashSet       : 중복 없는 집합
            // Queue         : 선입선출 (대기열)
            // Stack         : 후입선출 (되돌리기)
            // LinkedList    : 빈번한 삽입/삭제
        }
    }
}
