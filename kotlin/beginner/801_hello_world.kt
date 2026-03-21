// [801] Hello World - 첫 번째 Kotlin 프로그램
// 레벨: 1 | Kotlin의 기본 구조와 출력 함수를 배웁니다

fun main() {
    // 기본 출력
    println("Hello, World!")
    println("안녕하세요, Kotlin!")

    // print vs println
    print("Hello ")
    print("Kotlin")
    println()

    // 문자열 템플릿
    val name = "GitRace"
    println("Welcome to $name!")

    // 표현식 삽입
    val a = 10
    val b = 20
    println("$a + $b = ${a + b}")

    // 여러 줄 출력
    println("""
        Kotlin 특징:
        - 간결한 문법
        - Null 안전성
        - JVM 호환
    """.trimIndent())
}
