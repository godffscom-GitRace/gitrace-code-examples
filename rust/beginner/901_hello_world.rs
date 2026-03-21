// [901] Hello World - 첫 번째 Rust 프로그램
// 레벨: 1 | Rust의 기본 구조와 println! 매크로를 배웁니다

fn main() {
    // 기본 출력
    println!("Hello, World!");
    println!("안녕하세요, Rust!");

    // print! (줄바꿈 없음)
    print!("Hello ");
    print!("Rust");
    println!();

    // 포맷 매크로
    let name = "GitRace";
    let version = 2;
    println!("Welcome to {} v{}!", name, version);

    // 위치 인수
    println!("{0} + {1} = {2}", 10, 20, 10 + 20);

    // 이름 있는 인수
    println!("{lang}은 {adj} 언어입니다", lang = "Rust", adj = "안전한");

    // 포맷 옵션
    println!("{:>10}", "right");    // 우측 정렬
    println!("{:<10}", "left");     // 좌측 정렬
    println!("{:^10}", "center");   // 가운데 정렬
    println!("{:0>5}", 42);         // 0 패딩
    println!("{:.2}", 3.14159);     // 소수점 2자리
    println!("{:b}", 42);           // 2진수
    println!("{:x}", 255);          // 16진수

    // eprintln!: 표준 에러 출력
    eprintln!("이것은 에러 출력입니다");

    // dbg!: 디버그 출력
    let x = 5;
    let y = dbg!(x * 2) + 1;
    println!("y = {}", y);
}
