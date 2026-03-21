// [618] Result Builder - 선언적 DSL
// 레벨: 3 | @resultBuilder로 SwiftUI 스타일의 DSL을 만듭니다

// ===== HTML Result Builder =====
struct HTMLElement {
    let tag: String
    let content: String
    let attributes: [String: String]

    init(_ tag: String, _ content: String, attributes: [String: String] = [:]) {
        self.tag = tag
        self.content = content
        self.attributes = attributes
    }

    func render(indent: Int = 0) -> String {
        let prefix = String(repeating: "  ", count: indent)
        let attrs = attributes.map { " \($0.key)=\"\($0.value)\"" }.joined()
        return "\(prefix)<\(tag)\(attrs)>\(content)</\(tag)>"
    }
}

@resultBuilder
struct HTMLBuilder {
    static func buildBlock(_ elements: HTMLElement...) -> [HTMLElement] {
        elements
    }

    static func buildIf(_ element: [HTMLElement]?) -> [HTMLElement] {
        element ?? []
    }

    static func buildEither(first: [HTMLElement]) -> [HTMLElement] { first }
    static func buildEither(second: [HTMLElement]) -> [HTMLElement] { second }

    static func buildArray(_ components: [[HTMLElement]]) -> [HTMLElement] {
        components.flatMap { $0 }
    }
}

struct HTMLPage {
    private let elements: [HTMLElement]

    init(@HTMLBuilder content: () -> [HTMLElement]) {
        self.elements = content()
    }

    func render() -> String {
        elements.map { $0.render() }.joined(separator: "\n")
    }
}

// ===== 검증 Result Builder =====
struct ValidationResult {
    let isValid: Bool
    let errors: [String]

    static func success() -> ValidationResult { ValidationResult(isValid: true, errors: []) }
    static func failure(_ errors: [String]) -> ValidationResult {
        ValidationResult(isValid: false, errors: errors)
    }
}

@resultBuilder
struct ValidationBuilder {
    static func buildBlock(_ results: ValidationResult...) -> ValidationResult {
        let errors = results.flatMap { $0.errors }
        return errors.isEmpty ? .success() : .failure(errors)
    }
}

func validate(_ value: String, @ValidationBuilder rules: () -> ValidationResult) -> ValidationResult {
    rules()
}

func notEmpty(_ s: String) -> ValidationResult {
    s.isEmpty ? .failure(["비어 있음"]) : .success()
}
func minLength(_ s: String, _ min: Int) -> ValidationResult {
    s.count >= min ? .success() : .failure(["최소 \(min)자 이상"])
}
func noSpaces(_ s: String) -> ValidationResult {
    s.contains(" ") ? .failure(["공백 불가"]) : .success()
}

// ===== 사용 =====
let page = HTMLPage {
    HTMLElement("h1", "Swift Result Builder")
    HTMLElement("p", "선언적 DSL을 만드는 방법", attributes: ["class": "intro"])
    HTMLElement("a", "GitHub", attributes: ["href": "https://github.com"])
}
print(page.render())

print()
let username = "ab cd"
let result = validate(username) {
    notEmpty(username)
    minLength(username, 5)
    noSpaces(username)
}
print("유효: \(result.isValid)")
print("오류: \(result.errors)")
