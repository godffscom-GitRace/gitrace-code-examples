// [917] 함수형 프로그래밍 - Functional Programming
// 레벨: 2 | 이터레이터 어댑터, 함수 합성, 커링을 배웁니다

use std::collections::HashMap;

// 함수 합성
fn compose<A, B, C>(f: impl Fn(B) -> C, g: impl Fn(A) -> B) -> impl Fn(A) -> C {
    move |x| f(g(x))
}

// 커링 스타일
fn add(a: i32) -> impl Fn(i32) -> i32 {
    move |b| a + b
}

fn multiply(a: i32) -> impl Fn(i32) -> i32 {
    move |b| a * b
}

// 사용자 정의 이터레이터
struct Fibonacci { a: u64, b: u64 }

impl Fibonacci {
    fn new() -> Self { Self { a: 0, b: 1 } }
}

impl Iterator for Fibonacci {
    type Item = u64;
    fn next(&mut self) -> Option<u64> {
        let result = self.a;
        let next   = self.a + self.b;
        self.a = self.b;
        self.b = next;
        Some(result)
    }
}

// 데이터 처리 파이프라인
#[derive(Debug, Clone)]
struct Student {
    name: String,
    grade: u32,
    score: f64,
}

impl Student {
    fn new(name: &str, grade: u32, score: f64) -> Self {
        Self { name: name.to_string(), grade, score }
    }
}

fn main() {
    // 함수 합성
    let double    = |x: i32| x * 2;
    let add_one   = |x: i32| x + 1;
    let square    = |x: i32| x * x;

    let pipeline  = compose(square, compose(add_one, double));
    println!("pipeline(3) = {}", pipeline(3));  // ((3*2)+1)^2 = 49

    // 커링
    let add5  = add(5);
    let triple = multiply(3);
    let nums = vec![1, 2, 3, 4, 5];
    println!("add5:  {:?}", nums.iter().map(|&x| add5(x)).collect::<Vec<_>>());
    println!("triple:{:?}", nums.iter().map(|&x| triple(x)).collect::<Vec<_>>());

    // 이터레이터 체이닝
    let result: Vec<String> = (1..=20)
        .filter(|n| n % 2 == 0)
        .map(|n| n * n)
        .filter(|n| n > &50)
        .map(|n| format!("sq({})", n))
        .take(5)
        .collect();
    println!("{:?}", result);

    // 피보나치
    let fibs: Vec<u64> = Fibonacci::new().take(10).collect();
    println!("피보나치: {:?}", fibs);

    let fib_sum: u64 = Fibonacci::new()
        .take_while(|&n| n < 100)
        .filter(|n| n % 2 == 0)
        .sum();
    println!("100 미만 짝수 피보나치 합: {}", fib_sum);

    // 데이터 파이프라인
    let students = vec![
        Student::new("철수", 3, 88.0),
        Student::new("영희", 2, 95.0),
        Student::new("민수", 3, 72.0),
        Student::new("지영", 1, 90.0),
        Student::new("현우", 2, 65.0),
    ];

    // 학년별 평균
    let grade_avg: HashMap<u32, f64> = {
        let mut map: HashMap<u32, Vec<f64>> = HashMap::new();
        for s in &students {
            map.entry(s.grade).or_default().push(s.score);
        }
        map.into_iter()
           .map(|(g, scores)| (g, scores.iter().sum::<f64>() / scores.len() as f64))
           .collect()
    };

    let mut grades: Vec<_> = grade_avg.iter().collect();
    grades.sort_by_key(|&(g, _)| g);
    for (grade, avg) in grades {
        println!("{}학년 평균: {:.1}", grade, avg);
    }

    // 상위 학생
    let top: Vec<&str> = students.iter()
        .filter(|s| s.score >= 85.0)
        .map(|s| s.name.as_str())
        .collect();
    println!("우수 학생: {:?}", top);
}
