// [912] 제네릭 - Generics
// 레벨: 1 | 제네릭 함수, 구조체, 열거형으로 재사용 가능한 코드를 작성합니다

use std::fmt::Display;

// 제네릭 함수
fn largest<T: PartialOrd>(list: &[T]) -> &T {
    let mut largest = &list[0];
    for item in list {
        if item > largest { largest = item; }
    }
    largest
}

fn print_pair<T: Display, U: Display>(x: T, y: U) {
    println!("({}, {})", x, y);
}

// 제네릭 구조체
#[derive(Debug)]
struct Pair<T> {
    first: T,
    second: T,
}

impl<T> Pair<T> {
    fn new(first: T, second: T) -> Self { Self { first, second } }
}

impl<T: Display + PartialOrd> Pair<T> {
    fn cmp_display(&self) {
        if self.first >= self.second {
            println!("first: {}", self.first);
        } else {
            println!("second: {}", self.second);
        }
    }
}

// 제네릭 열거형
#[derive(Debug)]
enum Either<L, R> {
    Left(L),
    Right(R),
}

impl<L: Display, R: Display> Either<L, R> {
    fn value(&self) -> String {
        match self {
            Either::Left(l)  => format!("Left({})", l),
            Either::Right(r) => format!("Right({})", r),
        }
    }
}

// 제네릭 스택
struct Stack<T> {
    data: Vec<T>,
}

impl<T> Stack<T> {
    fn new() -> Self { Self { data: Vec::new() } }
    fn push(&mut self, item: T) { self.data.push(item); }
    fn pop(&mut self) -> Option<T> { self.data.pop() }
    fn peek(&self) -> Option<&T> { self.data.last() }
    fn is_empty(&self) -> bool { self.data.is_empty() }
    fn len(&self) -> usize { self.data.len() }
}

// 블랭킷 구현 (트레이트 기반 조건부 구현)
trait Summary {
    fn summarize(&self) -> String;
}

struct Article { title: String, author: String }
impl Summary for Article {
    fn summarize(&self) -> String {
        format!("{}, by {}", self.title, self.author)
    }
}

fn notify(item: &impl Summary) {
    println!("요약: {}", item.summarize());
}

fn notify_bound<T: Summary + Display>(item: &T) {
    println!("알림: {} - {}", item, item.summarize());
}

fn main() {
    println!("{}", largest(&[34, 50, 25, 100, 65]));
    println!("{}", largest(&["banana", "apple", "cherry"]));

    print_pair(42, "hello");
    print_pair(3.14, true);

    let pair = Pair::new(5, 10);
    println!("{:?}", pair);
    pair.cmp_display();

    let e1: Either<i32, &str> = Either::Left(42);
    let e2: Either<i32, &str> = Either::Right("hello");
    println!("{}", e1.value());
    println!("{}", e2.value());

    let mut stack: Stack<i32> = Stack::new();
    for i in 1..=5 { stack.push(i); }
    println!("크기: {}, top: {:?}", stack.len(), stack.peek());
    while !stack.is_empty() {
        print!("{:?} ", stack.pop());
    }
    println!();

    let article = Article {
        title: String::from("Rust 제네릭"),
        author: String::from("홍길동"),
    };
    notify(&article);
}
