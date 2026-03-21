// [920] 알고리즘 - Algorithms
// 레벨: 3 | Rust로 정렬, 탐색, 자료구조 알고리즘을 구현합니다

use std::collections::{BinaryHeap, HashMap};
use std::cmp::Reverse;

// ===== 정렬 =====
fn quick_sort<T: Ord + Clone>(arr: &[T]) -> Vec<T> {
    if arr.len() <= 1 { return arr.to_vec(); }
    let pivot = arr[arr.len() / 2].clone();
    let left:   Vec<T> = arr.iter().filter(|&x| x < &pivot).cloned().collect();
    let middle: Vec<T> = arr.iter().filter(|&x| x == &pivot).cloned().collect();
    let right:  Vec<T> = arr.iter().filter(|&x| x > &pivot).cloned().collect();
    [quick_sort(&left), middle, quick_sort(&right)].concat()
}

fn merge_sort<T: Ord + Clone>(arr: &[T]) -> Vec<T> {
    if arr.len() <= 1 { return arr.to_vec(); }
    let mid   = arr.len() / 2;
    let left  = merge_sort(&arr[..mid]);
    let right = merge_sort(&arr[mid..]);
    merge(&left, &right)
}

fn merge<T: Ord + Clone>(l: &[T], r: &[T]) -> Vec<T> {
    let mut result = Vec::with_capacity(l.len() + r.len());
    let (mut i, mut j) = (0, 0);
    while i < l.len() && j < r.len() {
        if l[i] <= r[j] { result.push(l[i].clone()); i += 1; }
        else             { result.push(r[j].clone()); j += 1; }
    }
    result.extend_from_slice(&l[i..]);
    result.extend_from_slice(&r[j..]);
    result
}

// ===== 이진 탐색 =====
fn binary_search<T: Ord>(arr: &[T], target: &T) -> Option<usize> {
    let (mut lo, mut hi) = (0, arr.len());
    while lo < hi {
        let mid = lo + (hi - lo) / 2;
        match arr[mid].cmp(target) {
            std::cmp::Ordering::Equal   => return Some(mid),
            std::cmp::Ordering::Less    => lo = mid + 1,
            std::cmp::Ordering::Greater => hi = mid,
        }
    }
    None
}

// ===== 연결 리스트 =====
type Link<T> = Option<Box<Node<T>>>;

struct Node<T> { value: T, next: Link<T> }

struct LinkedList<T> { head: Link<T>, len: usize }

impl<T: std::fmt::Debug> LinkedList<T> {
    fn new() -> Self { Self { head: None, len: 0 } }

    fn push_front(&mut self, value: T) {
        self.head = Some(Box::new(Node { value, next: self.head.take() }));
        self.len += 1;
    }

    fn pop_front(&mut self) -> Option<T> {
        self.head.take().map(|node| {
            self.head = node.next;
            self.len -= 1;
            node.value
        })
    }

    fn peek(&self) -> Option<&T> { self.head.as_ref().map(|n| &n.value) }
}

// ===== 다익스트라 최단 경로 =====
fn dijkstra(graph: &HashMap<&str, Vec<(&str, u32)>>, start: &str) -> HashMap<String, u32> {
    let mut dist: HashMap<String, u32> = HashMap::new();
    let mut heap = BinaryHeap::new();

    dist.insert(start.to_string(), 0);
    heap.push(Reverse((0u32, start.to_string())));

    while let Some(Reverse((cost, node))) = heap.pop() {
        if dist.get(&node).map(|&d| cost > d).unwrap_or(false) { continue; }
        if let Some(neighbors) = graph.get(node.as_str()) {
            for &(next, weight) in neighbors {
                let new_cost = cost + weight;
                if new_cost < *dist.get(next).unwrap_or(&u32::MAX) {
                    dist.insert(next.to_string(), new_cost);
                    heap.push(Reverse((new_cost, next.to_string())));
                }
            }
        }
    }
    dist
}

fn main() {
    let arr = vec![64, 34, 25, 12, 22, 11, 90];
    println!("원본: {:?}", arr);
    println!("퀵정렬: {:?}", quick_sort(&arr));
    println!("병합정렬: {:?}", merge_sort(&arr));

    let sorted = merge_sort(&arr);
    println!("이진탐색(25): {:?}", binary_search(&sorted, &25));
    println!("이진탐색(99): {:?}", binary_search(&sorted, &99));

    let mut list: LinkedList<i32> = LinkedList::new();
    for n in [1, 2, 3, 4, 5] { list.push_front(n); }
    println!("top: {:?}, len: {}", list.peek(), list.len);
    while let Some(v) = list.pop_front() { print!("{} ", v); }
    println!();

    let graph: HashMap<&str, Vec<(&str, u32)>> = HashMap::from([
        ("A", vec![("B", 4), ("C", 2)]),
        ("B", vec![("D", 3), ("C", 1)]),
        ("C", vec![("B", 1), ("D", 5)]),
        ("D", vec![]),
    ]);
    let mut dists: Vec<_> = dijkstra(&graph, "A").into_iter().collect();
    dists.sort();
    println!("\n최단 거리 from A:");
    for (node, dist) in dists { println!("  → {}: {}", node, dist); }
}
