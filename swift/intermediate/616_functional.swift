// [616] 함수형 프로그래밍 - Functional Programming
// 레벨: 2 | map, filter, reduce와 함수 합성으로 선언적 코드를 작성합니다

// ===== 고차 함수 =====
let numbers = Array(1...10)

// map: 변환
let squared = numbers.map { $0 * $0 }
let strings = numbers.map { "item\($0)" }
print("제곱: \(squared)")

// filter: 필터링
let evens = numbers.filter { $0.isMultiple(of: 2) }
let bigSquares = squared.filter { $0 > 25 }
print("짝수: \(evens)")
print("25 초과: \(bigSquares)")

// reduce: 집계
let sum = numbers.reduce(0, +)
let product = numbers.reduce(1, *)
let maxVal = numbers.reduce(Int.min) { max($0, $1) }
print("합: \(sum), 곱: \(product), 최대: \(maxVal)")

// flatMap / compactMap
let nested = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
let flat = nested.flatMap { $0 }
print("flatMap: \(flat)")

let mixed = ["1", "a", "2", "b", "3"]
let parsed = mixed.compactMap { Int($0) }
print("compactMap: \(parsed)")

// ===== 함수 합성 =====
func compose<A, B, C>(_ f: @escaping (B) -> C, _ g: @escaping (A) -> B) -> (A) -> C {
    return { f(g($0)) }
}

let addOne  = { (x: Int) -> Int in x + 1 }
let double  = { (x: Int) -> Int in x * 2 }
let square  = { (x: Int) -> Int in x * x }

let doubleThenAddOne = compose(addOne, double)
let addOneThenSquare = compose(square, addOne)
print(doubleThenAddOne(5))  // 11
print(addOneThenSquare(4))  // 25

// ===== 커링 (Currying) =====
func curry<A, B, C>(_ f: @escaping (A, B) -> C) -> (A) -> (B) -> C {
    return { a in { b in f(a, b) } }
}

let curriedAdd = curry(+)
let add5 = curriedAdd(5)
print([1, 2, 3, 4].map(add5))  // [6, 7, 8, 9]

// ===== 파이프라인 =====
struct Pipeline<T> {
    let value: T
    func pipe<U>(_ transform: (T) -> U) -> Pipeline<U> {
        Pipeline<U>(value: transform(value))
    }
}

let result = Pipeline(value: "  Hello, Swift World!  ")
    .pipe { $0.trimmingCharacters(in: .whitespaces) }
    .pipe { $0.lowercased() }
    .pipe { $0.components(separatedBy: " ") }
    .pipe { $0.filter { $0.count > 3 } }
    .value

print("파이프라인: \(result)")

// 메서드 체이닝으로 데이터 처리
struct Student { let name: String; let grade: Int; let score: Double }

let students = [
    Student(name: "철수", grade: 3, score: 88),
    Student(name: "영희", grade: 2, score: 95),
    Student(name: "민수", grade: 3, score: 72),
    Student(name: "지영", grade: 1, score: 90),
]

let topStudents = students
    .filter { $0.score >= 85 }
    .sorted { $0.score > $1.score }
    .map { "\($0.name): \($0.score)" }

print("우수 학생: \(topStudents)")
