// [906] 열거형과 패턴 매칭 - Enums & Pattern Matching
// 레벨: 1 | enum, match, if let, Option, Result를 배웁니다

#[derive(Debug)]
enum Direction {
    North, South, East, West,
}

// 데이터를 담는 열거형
#[derive(Debug)]
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(u8, u8, u8),
}

impl Message {
    fn process(&self) {
        match self {
            Message::Quit                    => println!("종료"),
            Message::Move { x, y }          => println!("이동: ({}, {})", x, y),
            Message::Write(text)             => println!("쓰기: {}", text),
            Message::ChangeColor(r, g, b)   => println!("색상: rgb({},{},{})", r, g, b),
        }
    }
}

fn main() {
    // 기본 match
    let dir = Direction::North;
    match dir {
        Direction::North => println!("북쪽"),
        Direction::South => println!("남쪽"),
        Direction::East  => println!("동쪽"),
        Direction::West  => println!("서쪽"),
    }

    // 메시지 처리
    let msgs = vec![
        Message::Move { x: 10, y: 20 },
        Message::Write(String::from("hello")),
        Message::ChangeColor(255, 128, 0),
        Message::Quit,
    ];
    for msg in &msgs { msg.process(); }

    // Option<T>
    let some_num: Option<i32> = Some(42);
    let no_num: Option<i32>   = None;

    match some_num {
        Some(n) => println!("값: {}", n),
        None    => println!("없음"),
    }

    println!("언래핑: {}", some_num.unwrap_or(0));
    println!("언래핑: {}", no_num.unwrap_or(-1));
    println!("map: {:?}", some_num.map(|n| n * 2));

    // if let (단일 패턴 매칭)
    if let Some(n) = some_num {
        println!("if let: {}", n);
    }

    // Result<T, E>
    let ok: Result<i32, &str>  = Ok(100);
    let err: Result<i32, &str> = Err("실패");

    println!("{}", ok.unwrap_or(0));
    println!("{}", err.unwrap_or(-1));

    // match 가드
    let n = 7;
    let desc = match n {
        x if x < 0  => "음수",
        0            => "영",
        x if x % 2 == 0 => "양수 짝수",
        _            => "양수 홀수",
    };
    println!("{}: {}", n, desc);

    // 구조 분해
    let point = (3, -5);
    match point {
        (0, 0)       => println!("원점"),
        (x, 0) | (0, x) => println!("축 위: {}", x),
        (x, y) if x == y => println!("대각선: {}", x),
        (x, y)       => println!("점: ({}, {})", x, y),
    }

    // 범위 패턴
    let c = 'K';
    match c {
        'a'..='z' => println!("소문자"),
        'A'..='Z' => println!("대문자"),
        '0'..='9' => println!("숫자"),
        _         => println!("기타"),
    }
}
