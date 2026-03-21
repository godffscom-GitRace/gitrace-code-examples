// [916] 트레이트 고급 - Advanced Traits
// 레벨: 2 | 연관 타입, 연산자 오버로딩, 트레이트 객체를 배웁니다

use std::fmt;
use std::ops::{Add, Mul, Neg};

// 연관 타입 (Associated Types)
trait Iterator2 {
    type Item;
    fn next2(&mut self) -> Option<Self::Item>;
}

struct Counter { count: u32, max: u32 }

impl Counter {
    fn new(max: u32) -> Self { Self { count: 0, max } }
}

impl Iterator2 for Counter {
    type Item = u32;
    fn next2(&mut self) -> Option<u32> {
        if self.count < self.max {
            self.count += 1;
            Some(self.count)
        } else {
            None
        }
    }
}

// 연산자 오버로딩
#[derive(Debug, Clone, Copy, PartialEq)]
struct Vec2 { x: f64, y: f64 }

impl Vec2 {
    fn new(x: f64, y: f64) -> Self { Self { x, y } }
    fn magnitude(&self) -> f64 { (self.x*self.x + self.y*self.y).sqrt() }
    fn dot(&self, other: &Vec2) -> f64 { self.x*other.x + self.y*other.y }
}

impl Add for Vec2 {
    type Output = Vec2;
    fn add(self, rhs: Vec2) -> Vec2 { Vec2::new(self.x+rhs.x, self.y+rhs.y) }
}

impl Mul<f64> for Vec2 {
    type Output = Vec2;
    fn mul(self, rhs: f64) -> Vec2 { Vec2::new(self.x*rhs, self.y*rhs) }
}

impl Neg for Vec2 {
    type Output = Vec2;
    fn neg(self) -> Vec2 { Vec2::new(-self.x, -self.y) }
}

impl fmt::Display for Vec2 {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "({:.2}, {:.2})", self.x, self.y)
    }
}

// 트레이트 객체와 동적 디스패치
trait Plugin: fmt::Debug {
    fn name(&self) -> &str;
    fn execute(&self, input: &str) -> String;
}

#[derive(Debug)]
struct UpperPlugin;
#[derive(Debug)]
struct ReversePlugin;
#[derive(Debug)]
struct RepeatPlugin(usize);

impl Plugin for UpperPlugin  { fn name(&self) -> &str { "upper" }
    fn execute(&self, input: &str) -> String { input.to_uppercase() } }
impl Plugin for ReversePlugin { fn name(&self) -> &str { "reverse" }
    fn execute(&self, input: &str) -> String { input.chars().rev().collect() } }
impl Plugin for RepeatPlugin { fn name(&self) -> &str { "repeat" }
    fn execute(&self, input: &str) -> String { input.repeat(self.0) } }

struct Pipeline { plugins: Vec<Box<dyn Plugin>> }

impl Pipeline {
    fn new() -> Self { Self { plugins: vec![] } }
    fn add(mut self, p: impl Plugin + 'static) -> Self {
        self.plugins.push(Box::new(p));
        self
    }
    fn run(&self, input: &str) -> String {
        self.plugins.iter().fold(input.to_string(), |s, p| p.execute(&s))
    }
}

fn main() {
    // 연관 타입
    let mut c = Counter::new(5);
    while let Some(n) = c.next2() { print!("{} ", n); }
    println!();

    // 연산자 오버로딩
    let v1 = Vec2::new(3.0, 4.0);
    let v2 = Vec2::new(1.0, 2.0);
    println!("{} + {} = {}", v1, v2, v1 + v2);
    println!("{} * 2 = {}", v1, v1 * 2.0);
    println!("-{} = {}", v1, -v1);
    println!("크기: {:.2}", v1.magnitude());
    println!("내적: {:.2}", v1.dot(&v2));

    // 트레이트 객체 파이프라인
    let pipeline = Pipeline::new()
        .add(UpperPlugin)
        .add(RepeatPlugin(2))
        .add(ReversePlugin);

    println!("{}", pipeline.run("hello"));
}
