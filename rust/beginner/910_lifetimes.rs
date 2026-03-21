// [910] 라이프타임 - Lifetimes
// 레벨: 1 | 라이프타임 어노테이션으로 참조의 유효 범위를 지정합니다

// 라이프타임 어노테이션: 두 참조 중 더 짧은 쪽으로 결정
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}

// 구조체의 라이프타임
struct ImportantExcerpt<'a> {
    part: &'a str,
}

impl<'a> ImportantExcerpt<'a> {
    fn level(&self) -> i32 { 3 }

    fn announce(&self, announcement: &str) -> &str {
        println!("주목: {}", announcement);
        self.part
    }
}

// 라이프타임 생략 규칙 (컴파일러가 추론)
fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();
    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' { return &s[..i]; }
    }
    &s[..]
}

// 'static 라이프타임: 프로그램 전체 기간
fn static_str() -> &'static str {
    "나는 static 라이프타임을 가집니다"
}

// 제네릭 + 트레이트 바운드 + 라이프타임
use std::fmt::Display;

fn longest_with_announcement<'a, T>(
    x: &'a str,
    y: &'a str,
    ann: T,
) -> &'a str
where T: Display
{
    println!("안내: {}", ann);
    if x.len() > y.len() { x } else { y }
}

fn main() {
    // 기본 라이프타임
    let result;
    {
        let s1 = String::from("long string");
        let s2 = String::from("xy");
        result = longest(s1.as_str(), s2.as_str());
        println!("더 긴 문자열: {}", result);
    }

    // 구조체 라이프타임
    let novel = String::from("오래전에 엘보 핀이 있었다. 그는 ...");
    let first_sentence;
    {
        let i = novel.find('.').unwrap_or(novel.len());
        first_sentence = &novel[..i];
    }
    let excerpt = ImportantExcerpt { part: first_sentence };
    println!("발췌: {}", excerpt.part);
    println!("레벨: {}", excerpt.level());
    println!("공지: {}", excerpt.announce("중요 내용"));

    // 라이프타임 생략
    let sentence = String::from("hello world foo bar");
    println!("첫 단어: {}", first_word(&sentence));

    // static
    let s = static_str();
    println!("{}", s);

    // 제네릭 + 라이프타임
    let s1 = String::from("긴 문자열입니다");
    let s2 = String::from("짧음");
    let result = longest_with_announcement(
        &s1, &s2, "오늘의 공지사항"
    );
    println!("결과: {}", result);
}
