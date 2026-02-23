// [12] 대리자와 이벤트 - Delegate & Event
// 레벨: 4 | C# 고유의 대리자와 이벤트 시스템을 배웁니다

using System;

namespace DelegateEvent
{
    // delegate 선언 - 메서드의 시그니처 정의
    delegate int Calculator(int a, int b);
    delegate void Notify(string message);

    class Program
    {
        static void Main(string[] args)
        {
            // === delegate 기본 ===
            Console.WriteLine("=== Delegate ===");
            Calculator add = Add;
            Calculator multiply = Multiply;

            Console.WriteLine($"더하기: {add(10, 3)}");       // 13
            Console.WriteLine($"곱하기: {multiply(10, 3)}");  // 30

            // 람다로 대입
            Calculator subtract = (a, b) => a - b;
            Console.WriteLine($"빼기: {subtract(10, 3)}");    // 7

            // += 연산자 - 멀티캐스트 대리자
            Console.WriteLine("\n=== 멀티캐스트 ===");
            Notify notify = null;
            notify += msg => Console.WriteLine($"[이메일] {msg}");
            notify += msg => Console.WriteLine($"[SMS] {msg}");
            notify += msg => Console.WriteLine($"[푸시] {msg}");
            notify?.Invoke("새로운 알림!");

            // === event 키워드 ===
            Console.WriteLine("\n=== Event ===");
            var button = new Button("확인");

            // 이벤트 구독
            button.Clicked += (sender, text) =>
                Console.WriteLine($"버튼 '{text}' 클릭됨!");
            button.Clicked += (sender, text) =>
                Console.WriteLine($"로그: {sender} - {text}");

            button.Click();
            button.Click();

            // 콜백 패턴
            Console.WriteLine("\n=== 콜백 패턴 ===");
            var downloader = new FileDownloader();
            downloader.OnProgress += percent =>
                Console.WriteLine($"다운로드: {percent}%");
            downloader.OnComplete += () =>
                Console.WriteLine("다운로드 완료!");

            downloader.Download("file.zip");
        }

        static int Add(int a, int b) => a + b;
        static int Multiply(int a, int b) => a * b;
    }

    // event 키워드 사용
    class Button
    {
        public string Text { get; }

        // event 선언 - 외부에서 직접 Invoke 불가
        public event Action<string, string> Clicked;

        public Button(string text) { Text = text; }

        public void Click()
        {
            Console.WriteLine($"\n[{Text}] 버튼 눌림");
            Clicked?.Invoke("Button", Text);
        }
    }

    // 콜백 패턴
    class FileDownloader
    {
        public event Action<int> OnProgress;
        public event Action OnComplete;

        public void Download(string fileName)
        {
            Console.WriteLine($"\n'{fileName}' 다운로드 시작");
            for (int i = 25; i <= 100; i += 25)
            {
                OnProgress?.Invoke(i);
            }
            OnComplete?.Invoke();
        }
    }
}
