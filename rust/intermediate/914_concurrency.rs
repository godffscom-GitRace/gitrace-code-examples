// [914] 동시성 - Concurrency
// 레벨: 2 | 스레드, 채널, Mutex로 안전한 동시 프로그래밍을 배웁니다

use std::thread;
use std::sync::{mpsc, Arc, Mutex};
use std::time::Duration;

fn main() {
    // ===== 기본 스레드 =====
    println!("=== 기본 스레드 ===");
    let handle = thread::spawn(|| {
        for i in 1..=5 {
            println!("스레드: {}", i);
            thread::sleep(Duration::from_millis(10));
        }
    });

    for i in 1..=3 {
        println!("메인: {}", i);
        thread::sleep(Duration::from_millis(10));
    }
    handle.join().unwrap();

    // move 클로저
    println!("\n=== move 클로저 ===");
    let v = vec![1, 2, 3];
    let handle = thread::spawn(move || {
        println!("캡처: {:?}", v);
    });
    handle.join().unwrap();

    // ===== 채널 (mpsc) =====
    println!("\n=== 단방향 채널 ===");
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let msgs = vec!["안녕", "Rust", "동시성"];
        for msg in msgs {
            tx.send(msg).unwrap();
            thread::sleep(Duration::from_millis(10));
        }
    });

    for received in rx {
        println!("수신: {}", received);
    }

    // 여러 송신자
    println!("\n=== 다중 송신자 ===");
    let (tx, rx) = mpsc::channel();

    for id in 0..3 {
        let tx = tx.clone();
        thread::spawn(move || {
            tx.send(format!("sender-{}: hello", id)).unwrap();
        });
    }
    drop(tx);  // 원본 tx 닫기

    for msg in rx {
        println!("{}", msg);
    }

    // ===== Mutex =====
    println!("\n=== Mutex ===");
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let c = Arc::clone(&counter);
        handles.push(thread::spawn(move || {
            let mut num = c.lock().unwrap();
            *num += 1;
        }));
    }
    for h in handles { h.join().unwrap(); }
    println!("카운터: {}", *counter.lock().unwrap());

    // ===== 워커 풀 패턴 =====
    println!("\n=== 워커 풀 ===");
    let (job_tx, job_rx) = mpsc::channel::<String>();
    let job_rx = Arc::new(Mutex::new(job_rx));
    let mut workers = vec![];

    for id in 0..3 {
        let rx = Arc::clone(&job_rx);
        workers.push(thread::spawn(move || {
            loop {
                let job = rx.lock().unwrap().recv();
                match job {
                    Ok(j) => println!("Worker{}: {}", id, j),
                    Err(_) => break,
                }
            }
        }));
    }

    for i in 0..6 {
        job_tx.send(format!("작업{}", i)).unwrap();
    }
    drop(job_tx);
    for w in workers { w.join().unwrap(); }
}
