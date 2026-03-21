// [608] 구조체와 클래스 - Structs & Classes
// 레벨: 1 | 값 타입(struct)과 참조 타입(class)의 차이를 배웁니다

// ===== 구조체 (값 타입) =====
struct Point {
    var x: Double
    var y: Double

    // 멤버와이즈 이니셜라이저 자동 생성
    func distance(to other: Point) -> Double {
        let dx = x - other.x
        let dy = y - other.y
        return (dx*dx + dy*dy).squareRoot()
    }

    // mutating: 구조체 내부 값 변경
    mutating func move(dx: Double, dy: Double) {
        x += dx
        y += dy
    }
}

// ===== 클래스 (참조 타입) =====
class BankAccount {
    var owner: String
    var balance: Double

    init(owner: String, balance: Double = 0) {
        self.owner = owner
        self.balance = balance
    }

    func deposit(_ amount: Double) {
        balance += amount
        print("\(owner): +\(amount) → 잔액: \(balance)")
    }

    func withdraw(_ amount: Double) -> Bool {
        guard balance >= amount else { return false }
        balance -= amount
        print("\(owner): -\(amount) → 잔액: \(balance)")
        return true
    }
}

// 상속
class SavingsAccount: BankAccount {
    var interestRate: Double

    init(owner: String, balance: Double, interestRate: Double) {
        self.interestRate = interestRate
        super.init(owner: owner, balance: balance)
    }

    func addInterest() {
        let interest = balance * interestRate
        deposit(interest)
    }
}

// 값 타입 vs 참조 타입 비교
var p1 = Point(x: 0, y: 0)
var p2 = p1          // 복사 (값 타입)
p2.x = 10
print("p1.x: \(p1.x), p2.x: \(p2.x)")  // 0.0, 10.0 (독립적)

let acc1 = BankAccount(owner: "철수", balance: 1000)
let acc2 = acc1      // 참조 (같은 객체)
acc2.deposit(500)
print("acc1 잔액: \(acc1.balance)")  // 1500 (동일 객체)

let savings = SavingsAccount(owner: "영희", balance: 10000, interestRate: 0.05)
savings.addInterest()
