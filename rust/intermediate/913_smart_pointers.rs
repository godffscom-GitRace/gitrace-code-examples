// [913] 스마트 포인터 - Smart Pointers
// 레벨: 2 | Box, Rc, RefCell, Arc로 메모리를 안전하게 관리합니다

use std::rc::Rc;
use std::cell::RefCell;
use std::sync::{Arc, Mutex};
use std::thread;

// ===== Box<T>: 힙 할당 =====
fn box_examples() {
    println!("=== Box<T> ===");

    // 큰 데이터를 힙에 저장
    let b = Box::new(5);
    println!("b = {}", b);

    // 재귀 타입 (크기를 컴파일 타임에 알 수 없음)
    #[derive(Debug)]
    enum List {
        Cons(i32, Box<List>),
        Nil,
    }

    let list = List::Cons(1,
        Box::new(List::Cons(2,
            Box::new(List::Cons(3,
                Box::new(List::Nil))))));
    println!("{:?}", list);

    // 역참조
    let x = 5;
    let y = Box::new(x);
    println!("x={}, *y={}", x, *y);
}

// ===== Rc<T>: 참조 카운팅 (단일 스레드) =====
fn rc_examples() {
    println!("\n=== Rc<T> ===");

    let a = Rc::new(vec![1, 2, 3]);
    let b = Rc::clone(&a);
    let c = Rc::clone(&a);

    println!("카운트: {}", Rc::strong_count(&a));  // 3
    println!("a: {:?}", a);
    println!("b: {:?}", b);

    drop(c);
    println!("c drop 후 카운트: {}", Rc::strong_count(&a));
}

// ===== RefCell<T>: 런타임 빌림 검사 =====
fn refcell_examples() {
    println!("\n=== RefCell<T> ===");

    let data = RefCell::new(vec![1, 2, 3]);

    // 불변 빌림
    println!("{:?}", data.borrow());

    // 가변 빌림
    data.borrow_mut().push(4);
    println!("{:?}", data.borrow());

    // Rc<RefCell<T>>: 공유 + 가변
    let shared = Rc::new(RefCell::new(0));
    let a = Rc::clone(&shared);
    let b = Rc::clone(&shared);

    *a.borrow_mut() += 10;
    *b.borrow_mut() += 20;
    println!("공유 값: {}", shared.borrow());
}

// ===== Arc<T> + Mutex<T>: 멀티스레드 안전 공유 =====
fn arc_mutex_examples() {
    println!("\n=== Arc<Mutex<T>> ===");

    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..5 {
        let c = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = c.lock().unwrap();
            *num += 1;
        });
        handles.push(handle);
    }

    for h in handles { h.join().unwrap(); }
    println!("최종 카운터: {}", *counter.lock().unwrap());
}

fn main() {
    box_examples();
    rc_examples();
    refcell_examples();
    arc_mutex_examples();
}
