// [610] 프로토콜 - Protocols
// 레벨: 1 | Swift의 프로토콜로 인터페이스와 다형성을 구현합니다

// 기본 프로토콜
protocol Describable {
    var description: String { get }
    func describe()
}

// 기본 구현 (Protocol Extension)
extension Describable {
    func describe() {
        print(description)
    }
}

// 프로토콜 채택
struct Car: Describable {
    let brand: String
    let model: String
    var description: String { "\(brand) \(model)" }
}

// 여러 프로토콜 채택
protocol Flyable {
    var altitude: Double { get }
    func fly()
}

protocol Swimmable {
    func swim()
}

struct Duck: Describable, Flyable, Swimmable {
    let name: String
    var altitude: Double = 10.0
    var description: String { "오리: \(name)" }
    func fly()  { print("\(name)가 \(altitude)m 높이로 날아요") }
    func swim() { print("\(name)가 수영해요") }
}

// 프로토콜 타입으로 사용 (다형성)
let describables: [any Describable] = [
    Car(brand: "현대", model: "소나타"),
    Duck(name: "도날드")
]
describables.forEach { $0.describe() }

// Comparable 프로토콜
struct Student: Comparable, Describable {
    let name: String
    let score: Int
    var description: String { "\(name): \(score)점" }

    static func < (lhs: Student, rhs: Student) -> Bool {
        lhs.score < rhs.score
    }
}

var students = [
    Student(name: "철수", score: 88),
    Student(name: "영희", score: 95),
    Student(name: "민수", score: 72)
]

students.sort()
students.forEach { $0.describe() }
print("최고: \(students.max()!.name)")

// Codable 프로토콜 (JSON 인코딩/디코딩)
import Foundation

struct User: Codable {
    let id: Int
    let name: String
    let email: String
}

let user = User(id: 1, name: "철수", email: "cs@example.com")
if let data = try? JSONEncoder().encode(user),
   let json = String(data: data, encoding: .utf8) {
    print("JSON: \(json)")
}
