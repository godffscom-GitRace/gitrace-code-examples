// [601] Hello World - 첫 번째 Swift 프로그램
// 레벨: 1 | Swift의 기본 구조와 print 함수를 배웁니다

// 기본 출력
print("Hello, World!")
print("안녕하세요, Swift!")

// print 옵션
print("Hello", "Swift", separator: " - ")
print("줄바꿈 없음", terminator: "")
print(" 이어서 출력")

// 문자열 보간법 (String Interpolation)
let name = "GitRace"
let version = 2
print("Welcome to \(name) v\(version)!")

// 표현식 삽입
let a = 10
let b = 20
print("\(a) + \(b) = \(a + b)")

// 여러 줄 문자열
let multiLine = """
    Swift 특징:
    - 안전한 타입 시스템
    - 옵셔널로 nil 안전성
    - 빠른 성능
    """
print(multiLine)

// 타입 확인
let number = 42
let pi = 3.14
let message = "Hello"
print(type(of: number))   // Int
print(type(of: pi))       // Double
print(type(of: message))  // String
