// [802] 변수와 자료형 - Variables & Types
// 레벨: 1 | val/var 선언과 Kotlin의 기본 자료형을 배웁니다

fun main() {
    // val: 불변 (Java final), var: 가변
    val language = "Kotlin"
    var version = 1.9
    version = 2.0
    println("언어: $language, 버전: $version")

    // 명시적 타입 선언
    val age: Int = 25
    val height: Double = 175.5
    val isActive: Boolean = true
    val grade: Char = 'A'
    val message: String = "Hello"
    println("나이: $age, 키: $height, 활성: $isActive")
    println("등급: $grade, 메시지: $message")

    // 숫자 자료형
    val long: Long = 9_223_372_036_854_775_807L
    val float: Float = 3.14f
    println("Long: $long, Float: $float")

    // 타입 추론
    val inferred = 42
    println("추론된 타입: ${inferred::class.simpleName}")

    // 문자열 연산
    val firstName = "길동"
    val lastName = "홍"
    val fullName = lastName + firstName
    println("이름: $fullName, 길이: ${fullName.length}")

    // const: 컴파일 타임 상수
    println("MAX: $MAX_SIZE")
}

const val MAX_SIZE = 100
