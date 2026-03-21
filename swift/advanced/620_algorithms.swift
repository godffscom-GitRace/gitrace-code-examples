// [620] 알고리즘 - Algorithms
// 레벨: 3 | Swift로 구현하는 정렬, 탐색, 자료구조 알고리즘

// ===== 정렬 =====
func quickSort<T: Comparable>(_ arr: [T]) -> [T] {
    guard arr.count > 1 else { return arr }
    let pivot = arr[arr.count / 2]
    let left   = arr.filter { $0 < pivot }
    let middle = arr.filter { $0 == pivot }
    let right  = arr.filter { $0 > pivot }
    return quickSort(left) + middle + quickSort(right)
}

func mergeSort<T: Comparable>(_ arr: [T]) -> [T] {
    guard arr.count > 1 else { return arr }
    let mid = arr.count / 2
    return merge(mergeSort(Array(arr[..<mid])), mergeSort(Array(arr[mid...])))
}

func merge<T: Comparable>(_ l: [T], _ r: [T]) -> [T] {
    var result: [T] = []; var i = 0, j = 0
    while i < l.count && j < r.count {
        if l[i] <= r[j] { result.append(l[i]); i += 1 }
        else             { result.append(r[j]); j += 1 }
    }
    return result + l[i...] + r[j...]
}

// ===== 이진 탐색 =====
func binarySearch<T: Comparable>(_ arr: [T], target: T) -> Int? {
    var lo = 0, hi = arr.count - 1
    while lo <= hi {
        let mid = (lo + hi) / 2
        if arr[mid] == target      { return mid }
        else if arr[mid] < target  { lo = mid + 1 }
        else                       { hi = mid - 1 }
    }
    return nil
}

// ===== 연결 리스트 =====
class ListNode<T> {
    var value: T
    var next: ListNode<T>?
    init(_ value: T) { self.value = value }
}

func makeList<T>(_ values: [T]) -> ListNode<T>? {
    guard let first = values.first else { return nil }
    let head = ListNode(first)
    var curr = head
    for v in values.dropFirst() {
        curr.next = ListNode(v)
        curr = curr.next!
    }
    return head
}

func printList<T>(_ head: ListNode<T>?) {
    var node = head
    var parts: [String] = []
    while let n = node { parts.append("\(n.value)"); node = n.next }
    print(parts.joined(separator: " → "))
}

func reverseList<T>(_ head: ListNode<T>?) -> ListNode<T>? {
    var prev: ListNode<T>? = nil
    var curr = head
    while let node = curr {
        let next = node.next
        node.next = prev
        prev = node
        curr = next
    }
    return prev
}

// ===== 스택과 큐 =====
struct Stack<T> {
    private var items: [T] = []
    mutating func push(_ item: T) { items.append(item) }
    mutating func pop() -> T?     { items.popLast() }
    var top: T?                   { items.last }
    var isEmpty: Bool             { items.isEmpty }
}

struct Queue<T> {
    private var enqueue: [T] = []
    private var dequeue: [T] = []
    mutating func push(_ item: T) { enqueue.append(item) }
    mutating func pop() -> T? {
        if dequeue.isEmpty { dequeue = enqueue.reversed(); enqueue = [] }
        return dequeue.popLast()
    }
    var isEmpty: Bool { enqueue.isEmpty && dequeue.isEmpty }
}

// ===== 실행 =====
let arr = [64, 34, 25, 12, 22, 11, 90]
print("원본: \(arr)")
print("퀵정렬: \(quickSort(arr))")
print("병합정렬: \(mergeSort(arr))")

let sorted = mergeSort(arr)
print("이진탐색(25): 인덱스 \(binarySearch(sorted, target: 25) as Any)")
print("이진탐색(99): 인덱스 \(binarySearch(sorted, target: 99) as Any)")

print("\n=== 연결 리스트 ===")
let list = makeList([1, 2, 3, 4, 5])
print("원본: ", terminator: ""); printList(list)
print("역순: ", terminator: ""); printList(reverseList(list))

print("\n=== 스택 ===")
var stack = Stack<Int>()
[1,2,3,4,5].forEach { stack.push($0) }
while !stack.isEmpty { print(stack.pop()!, terminator: " ") }
print()

print("\n=== 큐 ===")
var queue = Queue<Int>()
[1,2,3,4,5].forEach { queue.push($0) }
while !queue.isEmpty { print(queue.pop()!, terminator: " ") }
print()
