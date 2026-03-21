// [612] 익스텐션과 제네릭 - Extensions & Generics
// 레벨: 1 | 기존 타입 확장과 제네릭으로 재사용 가능한 코드를 작성합니다

import Foundation

// ===== 익스텐션 =====
extension Int {
    var isEven: Bool { self % 2 == 0 }
    var factorial: Int {
        guard self > 0 else { return 1 }
        return (1...self).reduce(1, *)
    }
    func times(_ action: () -> Void) {
        for _ in 0..<self { action() }
    }
}

extension String {
    var isPalindrome: Bool {
        let s = self.lowercased().filter { $0.isLetter }
        return s == String(s.reversed())
    }
    func truncated(to length: Int, suffix: String = "...") -> String {
        guard self.count > length else { return self }
        return String(self.prefix(length)) + suffix
    }
}

extension Array where Element: Numeric {
    var sum: Element { reduce(0, +) }
    var average: Double {
        guard !isEmpty else { return 0 }
        return Double("\(sum)")! / Double(count)
    }
}

// ===== 제네릭 =====
func swapValues<T>(_ a: inout T, _ b: inout T) {
    let temp = a; a = b; b = temp
}

struct Stack<Element> {
    private var items: [Element] = []

    mutating func push(_ item: Element) { items.append(item) }
    mutating func pop() -> Element? { items.popLast() }
    var top: Element? { items.last }
    var isEmpty: Bool { items.isEmpty }
    var count: Int { items.count }
}

func findIndex<T: Equatable>(of value: T, in array: [T]) -> Int? {
    array.firstIndex(of: value)
}

// 제네릭 제약
func max<T: Comparable>(_ a: T, _ b: T) -> T { a > b ? a : b }

func main() {
    print(5.isEven)        // false
    print(6.isEven)        // true
    print(5.factorial)     // 120

    3.times { print("반복", terminator: " ") }
    print()

    print("racecar".isPalindrome)   // true
    print("hello".isPalindrome)     // false
    print("Swift는 정말 좋은 언어입니다!".truncated(to: 10))

    let nums = [1, 2, 3, 4, 5]
    print("합: \(nums.sum), 평균: \(nums.average)")

    var x = 10; var y = 20
    swapValues(&x, &y)
    print("교환: \(x), \(y)")

    var stack = Stack<String>()
    stack.push("first")
    stack.push("second")
    stack.push("third")
    print("top: \(stack.top ?? "")")
    print("pop: \(stack.pop() ?? "")")

    print(findIndex(of: 3, in: [1, 2, 3, 4, 5]) as Any)
    print(max(10, 20), max("apple", "banana"))
}

main()
