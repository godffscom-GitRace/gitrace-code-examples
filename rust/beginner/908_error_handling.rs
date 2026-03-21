// [908] 에러 처리 - Error Handling
// 레벨: 1 | Result, ?, 사용자 정의 에러를 배웁니다

use std::fmt;
use std::num::ParseIntError;

// 사용자 정의 에러
#[derive(Debug)]
enum AppError {
    ParseError(ParseIntError),
    DivisionByZero,
    NegativeNumber(i32),
    Custom(String),
}

impl fmt::Display for AppError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            AppError::ParseError(e)      => write!(f, "파싱 오류: {}", e),
            AppError::DivisionByZero     => write!(f, "0으로 나눌 수 없습니다"),
            AppError::NegativeNumber(n)  => write!(f, "음수 불가: {}", n),
            AppError::Custom(msg)        => write!(f, "오류: {}", msg),
        }
    }
}

impl From<ParseIntError> for AppError {
    fn from(e: ParseIntError) -> Self {
        AppError::ParseError(e)
    }
}

// ? 연산자로 에러 전파
fn parse_and_double(s: &str) -> Result<i32, AppError> {
    let n: i32 = s.parse()?;  // ParseIntError → AppError 자동 변환
    if n < 0 {
        return Err(AppError::NegativeNumber(n));
    }
    Ok(n * 2)
}

fn safe_divide(a: i32, b: i32) -> Result<i32, AppError> {
    if b == 0 {
        Err(AppError::DivisionByZero)
    } else {
        Ok(a / b)
    }
}

// 여러 에러 처리 체이닝
fn complex_operation(input: &str, divisor: i32) -> Result<i32, AppError> {
    let doubled = parse_and_double(input)?;
    let result  = safe_divide(doubled, divisor)?;
    Ok(result + 1)
}

fn main() {
    // 기본 Result 처리
    let ok: Result<i32, &str>  = Ok(42);
    let err: Result<i32, &str> = Err("실패");

    println!("{}", ok.unwrap_or(0));
    println!("{}", err.unwrap_or_default());

    // match로 처리
    match parse_and_double("21") {
        Ok(n)  => println!("결과: {}", n),
        Err(e) => println!("오류: {}", e),
    }

    // 여러 입력 테스트
    let inputs = vec!["10", "-5", "abc", "0"];
    for input in &inputs {
        match parse_and_double(input) {
            Ok(n)  => println!("{} → {}", input, n),
            Err(e) => println!("{} → 오류: {}", input, e),
        }
    }

    // 체이닝
    println!("\n체이닝:");
    let cases = vec![("5", 2), ("abc", 1), ("10", 0), ("-3", 1)];
    for (input, div) in &cases {
        match complex_operation(input, *div) {
            Ok(n)  => println!("({}, {}) → {}", input, div, n),
            Err(e) => println!("({}, {}) → {}", input, div, e),
        }
    }

    // unwrap_or_else, map, and_then
    let result = parse_and_double("7")
        .map(|n| n + 100)
        .and_then(|n| safe_divide(n, 3))
        .unwrap_or(0);
    println!("\n최종: {}", result);
}
