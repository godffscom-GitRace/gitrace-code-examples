// [602] 변수와 상수 - Variables & Constants
// 레벨: 1 | let/var 선언과 Swift의 기본 자료형을 배웁니다

// let: 상수, var: 변수
let language = "Swift"
var version = 5.9
version = 6.0
print("\(language) \(version)")

// 명시적 타입 선언
let age: Int = 25
let height: Double = 175.5
let isActive: Bool = true
let grade: Character = "A"
let greeting: String = "Hello"
print("나이: \(age), 키: \(height), 활성: \(isActive)")

// 숫자 리터럴 (가독성을 위한 _)
let million = 1_000_000
let hex = 0xFF
let binary = 0b1010
let octal = 0o17
print("백만: \(million), 16진수: \(hex)")

// 타입 변환 (암시적 변환 없음 - 명시적으로)
let intVal = 10
let doubleVal = Double(intVal) + 3.14
print("변환: \(doubleVal)")

// 타입 추론
let inferred = 42        // Int
let inferredD = 3.14     // Double
print(type(of: inferred), type(of: inferredD))

// 문자열 기본 조작
let firstName = "철수"
let lastName = "김"
let fullName = lastName + firstName
print("이름: \(fullName), 길이: \(fullName.count)")

// 튜플
let coordinates = (x: 3.0, y: 4.0)
print("x: \(coordinates.x), y: \(coordinates.y)")

let (x, y) = coordinates
print("구조 분해: x=\(x), y=\(y)")
