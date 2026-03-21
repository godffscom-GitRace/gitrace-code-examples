// [617] 메모리 관리 - Memory Management (ARC)
// 레벨: 2 | ARC, 강한/약한 참조, 순환 참조 방지를 배웁니다

import Foundation

// ===== ARC 기본 =====
class Person {
    let name: String
    var apartment: Apartment?

    init(name: String) {
        self.name = name
        print("\(name) 초기화")
    }
    deinit { print("\(name) 해제") }
}

// 순환 참조 문제
class Apartment {
    let unit: String
    weak var tenant: Person?   // weak: 순환 참조 방지

    init(unit: String) {
        self.unit = unit
        print("Apartment \(unit) 초기화")
    }
    deinit { print("Apartment \(unit) 해제") }
}

// unowned: nil이 될 수 없는 약한 참조
class Customer {
    let name: String
    var card: CreditCard?

    init(name: String) { self.name = name }
    deinit { print("\(name) 해제") }
}

class CreditCard {
    let number: Int
    unowned let owner: Customer   // 항상 Customer가 먼저 존재

    init(number: Int, owner: Customer) {
        self.number = number
        self.owner = owner
    }
    deinit { print("카드 \(number) 해제") }
}

// 클로저의 순환 참조
class Timer {
    var name: String
    var handler: (() -> Void)?

    init(name: String) { self.name = name }

    // [weak self]로 순환 참조 방지
    func start() {
        handler = { [weak self] in
            guard let self = self else { return }
            print("\(self.name) 타이머 실행")
        }
    }
    deinit { print("\(name) 타이머 해제") }
}

func demonstrateARC() {
    print("=== 약한 참조 (weak) ===")
    var person: Person? = Person(name: "철수")
    var apt: Apartment? = Apartment(unit: "4A")

    person?.apartment = apt
    apt?.tenant = person

    person = nil    // person 해제 (apartment도 해제됨)
    apt = nil

    print("\n=== unowned 참조 ===")
    var customer: Customer? = Customer(name: "영희")
    customer?.card = CreditCard(number: 1234_5678, owner: customer!)
    customer = nil  // customer와 card 모두 해제

    print("\n=== 클로저 캡처 ===")
    var timer: Timer? = Timer(name: "게임")
    timer?.start()
    timer?.handler?()
    timer = nil
}

// 값 타입은 ARC 불필요
struct Config {
    var theme: String
    var fontSize: Int
}

func copyTest() {
    print("\n=== 값 타입 복사 ===")
    var config1 = Config(theme: "dark", fontSize: 14)
    var config2 = config1   // 완전한 복사
    config2.theme = "light"
    print("config1: \(config1.theme)")  // dark (영향 없음)
    print("config2: \(config2.theme)")  // light
}

demonstrateARC()
copyTest()
