// [915] 비동기 프로그래밍 - Async/Await
// 레벨: 2 | async/await, Future, tokio 런타임을 배웁니다

use std::time::Duration;
use tokio::time::sleep;

// async 함수: Future를 반환
async fn fetch_user(id: u32) -> String {
    sleep(Duration::from_millis(100)).await;
    format!("User#{}", id)
}

async fn fetch_score(user: &str) -> u32 {
    sleep(Duration::from_millis(50)).await;
    (user.len() as u32) * 10
}

// 순차 실행
async fn sequential() {
    println!("=== 순차 실행 ===");
    let start = std::time::Instant::now();

    let user1 = fetch_user(1).await;
    let user2 = fetch_user(2).await;
    println!("{}, {}", user1, user2);
    println!("소요: {:?}", start.elapsed());
}

// 병렬 실행 (tokio::join!)
async fn parallel() {
    println!("\n=== 병렬 실행 ===");
    let start = std::time::Instant::now();

    let (user1, user2, user3) = tokio::join!(
        fetch_user(1),
        fetch_user(2),
        fetch_user(3),
    );
    println!("{}, {}, {}", user1, user2, user3);
    println!("소요: {:?}", start.elapsed());
}

// 에러 처리
#[derive(Debug)]
enum AppError { NotFound, Timeout }

async fn fetch_data(id: u32) -> Result<String, AppError> {
    if id == 0 { return Err(AppError::NotFound); }
    sleep(Duration::from_millis(50)).await;
    Ok(format!("data-{}", id))
}

async fn error_handling() {
    println!("\n=== 에러 처리 ===");
    match fetch_data(1).await {
        Ok(data) => println!("성공: {}", data),
        Err(e)   => println!("실패: {:?}", e),
    }
    match fetch_data(0).await {
        Ok(data) => println!("성공: {}", data),
        Err(e)   => println!("실패: {:?}", e),
    }
}

// spawn: 독립 태스크
async fn spawn_tasks() {
    println!("\n=== spawn ===");
    let mut handles = vec![];

    for i in 1..=5 {
        let h = tokio::spawn(async move {
            sleep(Duration::from_millis(10)).await;
            format!("Task-{} 완료", i)
        });
        handles.push(h);
    }

    for h in handles {
        println!("{}", h.await.unwrap());
    }
}

// select!: 먼저 완료되는 것 선택
async fn select_example() {
    println!("\n=== select! ===");
    tokio::select! {
        result = fetch_user(1) => println!("user 먼저: {}", result),
        result = fetch_data(1) => println!("data 먼저: {:?}", result),
    }
}

#[tokio::main]
async fn main() {
    sequential().await;
    parallel().await;
    error_handling().await;
    spawn_tasks().await;
    select_example().await;
}
