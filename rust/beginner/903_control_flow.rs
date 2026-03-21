// [903] 제어 흐름 - Control Flow
// 레벨: 1 | if 표현식, loop, while, for로 흐름을 제어합니다

fn main() {
    // if 표현식 (값 반환 가능)
    let score = 85;
    let grade = if score >= 90 { "A" }
                else if score >= 80 { "B" }
                else if score >= 70 { "C" }
                else { "F" };
    println!("점수: {} → 등급: {}", score, grade);

    // loop (무한 루프 + break 값 반환)
    let mut counter = 0;
    let result = loop {
        counter += 1;
        if counter == 10 {
            break counter * 2;
        }
    };
    println!("loop 결과: {}", result);

    // while
    let mut n = 1;
    while n < 32 {
        print!("{} ", n);
        n *= 2;
    }
    println!();

    // for + Range
    for i in 1..=5 {
        print!("{} ", i);
    }
    println!();

    for i in (1..=5).rev() {
        print!("{} ", i);
    }
    println!();

    // 컬렉션 순회
    let fruits = ["사과", "바나나", "체리"];
    for fruit in &fruits {
        println!("- {}", fruit);
    }

    // enumerate
    for (i, fruit) in fruits.iter().enumerate() {
        println!("{}: {}", i, fruit);
    }

    // 루프 레이블
    'outer: for x in 0..5 {
        for y in 0..5 {
            if x + y == 6 {
                println!("break at x={}, y={}", x, y);
                break 'outer;
            }
        }
    }

    // continue
    for i in 0..10 {
        if i % 2 == 0 { continue; }
        if i > 7 { break; }
        print!("{} ", i);
    }
    println!();

    // while let
    let mut stack = vec![1, 2, 3];
    while let Some(top) = stack.pop() {
        print!("{} ", top);
    }
    println!();
}
