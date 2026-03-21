// [902] 변수와 자료형 - Variables & Types
// 레벨: 1 | let, mut, 상수, 기본 자료형을 배웁니다

fn main() {
    // 불변 변수 (기본)
    let x = 5;
    println!("x = {}", x);

    // 가변 변수
    let mut y = 10;
    y += 5;
    println!("y = {}", y);

    // 상수 (타입 명시 필수)
    const MAX_POINTS: u32 = 100_000;
    println!("MAX: {}", MAX_POINTS);

    // 섀도잉 (같은 이름 재선언)
    let spaces = "   ";
    let spaces = spaces.len();
    println!("공백 수: {}", spaces);

    // 정수형
    let a: i8   = -128;
    let b: u8   = 255;
    let c: i32  = -2_147_483_648;
    let d: u64  = 18_446_744_073_709_551_615;
    let e: i64  = 1_000_000;
    println!("{} {} {} {} {}", a, b, c, d, e);

    // 부동소수점
    let f: f32 = 3.14;
    let g: f64 = 2.718_281_828;
    println!("{:.2} {:.6}", f, g);

    // 불리언
    let t: bool = true;
    let f_bool: bool = false;
    println!("{} {}", t, f_bool);

    // 문자 (유니코드)
    let ch: char = '한';
    let emoji: char = '🦀';
    println!("{} {}", ch, emoji);

    // 숫자 리터럴
    let dec = 98_222;
    let hex = 0xff;
    let oct = 0o77;
    let bin = 0b1111_0000;
    let byte = b'A';
    println!("{} {} {} {} {}", dec, hex, oct, bin, byte);

    // 타입 변환 (as)
    let n: i32 = 42;
    let m: f64 = n as f64;
    let k: u8  = 300u32 as u8;  // 오버플로우: 44
    println!("{} {} {}", n, m, k);
}
