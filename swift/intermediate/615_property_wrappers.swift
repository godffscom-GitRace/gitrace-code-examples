// [615] 프로퍼티 래퍼 - Property Wrappers
// 레벨: 2 | @propertyWrapper로 프로퍼티 접근 로직을 재사용합니다

import Foundation

// 기본 프로퍼티 래퍼
@propertyWrapper
struct Clamped<T: Comparable> {
    private var value: T
    let range: ClosedRange<T>

    init(wrappedValue: T, _ range: ClosedRange<T>) {
        self.range = range
        self.value = min(max(wrappedValue, range.lowerBound), range.upperBound)
    }

    var wrappedValue: T {
        get { value }
        set { value = min(max(newValue, range.lowerBound), range.upperBound) }
    }
}

// 로깅 래퍼
@propertyWrapper
struct Logged<T> {
    private var value: T
    private let name: String

    init(wrappedValue: T, name: String) {
        self.name = name
        self.value = wrappedValue
    }

    var wrappedValue: T {
        get { value }
        set {
            print("[LOG] \(name): \(value) → \(newValue)")
            value = newValue
        }
    }
}

// UserDefaults 래퍼
@propertyWrapper
struct UserDefault<T> {
    let key: String
    let defaultValue: T

    var wrappedValue: T {
        get { UserDefaults.standard.object(forKey: key) as? T ?? defaultValue }
        set { UserDefaults.standard.set(newValue, forKey: key) }
    }
}

// projectedValue ($) 활용
@propertyWrapper
struct Validated {
    private var value: String = ""
    private(set) var isValid: Bool = false

    init(wrappedValue: String) {
        self.wrappedValue = wrappedValue
    }

    var wrappedValue: String {
        get { value }
        set {
            value = newValue
            isValid = newValue.count >= 3 && !newValue.isEmpty
        }
    }

    var projectedValue: Bool { isValid }
}

// 사용 예시
struct GameSettings {
    @Clamped(0...100) var volume: Int = 50
    @Clamped(0.5...2.0) var speed: Double = 1.0
    @Logged(name: "레벨") var level: Int = 1
    @UserDefault(key: "playerName", defaultValue: "플레이어") var playerName: String
}

struct LoginForm {
    @Validated var username: String = ""
    @Validated var password: String = ""
}

func main() {
    var settings = GameSettings()
    print("볼륨: \(settings.volume)")
    settings.volume = 150   // 100으로 클램프
    settings.volume = -10   // 0으로 클램프
    print("볼륨: \(settings.volume)")

    settings.level = 5      // 로그 출력
    settings.level = 10

    var form = LoginForm()
    form.username = "ab"
    print("유효: \(form.$username)")  // false
    form.username = "admin"
    print("유효: \(form.$username)")  // true
}

main()
