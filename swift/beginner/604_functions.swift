// [604] 함수 - Functions
// 레벨: 1 | Swift 함수의 레이블, 기본값, 다중 반환값을 배웁니다

// 기본 함수
func add(_ a: Int, _ b: Int) -> Int {
    return a + b
}

// 인수 레이블 (외부 이름: 내부 이름)
func greet(to name: String, with greeting: String = "안녕하세요") {
    print("\(greeting), \(name)!")
}

// 다중 반환값 (튜플)
func minMax(array: [Int]) -> (min: Int, max: Int) {
    return (array.min()!, array.max()!)
}

// 가변 인수
func sum(_ numbers: Int...) -> Int {
    return numbers.reduce(0, +)
}

// inout: 값 직접 수정
func swap(_ a: inout Int, _ b: inout Int) {
    let temp = a
    a = b
    b = temp
}

// 함수를 반환하는 함수
func makeMultiplier(factor: Int) -> (Int) -> Int {
    return { number in number * factor }
}

// 함수를 인수로 받는 함수
func apply(_ value: Int, transform: (Int) -> Int) -> Int {
    return transform(value)
}

// 중첩 함수
func outerFunction() {
    var count = 0
    func increment() { count += 1 }
    increment()
    increment()
    print("내부 count: \(count)")
}

func main() {
    print(add(3, 5))

    greet(to: "철수")
    greet(to: "영희", with: "Hello")

    let result = minMax(array: [3, 1, 4, 1, 5, 9, 2, 6])
    print("최소: \(result.min), 최대: \(result.max)")

    print("합계: \(sum(1, 2, 3, 4, 5))")

    var x = 10, y = 20
    swap(&x, &y)
    print("교환: x=\(x), y=\(y)")

    let triple = makeMultiplier(factor: 3)
    print("3배: \(triple(7))")

    print("변환: \(apply(5) { $0 * $0 })")

    outerFunction()
}

main()
