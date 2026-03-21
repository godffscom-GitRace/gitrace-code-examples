// [614] 제네릭 고급 - Generics Advanced
// 레벨: 2 | 연관 타입, opaque 타입, some/any 키워드를 배웁니다

// ===== 연관 타입 (Associated Type) =====
protocol Container {
    associatedtype Item
    var count: Int { get }
    mutating func append(_ item: Item)
    subscript(i: Int) -> Item { get }
}

struct IntStack: Container {
    private var items: [Int] = []
    var count: Int { items.count }
    mutating func append(_ item: Int) { items.append(item) }
    subscript(i: Int) -> Int { items[i] }
}

// 제네릭 타입으로 Container 채택
struct GenericStack<T>: Container {
    private var items: [T] = []
    var count: Int { items.count }
    mutating func append(_ item: T) { items.append(item) }
    subscript(i: Int) -> T { items[i] }
    mutating func pop() -> T? { items.popLast() }
}

// ===== Where 절 =====
func allMatch<C: Container>(_ container: C, predicate: (C.Item) -> Bool) -> Bool
    where C.Item: Equatable {
    for i in 0..<container.count {
        if !predicate(container[i]) { return false }
    }
    return true
}

// ===== Opaque Type (some) =====
protocol Shape {
    func area() -> Double
    func perimeter() -> Double
}

struct Circle: Shape {
    let radius: Double
    func area() -> Double { .pi * radius * radius }
    func perimeter() -> Double { 2 * .pi * radius }
}

struct Rectangle: Shape {
    let width, height: Double
    func area() -> Double { width * height }
    func perimeter() -> Double { 2 * (width + height) }
}

// some: 구체 타입은 숨기되 타입 동일성 보장
func makeShape(isCircle: Bool) -> some Shape {
    if isCircle { return Circle(radius: 5) }
    return Circle(radius: 3)  // 반환 타입이 같아야 함
}

// any: 타입 지우기 (existential)
func printArea(_ shape: any Shape) {
    print("넓이: \(String(format: "%.2f", shape.area()))")
}

// ===== 타입 제약 조합 =====
func merge<T: Hashable & Comparable>(_ a: [T], _ b: [T]) -> [T] {
    return Array(Set(a + b)).sorted()
}

func main() {
    var stack = GenericStack<String>()
    stack.append("A")
    stack.append("B")
    stack.append("C")
    print("count: \(stack.count), top: \(stack[stack.count-1])")

    let shapes: [any Shape] = [Circle(radius: 5), Rectangle(width: 4, height: 3)]
    shapes.forEach { printArea($0) }

    print("병합: \(merge([3,1,4], [1,5,9,2,6]))")
    print("병합: \(merge(["banana","apple"], ["cherry","apple"]))")
}

main()
