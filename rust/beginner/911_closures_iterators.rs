// [911] 클로저와 이터레이터 - Closures & Iterators
// 레벨: 1 | 클로저 캡처, 이터레이터 어댑터, 체이닝을 배웁니다

fn apply<F: Fn(i32) -> i32>(f: F, x: i32) -> i32 { f(x) }
fn apply_once<F: FnOnce() -> String>(f: F) -> String { f() }
fn apply_mut<F: FnMut() -> i32>(mut f: F) -> i32 { f() + f() + f() }

fn make_adder(n: i32) -> impl Fn(i32) -> i32 {
    move |x| x + n
}

fn main() {
    // 클로저 기본
    let square = |x: i32| x * x;
    let add = |a, b| a + b;
    println!("{} {}", square(5), add(3, 4));

    // 캡처 방식
    let factor = 3;
    let multiply = |x| x * factor;   // 불변 캡처 (Fn)
    println!("{}", multiply(7));

    let mut count = 0;
    let mut inc = || { count += 1; count };  // 가변 캡처 (FnMut)
    println!("{} {} {}", inc(), inc(), inc());

    let name = String::from("Rust");
    let greet = move || format!("Hello, {}!", name);  // 소유권 이동 (FnOnce)
    println!("{}", apply_once(greet));

    // 고차 함수 인수
    println!("{}", apply(|x| x * x + 1, 5));
    println!("{}", apply_mut(|| { static mut N: i32 = 0; unsafe { N += 1; N } }));

    // 클로저 반환
    let add5 = make_adder(5);
    println!("{}", add5(10));
    println!("{:?}", vec![1,2,3].iter().map(|&x| add5(x)).collect::<Vec<_>>());

    // ===== 이터레이터 =====
    let nums = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // map + filter + collect
    let result: Vec<i32> = nums.iter()
        .filter(|&&x| x % 2 == 0)
        .map(|&x| x * x)
        .collect();
    println!("{:?}", result);

    // sum, product
    let sum: i32 = nums.iter().sum();
    let product: i64 = vec![1i64,2,3,4,5].iter().product();
    println!("합: {}, 곱: {}", sum, product);

    // fold (reduce)
    let sum2 = nums.iter().fold(0, |acc, &x| acc + x);
    println!("fold: {}", sum2);

    // flat_map
    let nested = vec![vec![1,2], vec![3,4], vec![5]];
    let flat: Vec<i32> = nested.into_iter().flatten().collect();
    println!("{:?}", flat);

    // zip
    let a = vec![1, 2, 3];
    let b = vec!["one", "two", "three"];
    let zipped: Vec<_> = a.iter().zip(b.iter()).collect();
    println!("{:?}", zipped);

    // take, skip, chain
    let first3: Vec<_> = nums.iter().take(3).collect();
    let skip3: Vec<_>  = nums.iter().skip(3).take(3).collect();
    println!("take: {:?}", first3);
    println!("skip: {:?}", skip3);

    // any, all, find, position
    println!("{} {}", nums.iter().any(|&x| x > 5), nums.iter().all(|&x| x > 0));
    println!("{:?}", nums.iter().find(|&&x| x > 5));
    println!("{:?}", nums.iter().position(|&x| x == 5));

    // enumerate
    for (i, n) in nums.iter().enumerate().take(3) {
        println!("[{}] = {}", i, n);
    }
}
