// [918] 매크로 - Macros
// 레벨: 3 | macro_rules!로 선언적 매크로를 작성합니다

// 기본 매크로
macro_rules! say_hello {
    () => { println!("Hello!"); };
    ($name:expr) => { println!("Hello, {}!", $name); };
    ($greeting:expr, $name:expr) => { println!("{}, {}!", $greeting, $name); };
}

// vec! 유사 매크로
macro_rules! my_vec {
    () => { Vec::new() };
    ($($x:expr),+ $(,)?) => {{
        let mut v = Vec::new();
        $(v.push($x);)+
        v
    }};
}

// map! 매크로
macro_rules! map {
    ($($key:expr => $val:expr),* $(,)?) => {{
        use std::collections::HashMap;
        let mut m = HashMap::new();
        $(m.insert($key, $val);)*
        m
    }};
}

// 최솟값 매크로 (재귀)
macro_rules! min {
    ($x:expr)             => { $x };
    ($x:expr, $($y:expr),+) => {
        std::cmp::min($x, min!($($y),+))
    };
}

// 로깅 매크로
macro_rules! log {
    ($level:ident, $($arg:tt)*) => {
        println!("[{}] {}", stringify!($level), format!($($arg)*));
    };
}

// assert_approx 매크로
macro_rules! assert_approx {
    ($a:expr, $b:expr, $eps:expr) => {
        let diff = ($a - $b).abs();
        if diff > $eps {
            panic!("차이 {} > 허용 오차 {}", diff, $eps);
        }
    };
}

// 구조체 빌더 매크로
macro_rules! builder {
    (struct $name:ident { $($field:ident: $type:ty),* $(,)? }) => {
        #[derive(Debug, Default)]
        struct $name {
            $($field: $type,)*
        }

        impl $name {
            fn new() -> Self { Self::default() }
            $(
                fn $field(mut self, val: $type) -> Self {
                    self.$field = val;
                    self
                }
            )*
        }
    };
}

builder! {
    struct Config {
        host: String,
        port: u16,
        debug: bool,
    }
}

fn main() {
    say_hello!();
    say_hello!("Rust");
    say_hello!("안녕", "철수");

    let v: Vec<i32> = my_vec![1, 2, 3, 4, 5];
    println!("{:?}", v);

    let m = map!{
        "one"   => 1,
        "two"   => 2,
        "three" => 3,
    };
    println!("{:?}", m);

    println!("min: {}", min!(5, 3, 8, 1, 9, 2));

    log!(INFO, "서버 시작: port={}", 8080);
    log!(WARN, "메모리 사용량: {}%", 85);
    log!(ERROR, "연결 실패: {}", "timeout");

    assert_approx!(3.14159, std::f64::consts::PI, 0.001);
    println!("근사값 검증 통과!");

    let config = Config::new()
        .host(String::from("localhost"))
        .port(8080)
        .debug(true);
    println!("{:?}", config);

    // 표준 매크로 활용
    let v2 = vec![1; 5];
    println!("{:?}", v2);

    let s = format!("{:0>5}", 42);
    println!("{}", s);

    assert_eq!(2 + 2, 4, "수학이 잘못됨");
    assert!(v.len() == 5);
    println!("모든 검증 통과!");
}
