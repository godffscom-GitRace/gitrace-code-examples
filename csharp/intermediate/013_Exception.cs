// [13] 예외 처리 - Exception Handling
// 레벨: 3 | C#의 예외 처리를 마스터합니다

using System;

namespace ExceptionHandling
{
    class Program
    {
        static void Main(string[] args)
        {
            // try-catch 기본
            Console.WriteLine("=== 기본 예외 처리 ===");
            try
            {
                int result = 10 / 0;  // DivideByZeroException!
                Console.WriteLine(result);
            }
            catch (DivideByZeroException e)
            {
                Console.WriteLine($"오류: {e.Message}");
            }

            // 여러 예외 처리
            Console.WriteLine("\n=== 여러 예외 처리 ===");
            string[] data = { "100", "abc", null };
            foreach (string s in data)
            {
                try
                {
                    int num = int.Parse(s);
                    Console.WriteLine($"{s} → {num}");
                }
                catch (FormatException)
                {
                    Console.WriteLine($"숫자 변환 실패: {s}");
                }
                catch (ArgumentNullException)
                {
                    Console.WriteLine("null 값!");
                }
            }

            // finally 블록
            Console.WriteLine("\n=== finally 블록 ===");
            try
            {
                int[] arr = { 1, 2, 3 };
                Console.WriteLine(arr[10]);  // IndexOutOfRangeException!
            }
            catch (IndexOutOfRangeException)
            {
                Console.WriteLine("인덱스 초과!");
            }
            finally
            {
                Console.WriteLine("항상 실행됩니다 (정리 작업)");
            }

            // throw 키워드
            Console.WriteLine("\n=== throw ===");
            try
            {
                ValidateAge(25);
                ValidateAge(-1);
            }
            catch (ArgumentException e)
            {
                Console.WriteLine($"오류: {e.Message}");
            }

            // when 필터 (C# 6.0)
            Console.WriteLine("\n=== when 필터 ===");
            try
            {
                Withdraw(10000, 15000);
            }
            catch (InvalidOperationException e) when (e.Message.Contains("잔액"))
            {
                Console.WriteLine($"잔액 오류: {e.Message}");
            }

            // 사용자 정의 예외
            Console.WriteLine("\n=== 사용자 정의 예외 ===");
            try
            {
                ProcessOrder(-1);
            }
            catch (OrderException e)
            {
                Console.WriteLine($"주문 오류: {e.Message}");
                Console.WriteLine($"오류 코드: {e.ErrorCode}");
            }
        }

        static void ValidateAge(int age)
        {
            if (age < 0)
                throw new ArgumentException("나이는 0 이상이어야 합니다");
            Console.WriteLine($"{age}살: 유효한 나이");
        }

        static void Withdraw(int balance, int amount)
        {
            if (amount > balance)
                throw new InvalidOperationException("잔액이 부족합니다");
        }

        static void ProcessOrder(int quantity)
        {
            if (quantity <= 0)
                throw new OrderException("수량은 1 이상이어야 합니다", "ORD-001");
        }
    }

    // 사용자 정의 예외 클래스
    class OrderException : Exception
    {
        public string ErrorCode { get; }

        public OrderException(string message, string errorCode) : base(message)
        {
            ErrorCode = errorCode;
        }
    }
}
