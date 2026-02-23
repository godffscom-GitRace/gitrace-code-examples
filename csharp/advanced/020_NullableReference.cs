// [20] Nullable 참조 형식 - Nullable Reference Types
// 레벨: 4 | C# 8.0의 nullable 참조 형식으로 null 안전성을 확보합니다

#nullable enable

using System;
using System.Collections.Generic;

namespace NullableReference
{
    class Program
    {
        static void Main(string[] args)
        {
            // === nullable 참조 형식 ===
            Console.WriteLine("=== Nullable 참조 형식 ===");
            string name = "김철수";       // null 불가
            string? nickname = null;      // null 허용 (?)

            Console.WriteLine($"이름: {name}");
            Console.WriteLine($"닉네임: {nickname ?? "없음"}");

            // null 허용 연산자 (!) - null이 아님을 확신할 때
            string? input = GetInput();
            if (input != null)
            {
                string confirmed = input!;  // ! 연산자
                Console.WriteLine($"입력값: {confirmed.ToUpper()}");
            }

            // === null 조건부 연산자 (?.) ===
            Console.WriteLine("\n=== ?. 연산자 ===");
            User? user = FindUser(1);
            // user가 null이면 전체가 null
            string? city = user?.Address?.City;
            Console.WriteLine($"도시: {city ?? "정보 없음"}");

            int? nameLength = user?.Name?.Length;
            Console.WriteLine($"이름 길이: {nameLength ?? 0}");

            // null인 경우
            User? ghost = FindUser(999);
            Console.WriteLine($"유령 도시: {ghost?.Address?.City ?? "없음"}");

            // === Nullish 병합 연산자 (??) ===
            Console.WriteLine("\n=== ?? 연산자 ===");
            string? setting = null;
            string value = setting ?? "기본값";
            Console.WriteLine($"설정: {value}");

            // ??= 복합 할당 (null이면 할당)
            string? cache = null;
            cache ??= "새로운 값";
            Console.WriteLine($"캐시: {cache}");
            cache ??= "덮어쓰기 안 됨";
            Console.WriteLine($"캐시: {cache}");  // 그대로

            // === null 안전성 패턴 ===
            Console.WriteLine("\n=== 안전성 패턴 ===");

            // 패턴 매칭으로 null 체크
            PrintInfo(FindUser(1));
            PrintInfo(FindUser(999));

            // 컬렉션 안전 처리
            List<string>? items = GetItems();
            int count = items?.Count ?? 0;
            Console.WriteLine($"\n아이템: {count}개");

            // foreach null 안전
            foreach (var item in items ?? new List<string>())
            {
                Console.WriteLine($"  - {item}");
            }

            // === 실전 활용 ===
            Console.WriteLine("\n=== 실전 활용 ===");
            var service = new UserService();
            var result = service.GetDisplayName(1);
            Console.WriteLine($"표시 이름: {result}");

            result = service.GetDisplayName(999);
            Console.WriteLine($"표시 이름: {result}");
        }

        static string? GetInput()
        {
            return "사용자 입력";
        }

        static User? FindUser(int id)
        {
            if (id == 1)
                return new User("김철수", new Address("서울", "강남구"));
            return null;  // 못 찾음
        }

        static List<string>? GetItems()
        {
            return new List<string> { "사과", "바나나", "딸기" };
        }

        // 패턴 매칭 + null 체크
        static void PrintInfo(User? user)
        {
            string info = user switch
            {
                { Address.City: "서울" } => $"{user.Name} (서울 거주)",
                { Name: var n } => $"{n} (기타 지역)",
                null => "사용자 없음",
            };
            Console.WriteLine(info);
        }
    }

    class Address
    {
        public string City { get; }
        public string District { get; }

        public Address(string city, string district)
        {
            City = city;
            District = district;
        }
    }

    class User
    {
        public string Name { get; }
        public Address? Address { get; }

        public User(string name, Address? address = null)
        {
            Name = name;
            Address = address;
        }
    }

    class UserService
    {
        public string GetDisplayName(int userId)
        {
            User? user = userId == 1
                ? new User("김철수", new Address("서울", "강남구"))
                : null;

            // ?. + ?? 조합으로 안전하게 처리
            return user?.Name?.ToUpper() ?? "익명 사용자";
        }
    }
}
