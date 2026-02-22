// [82] 변수와 자료형 - Variables & Types
// 레벨: 1 | C#의 변수와 자료형 시스템을 학습합니다

using System;

namespace Variables
{
    class Program
    {
        static void Main(string[] args)
        {
            // 값 타입 (int, double, bool)
            int age = 25;
            double height = 175.5;
            bool isStudent = true;
            char grade = 'A';

            Console.WriteLine($"나이: {age}");
            Console.WriteLine($"키: {height}");
            Console.WriteLine($"학생: {isStudent}");
            Console.WriteLine($"등급: {grade}");

            // 참조 타입 (string)
            string name = "김철수";
            Console.WriteLine($"이름: {name}, 길이: {name.Length}");

            // var 키워드 - 타입 추론
            var city = "서울";       // string으로 추론
            var score = 95;          // int로 추론
            var pi = 3.14;           // double로 추론
            Console.WriteLine($"{city}, {score}점, pi={pi}");

            // const와 readonly - 상수
            const double TAX_RATE = 0.1;
            // TAX_RATE = 0.2; // Error! const는 변경 불가
            Console.WriteLine($"세율: {TAX_RATE}");

            // 형변환
            double numDouble = 3.99;
            int numInt = (int)numDouble;        // 명시적 (소수점 버림)
            Console.WriteLine($"3.99 → {numInt}");  // 3

            string numStr = "123";
            int parsed = int.Parse(numStr);      // 문자열 → 정수
            string back = parsed.ToString();     // 정수 → 문자열
            Console.WriteLine($"파싱: {parsed}, 변환: {back}");
        }
    }
}
