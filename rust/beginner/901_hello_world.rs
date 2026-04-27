// [901] Hello World - 첫 번째 Rust 프로그램
// 레벨: 1 | Rust의 기본 구조와 println! 매크로를 배웁니다

fn main() {
    println!("Hello World");

    print!("Hello ");
    print!("Rust");
    println!();

    let name = "App";
    let version = 1;
    println!("Welcome to {} v{}", name, version);

    println!("{0} + {1} = {2}", 2, 3, 2 + 3);

    println!("{lang} is {adj}", lang = "Rust", adj = "safe");

    println!("{:>8}", "right");
    println!("{:<8}", "left");
    println!("{:^8}", "mid");

    println!("{:0>4}", 7);
    println!("{:.2}", 3.14);

    println!("{:b}", 5);
    println!("{:x}", 15);

    eprintln!("error log");

    let x = 3;
    let y = dbg!(x * 2);
    println!("y {}", y);
}
