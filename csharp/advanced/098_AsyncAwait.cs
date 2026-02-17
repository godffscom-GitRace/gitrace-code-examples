// [98] async/await 비동기 - Async/Await
// 레벨: 5 | C#의 비동기 프로그래밍 패턴을 마스터합니다

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AsyncAwait
{
    class Program
    {
        static async Task Main(string[] args)
        {
            // === Task 기본 ===
            Console.WriteLine("=== async/await 기본 ===");
            Console.WriteLine("시작!");

            string result = await GreetAsync("철수");
            Console.WriteLine(result);

            Console.WriteLine("끝!");

            // === 여러 비동기 작업 순차 실행 ===
            Console.WriteLine("\n=== 순차 실행 ===");
            var sw = System.Diagnostics.Stopwatch.StartNew();

            string data1 = await FetchDataAsync("API-1", 500);
            string data2 = await FetchDataAsync("API-2", 300);

            sw.Stop();
            Console.WriteLine($"순차 시간: {sw.ElapsedMilliseconds}ms");

            // === Task.WhenAll - 병렬 실행 ===
            Console.WriteLine("\n=== 병렬 실행 (WhenAll) ===");
            sw.Restart();

            Task<string> task1 = FetchDataAsync("API-1", 500);
            Task<string> task2 = FetchDataAsync("API-2", 300);
            Task<string> task3 = FetchDataAsync("API-3", 400);

            string[] results = await Task.WhenAll(task1, task2, task3);

            sw.Stop();
            Console.WriteLine($"병렬 시간: {sw.ElapsedMilliseconds}ms");
            foreach (var r in results)
                Console.WriteLine($"  {r}");

            // === Task.WhenAny - 가장 빠른 것 ===
            Console.WriteLine("\n=== WhenAny ===");
            Task<string> fastest = await Task.WhenAny(
                FetchDataAsync("서버A", 500),
                FetchDataAsync("서버B", 200),
                FetchDataAsync("서버C", 800)
            );
            Console.WriteLine($"가장 빠른: {await fastest}");

            // === try-catch 에러 처리 ===
            Console.WriteLine("\n=== 에러 처리 ===");
            try
            {
                await RiskyOperationAsync();
            }
            catch (InvalidOperationException e)
            {
                Console.WriteLine($"오류 처리: {e.Message}");
            }

            // === 비동기 반복 ===
            Console.WriteLine("\n=== 비동기 반복 ===");
            var items = new List<string> { "A", "B", "C" };
            foreach (var item in items)
            {
                await ProcessItemAsync(item);
            }
            Console.WriteLine("모든 항목 처리 완료!");
        }

        // async 메서드 - Task<T> 반환
        static async Task<string> GreetAsync(string name)
        {
            await Task.Delay(300);  // 비동기 대기
            return $"안녕하세요, {name}님!";
        }

        static async Task<string> FetchDataAsync(string source, int delayMs)
        {
            await Task.Delay(delayMs);
            return $"{source}: 데이터 로드 ({delayMs}ms)";
        }

        static async Task RiskyOperationAsync()
        {
            await Task.Delay(100);
            throw new InvalidOperationException("비동기 작업 실패!");
        }

        static async Task ProcessItemAsync(string item)
        {
            await Task.Delay(200);
            Console.WriteLine($"  처리 완료: {item}");
        }
    }
}
