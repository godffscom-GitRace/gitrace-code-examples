// [606] 컬렉션 - Collections
// 레벨: 1 | Array, Dictionary, Set의 기본 사용법을 배웁니다

// ===== Array =====
var fruits = ["사과", "바나나", "체리"]
fruits.append("망고")
fruits.insert("딸기", at: 1)
fruits.remove(at: 0)
print("배열: \(fruits)")
print("첫 번째: \(fruits.first ?? "없음")")
print("개수: \(fruits.count)")

// 배열 생성
let zeros = Array(repeating: 0, count: 5)
let range = Array(1...5)
print(zeros)
print(range)

// ===== Dictionary =====
var scores: [String: Int] = ["철수": 90, "영희": 85, "민수": 92]
scores["지영"] = 88
scores["철수"] = 95   // 업데이트
scores.removeValue(forKey: "민수")
print("딕셔너리: \(scores)")

// 안전한 접근
if let score = scores["영희"] {
    print("영희 점수: \(score)")
}
print("없는 키: \(scores["없음", default: 0])")

// 순회
for (name, score) in scores.sorted(by: { $0.key < $1.key }) {
    print("  \(name): \(score)")
}

// ===== Set =====
var numbers: Set<Int> = [1, 2, 3, 2, 1]
numbers.insert(4)
print("Set: \(numbers)")  // 중복 제거

let setA: Set = [1, 2, 3, 4]
let setB: Set = [3, 4, 5, 6]
print("합집합: \(setA.union(setB).sorted())")
print("교집합: \(setA.intersection(setB).sorted())")
print("차집합: \(setA.subtracting(setB).sorted())")

// ===== 고차 함수 =====
let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let evens = nums.filter { $0 % 2 == 0 }
let squared = nums.map { $0 * $0 }
let total = nums.reduce(0, +)

print("짝수: \(evens)")
print("제곱: \(squared)")
print("합계: \(total)")

// compactMap (nil 제거)
let strings = ["1", "abc", "3", "def", "5"]
let parsed = strings.compactMap { Int($0) }
print("파싱: \(parsed)")
