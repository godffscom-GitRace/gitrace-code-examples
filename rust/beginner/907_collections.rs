// [907] 컬렉션 - Collections
// 레벨: 1 | Vec, String, HashMap의 기본 사용법을 배웁니다

use std::collections::HashMap;

fn main() {
    // ===== Vec<T> =====
    let mut v: Vec<i32> = Vec::new();
    v.push(1); v.push(2); v.push(3);

    let v2 = vec![4, 5, 6, 7, 8];

    // 접근
    println!("v[0] = {}", v[0]);
    match v.get(10) {
        Some(n) => println!("있음: {}", n),
        None    => println!("인덱스 범위 초과"),
    }

    // 순회
    for n in &v2 {
        print!("{} ", n);
    }
    println!();

    // 가변 순회
    let mut nums = vec![1, 2, 3, 4, 5];
    for n in &mut nums {
        *n *= 2;
    }
    println!("{:?}", nums);

    // 고차 함수
    let evens: Vec<i32> = v2.iter().filter(|&&x| x % 2 == 0).cloned().collect();
    let squared: Vec<i32> = v2.iter().map(|&x| x * x).collect();
    let sum: i32 = v2.iter().sum();
    println!("짝수: {:?}", evens);
    println!("제곱: {:?}", squared);
    println!("합계: {}", sum);

    // 정렬
    let mut data = vec![3, 1, 4, 1, 5, 9, 2, 6];
    data.sort();
    println!("정렬: {:?}", data);
    data.sort_by(|a, b| b.cmp(a));
    println!("역순: {:?}", data);
    data.dedup();
    println!("중복제거: {:?}", data);

    // ===== String =====
    let mut s = String::from("Hello");
    s.push_str(", Rust!");
    s.push('!');
    println!("{}", s);
    println!("길이: {}", s.len());

    let s1 = String::from("Hello, ");
    let s2 = String::from("world!");
    let s3 = s1 + &s2;  // s1 소유권 이동
    println!("{}", s3);

    let s4 = format!("{}-{}-{}", "tic", "tac", "toe");
    println!("{}", s4);

    for c in "안녕하세요".chars() {
        print!("{} ", c);
    }
    println!();

    // ===== HashMap =====
    let mut scores: HashMap<String, i32> = HashMap::new();
    scores.insert(String::from("철수"), 90);
    scores.insert(String::from("영희"), 85);
    scores.entry(String::from("민수")).or_insert(75);
    scores.entry(String::from("철수")).or_insert(0);  // 이미 있어서 무시

    for (name, score) in &scores {
        println!("{}: {}", name, score);
    }

    // 단어 빈도 세기
    let text = "hello world hello rust world hello";
    let mut freq: HashMap<&str, i32> = HashMap::new();
    for word in text.split_whitespace() {
        *freq.entry(word).or_insert(0) += 1;
    }
    println!("{:?}", freq);
}
