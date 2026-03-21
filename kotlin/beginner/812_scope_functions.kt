// [812] 스코프 함수 - Scope Functions
// 레벨: 1 | let, run, with, apply, also로 코드를 간결하게 씁니다

data class Person(var name: String, var age: Int, var email: String = "")

fun main() {
    // let: null 체크 + 변환 (it 사용)
    val name: String? = "Kotlin"
    val length = name?.let {
        println("let: $it")
        it.length
    }
    println("길이: $length")

    // run: 객체 초기화 + 결과 반환 (this 사용)
    val person = Person("철수", 20)
    val greeting = person.run {
        age += 1
        "안녕하세요, $name! 나이: $age"
    }
    println(greeting)

    // with: 객체를 여러 번 사용할 때 (this 사용, 수신 객체 반환 X)
    val sb = StringBuilder()
    val result = with(sb) {
        append("Hello ")
        append("Kotlin ")
        append("World")
        toString()
    }
    println(result)

    // apply: 객체 설정 후 자기 자신 반환 (this 사용)
    val config = Person("기본", 0).apply {
        name = "영희"
        age = 25
        email = "yh@example.com"
    }
    println("apply: $config")

    // also: 부수 작업 (로깅 등), it 사용, 자기 자신 반환
    val numbers = mutableListOf(1, 2, 3)
        .also { println("추가 전: $it") }
        .also { it.add(4) }
        .also { println("추가 후: $it") }
    println("최종: $numbers")

    // 체이닝 활용
    val processed = "  hello kotlin  "
        .trim()
        .also { println("trim 후: '$it'") }
        .uppercase()
        .also { println("upper 후: '$it'") }
    println("결과: $processed")
}
