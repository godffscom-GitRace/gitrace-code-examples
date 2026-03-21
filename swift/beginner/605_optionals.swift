// [605] 옵셔널 - Optionals
// 레벨: 1 | Swift의 nil 안전 시스템인 옵셔널을 배웁니다

// 옵셔널 선언
var name: String? = "Swift"
var score: Int? = nil

print(name as Any)   // Optional("Swift")
print(score as Any)  // nil

// 옵셔널 바인딩 (if let)
if let unwrapped = name {
    print("이름: \(unwrapped)")
} else {
    print("이름 없음")
}

// guard let
func printLength(_ str: String?) {
    guard let s = str else {
        print("nil입니다")
        return
    }
    print("길이: \(s.count)")
}
printLength(name)
printLength(nil)

// nil 병합 연산자 ??
let displayName = name ?? "익명"
print("표시: \(displayName)")

// 옵셔널 체이닝 ?.
struct Address {
    var city: String
}
struct Person {
    var name: String
    var address: Address?
}

let person = Person(name: "철수", address: Address(city: "서울"))
let noPerson = Person(name: "영희", address: nil)

print(person.address?.city ?? "주소 없음")
print(noPerson.address?.city ?? "주소 없음")

// 강제 언래핑 ! (nil이 아님을 확신할 때)
let definite: String? = "확실한 값"
print(definite!)

// 여러 옵셔널 동시 바인딩
let optA: Int? = 10
let optB: Int? = 20
if let a = optA, let b = optB, a < b {
    print("\(a) < \(b)")
}

// 옵셔널 맵
let doubled = optA.map { $0 * 2 }
print("doubled: \(doubled as Any)")

// flatMap
let str: String? = "42"
let num = str.flatMap { Int($0) }
print("변환: \(num as Any)")
