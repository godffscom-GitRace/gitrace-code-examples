// [619] 디자인 패턴 - Design Patterns
// 레벨: 3 | Swift로 구현하는 실용적인 디자인 패턴들

// ===== 옵저버 패턴 =====
protocol Observer: AnyObject {
    func update(event: String, data: Any?)
}

class EventBus {
    static let shared = EventBus()
    private var observers: [String: [WeakObserver]] = [:]

    private struct WeakObserver {
        weak var value: Observer?
    }

    func subscribe(_ observer: Observer, to event: String) {
        observers[event, default: []].append(WeakObserver(value: observer))
    }

    func publish(event: String, data: Any? = nil) {
        observers[event]?.forEach { $0.value?.update(event: event, data: data) }
    }
}

class Logger: Observer {
    func update(event: String, data: Any?) {
        print("[LOG] 이벤트: \(event), 데이터: \(data ?? "없음")")
    }
}

// ===== 커맨드 패턴 =====
protocol Command {
    func execute()
    func undo()
}

class TextBuffer {
    private var text = ""
    private var history: [Command] = []

    func execute(_ command: Command) {
        command.execute()
        history.append(command)
    }

    func undo() { history.popLast()?.undo() }

    struct Insert: Command {
        let buffer: TextBuffer
        let text: String

        func execute() { buffer.text += text }
        func undo() {
            buffer.text = String(buffer.text.dropLast(text.count))
        }
    }

    var content: String { text }
}

// ===== 전략 패턴 =====
protocol CompressionStrategy {
    func compress(_ data: String) -> String
}

struct ZipCompression: CompressionStrategy {
    func compress(_ data: String) -> String { "[ZIP]\(data.count)bytes" }
}

struct RLECompression: CompressionStrategy {
    func compress(_ data: String) -> String {
        var result = ""
        var count = 1
        let chars = Array(data)
        for i in 1..<chars.count {
            if chars[i] == chars[i-1] { count += 1 }
            else {
                result += count > 1 ? "\(count)\(chars[i-1])" : "\(chars[i-1])"
                count = 1
            }
        }
        if let last = chars.last {
            result += count > 1 ? "\(count)\(last)" : "\(last)"
        }
        return "[RLE]\(result)"
    }
}

class Compressor {
    var strategy: CompressionStrategy
    init(strategy: CompressionStrategy) { self.strategy = strategy }
    func compress(_ data: String) -> String { strategy.compress(data) }
}

// ===== 빌더 패턴 =====
struct AlertConfig {
    let title: String
    let message: String
    let confirmLabel: String
    let cancelLabel: String?
    let isDestructive: Bool
}

class AlertBuilder {
    private var title = ""
    private var message = ""
    private var confirmLabel = "확인"
    private var cancelLabel: String?
    private var isDestructive = false

    func title(_ t: String)          -> AlertBuilder { title = t; return self }
    func message(_ m: String)        -> AlertBuilder { message = m; return self }
    func confirm(_ label: String)    -> AlertBuilder { confirmLabel = label; return self }
    func cancel(_ label: String)     -> AlertBuilder { cancelLabel = label; return self }
    func destructive()               -> AlertBuilder { isDestructive = true; return self }
    func build() -> AlertConfig {
        AlertConfig(title: title, message: message, confirmLabel: confirmLabel,
                    cancelLabel: cancelLabel, isDestructive: isDestructive)
    }
}

// 실행
let logger = Logger()
EventBus.shared.subscribe(logger, to: "user.login")
EventBus.shared.publish(event: "user.login", data: "철수")

let buffer = TextBuffer()
buffer.execute(TextBuffer.Insert(buffer: buffer, text: "Hello"))
buffer.execute(TextBuffer.Insert(buffer: buffer, text: ", Swift"))
print("텍스트: \(buffer.content)")
buffer.undo()
print("undo: \(buffer.content)")

let compressor = Compressor(strategy: RLECompression())
print(compressor.compress("aaabbbccddddee"))
compressor.strategy = ZipCompression()
print(compressor.compress("aaabbbccddddee"))

let alert = AlertBuilder()
    .title("삭제 확인")
    .message("정말 삭제하시겠습니까?")
    .confirm("삭제")
    .cancel("취소")
    .destructive()
    .build()
print("알림: \(alert.title) - \(alert.message) [파괴적: \(alert.isDestructive)]")
