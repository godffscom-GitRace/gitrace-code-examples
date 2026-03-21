// [609] 열거형 - Enumerations
// 레벨: 1 | Swift의 강력한 열거형과 연관값을 배웁니다

// 기본 열거형
enum Direction {
    case north, south, east, west
}

let dir = Direction.north
switch dir {
case .north: print("북쪽")
case .south: print("남쪽")
case .east:  print("동쪽")
case .west:  print("서쪽")
}

// 원시값 (Raw Value)
enum Planet: Int {
    case mercury = 1, venus, earth, mars
}

print(Planet.earth.rawValue)            // 3
print(Planet(rawValue: 1) ?? "없음")    // mercury

enum HTTPStatus: String {
    case ok = "200 OK"
    case notFound = "404 Not Found"
    case serverError = "500 Internal Server Error"
}
print(HTTPStatus.notFound.rawValue)

// 연관값 (Associated Values)
enum Barcode {
    case upc(Int, Int, Int, Int)
    case qr(String)
}

let code1 = Barcode.upc(8, 85909, 51226, 3)
let code2 = Barcode.qr("ABCDEFGH")

switch code1 {
case .upc(let a, let b, let c, let d):
    print("UPC: \(a)-\(b)-\(c)-\(d)")
case .qr(let code):
    print("QR: \(code)")
}

// 메서드가 있는 열거형
enum Suit: String, CaseIterable {
    case spades = "♠", hearts = "♥", diamonds = "♦", clubs = "♣"

    var isRed: Bool { self == .hearts || self == .diamonds }
    func describe() -> String { "\(rawValue) (\(isRed ? "빨강" : "검정"))" }
}

for suit in Suit.allCases {
    print(suit.describe())
}

// 재귀 열거형
indirect enum Expression {
    case number(Int)
    case add(Expression, Expression)
    case multiply(Expression, Expression)
}

func evaluate(_ expr: Expression) -> Int {
    switch expr {
    case .number(let n):       return n
    case .add(let a, let b):   return evaluate(a) + evaluate(b)
    case .multiply(let a, let b): return evaluate(a) * evaluate(b)
    }
}

let expr = Expression.add(.number(3), .multiply(.number(4), .number(5)))
print("결과: \(evaluate(expr))")  // 23
