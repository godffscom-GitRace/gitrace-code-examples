// [905] 구조체 - Structs
// 레벨: 1 | 구조체 정의, 메서드, 연관 함수를 배웁니다

// 구조체 정의
#[derive(Debug, Clone)]
struct Rectangle {
    width: f64,
    height: f64,
}

// impl 블록: 메서드 구현
impl Rectangle {
    // 연관 함수 (생성자)
    fn new(width: f64, height: f64) -> Self {
        Self { width, height }
    }

    fn square(size: f64) -> Self {
        Self { width: size, height: size }
    }

    // 메서드 (&self: 불변, &mut self: 가변, self: 소유권 이전)
    fn area(&self) -> f64 {
        self.width * self.height
    }

    fn perimeter(&self) -> f64 {
        2.0 * (self.width + self.height)
    }

    fn is_square(&self) -> bool {
        (self.width - self.height).abs() < f64::EPSILON
    }

    fn scale(&mut self, factor: f64) {
        self.width  *= factor;
        self.height *= factor;
    }

    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}

// 튜플 구조체
#[derive(Debug)]
struct Point(f64, f64);

impl Point {
    fn distance(&self, other: &Point) -> f64 {
        ((self.0 - other.0).powi(2) + (self.1 - other.1).powi(2)).sqrt()
    }
}

// 유닛 구조체
struct AlwaysEqual;

// 구조체 업데이트 문법
#[derive(Debug)]
struct User {
    name: String,
    email: String,
    age: u32,
    active: bool,
}

fn main() {
    let mut rect = Rectangle::new(10.0, 5.0);
    println!("{:?}", rect);
    println!("넓이: {}", rect.area());
    println!("둘레: {}", rect.perimeter());
    println!("정사각형: {}", rect.is_square());

    rect.scale(2.0);
    println!("2배 확대: {:?}", rect);

    let sq = Rectangle::square(4.0);
    println!("정사각형: {:?}, 정사각형?: {}", sq, sq.is_square());

    let small = Rectangle::new(3.0, 2.0);
    println!("담을 수 있음: {}", rect.can_hold(&small));

    let p1 = Point(0.0, 0.0);
    let p2 = Point(3.0, 4.0);
    println!("거리: {}", p1.distance(&p2));

    let user1 = User {
        name: String::from("철수"),
        email: String::from("cs@example.com"),
        age: 25,
        active: true,
    };

    // 구조체 업데이트
    let user2 = User {
        email: String::from("new@example.com"),
        ..user1  // 나머지 필드는 user1에서 복사 (user1.name 이동됨)
    };
    println!("{:?}", user2);
}
