// [607] 클로저 - Closures
// 레벨: 1 | Swift의 클로저 문법과 축약 표현을 배웁니다

// 기본 클로저
let greet = { (name: String) -> String in
    return "안녕하세요, \(name)!"
}
print(greet("철수"))

// 타입 추론 + 암시적 반환
let square: (Int) -> Int = { $0 * $0 }
print(square(5))

// 후행 클로저 (Trailing Closure)
func performAction(value: Int, action: (Int) -> Int) -> Int {
    return action(value)
}

let result1 = performAction(value: 10) { $0 * 2 }
let result2 = performAction(value: 10) { num in
    num * num
}
print(result1, result2)

// sorted with 클로저
let names = ["Charlie", "Alice", "Bob", "David"]
let sorted = names.sorted { $0 < $1 }
let sortedByLength = names.sorted { $0.count < $1.count }
print("알파벳순: \(sorted)")
print("길이순: \(sortedByLength)")

// 캡처 목록 (값 캡처)
func makeCounter(start: Int) -> () -> Int {
    var count = start
    return {
        count += 1
        return count
    }
}
let counter = makeCounter(start: 0)
print(counter(), counter(), counter())  // 1 2 3

// @escaping 클로저 (함수 범위를 벗어남)
var callbacks: [() -> Void] = []
func addCallback(_ callback: @escaping () -> Void) {
    callbacks.append(callback)
}
addCallback { print("콜백 1 실행") }
addCallback { print("콜백 2 실행") }
callbacks.forEach { $0() }

// autoclosure
func assert(_ condition: @autoclosure () -> Bool, message: String) {
    if !condition() { print("실패: \(message)") }
}
assert(1 + 1 == 2, message: "수학 오류")
assert(1 + 1 == 3, message: "이건 실패")

// 클로저 합성
let double = { (x: Int) -> Int in x * 2 }
let addOne = { (x: Int) -> Int in x + 1 }
let numbers = [1, 2, 3, 4, 5]
print(numbers.map(double).map(addOne))
