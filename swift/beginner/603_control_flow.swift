// [603] 제어 흐름 - Control Flow
// 레벨: 1 | if, switch, for-in, while로 흐름을 제어합니다

// if-else
let score = 85
if score >= 90 {
    print("A")
} else if score >= 80 {
    print("B")
} else if score >= 70 {
    print("C")
} else {
    print("F")
}

// switch (강력한 패턴 매칭)
let day = 3
switch day {
case 1: print("월요일")
case 2: print("화요일")
case 3: print("수요일")
case 4: print("목요일")
case 5: print("금요일")
case 6, 7: print("주말")
default: print("알 수 없음")
}

// switch 범위 패턴
let temp = 25
switch temp {
case ..<0:    print("영하")
case 0..<10:  print("추움")
case 10..<25: print("적당")
case 25..<35: print("더움")
default:      print("폭염")
}

// for-in
for i in 1...5 {
    print(i, terminator: " ")
}
print()

for i in stride(from: 0, to: 10, by: 2) {
    print(i, terminator: " ")
}
print()

// 컬렉션 순회
let fruits = ["사과", "바나나", "체리"]
for (index, fruit) in fruits.enumerated() {
    print("\(index): \(fruit)")
}

// while
var count = 0
while count < 3 {
    print("count=\(count)", terminator: " ")
    count += 1
}
print()

// repeat-while (do-while)
var n = 1
repeat {
    print(n, terminator: " ")
    n *= 2
} while n < 32
print()

// guard (조기 탈출)
func checkAge(_ age: Int) {
    guard age >= 18 else {
        print("미성년자입니다")
        return
    }
    print("성인입니다: \(age)세")
}
checkAge(15)
checkAge(25)
