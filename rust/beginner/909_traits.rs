// [909] 트레이트 - Traits
// 레벨: 1 | 트레이트 정의, 구현, 기본 구현, 트레이트 바운드를 배웁니다

use std::fmt;

// 트레이트 정의
trait Shape {
    fn area(&self) -> f64;
    fn perimeter(&self) -> f64;

    // 기본 구현
    fn describe(&self) -> String {
        format!("넓이: {:.2}, 둘레: {:.2}", self.area(), self.perimeter())
    }
}

trait Drawable {
    fn draw(&self);
}

// 구조체
struct Circle   { radius: f64 }
struct Rectangle { width: f64, height: f64 }
struct Triangle  { a: f64, b: f64, c: f64 }

// 트레이트 구현
impl Shape for Circle {
    fn area(&self) -> f64 { std::f64::consts::PI * self.radius * self.radius }
    fn perimeter(&self) -> f64 { 2.0 * std::f64::consts::PI * self.radius }
}

impl Shape for Rectangle {
    fn area(&self) -> f64 { self.width * self.height }
    fn perimeter(&self) -> f64 { 2.0 * (self.width + self.height) }
}

impl Shape for Triangle {
    fn area(&self) -> f64 {
        let s = self.perimeter() / 2.0;
        (s * (s-self.a) * (s-self.b) * (s-self.c)).sqrt()
    }
    fn perimeter(&self) -> f64 { self.a + self.b + self.c }
}

// Display 트레이트 구현
impl fmt::Display for Circle {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "Circle(r={})", self.radius)
    }
}

// 트레이트 바운드
fn largest<T: PartialOrd>(list: &[T]) -> &T {
    let mut largest = &list[0];
    for item in list.iter() {
        if item > largest { largest = item; }
    }
    largest
}

// where 절
fn print_shape<T>(shape: &T)
where T: Shape + fmt::Display
{
    println!("{}: {}", shape, shape.describe());
}

// 트레이트 객체 (동적 디스패치)
fn total_area(shapes: &[Box<dyn Shape>]) -> f64 {
    shapes.iter().map(|s| s.area()).sum()
}

fn main() {
    let c = Circle { radius: 5.0 };
    let r = Rectangle { width: 4.0, height: 3.0 };
    let t = Triangle  { a: 3.0, b: 4.0, c: 5.0 };

    println!("{}", c.describe());
    println!("{}", r.describe());
    println!("{}", t.describe());

    print_shape(&c);

    // 제네릭 함수
    let numbers = vec![34, 50, 25, 100, 65];
    println!("최대: {}", largest(&numbers));

    let chars = vec!['y', 'm', 'a', 'q'];
    println!("최대: {}", largest(&chars));

    // 트레이트 객체 (dyn)
    let shapes: Vec<Box<dyn Shape>> = vec![
        Box::new(Circle    { radius: 3.0 }),
        Box::new(Rectangle { width: 2.0, height: 4.0 }),
        Box::new(Triangle  { a: 3.0, b: 4.0, c: 5.0 }),
    ];
    println!("총 넓이: {:.2}", total_area(&shapes));
    for shape in &shapes {
        println!("  넓이: {:.2}", shape.area());
    }
}
