// [904] 소유권 - Ownership
// 레벨: 1 | Rust의 핵심 개념인 소유권, 이동, 복사를 배웁니다

fn main() {
    // ===== 소유권 이동 (Move) =====
    let s1 = String::from("hello");
    let s2 = s1;            // s1의 소유권이 s2로 이동
    // println!("{}", s1); // 오류! s1은 더 이상 유효하지 않음
    println!("s2: {}", s2);

    // clone: 깊은 복사
    let s3 = String::from("world");
    let s4 = s3.clone();    // 소유권 유지
    println!("s3: {}, s4: {}", s3, s4);

    // Copy 타입 (스택에 저장 - 자동 복사)
    let x = 5;
    let y = x;              // 복사 (이동 아님)
    println!("x: {}, y: {}", x, y);

    // ===== 함수와 소유권 =====
    let s = String::from("ownership");
    takes_ownership(s);     // s 소유권이 함수로 이동
    // println!("{}", s);   // 오류!

    let n = 42;
    makes_copy(n);          // i32는 Copy이므로 n 유효
    println!("n still: {}", n);

    // 소유권 반환
    let s5 = String::from("returned");
    let s6 = gives_back(s5);
    println!("s6: {}", s6);

    // 여러 값 반환
    let s7 = String::from("tuple");
    let (s8, len) = calculate_length_move(s7);
    println!("'{}' 길이: {}", s8, len);

    // ===== 참조와 빌림 =====
    let s9 = String::from("borrow");
    let len = calculate_length(&s9);   // 빌림 (소유권 이전 없음)
    println!("'{}' 길이: {}", s9, len);

    // 가변 참조
    let mut s10 = String::from("hello");
    change(&mut s10);
    println!("변경됨: {}", s10);

    // 참조 규칙: 불변 참조 여러 개 OR 가변 참조 하나
    let r1 = &s10;
    let r2 = &s10;
    println!("{} and {}", r1, r2);  // r1, r2 마지막 사용

    let r3 = &mut s10;              // 이제 가변 참조 가능
    r3.push_str(", world");
    println!("{}", r3);
}

fn takes_ownership(s: String) {
    println!("가져감: {}", s);
}

fn makes_copy(n: i32) {
    println!("복사됨: {}", n);
}

fn gives_back(s: String) -> String {
    s
}

fn calculate_length_move(s: String) -> (String, usize) {
    let len = s.len();
    (s, len)
}

fn calculate_length(s: &String) -> usize {
    s.len()
}

fn change(s: &mut String) {
    s.push_str(", Rust!");
}
