// [804] 함수 - Functions
// 레벨: 1 | 기본 함수, 기본값 매개변수, 확장 함수를 배웁니다

// 기본 함수
fun add(a: Int, b: Int): Int {
    return a + b
}

// 단일 표현식 함수
fun multiply(a: Int, b: Int) = a * b

// 기본값 매개변수
fun greet(name: String, greeting: String = "안녕하세요") {
    println("$greeting, $name!")
}

// 이름 있는 인수
fun createProfile(name: String, age: Int, city: String = "서울") {
    println("이름: $name, 나이: $age, 도시: $city")
}

// 가변 인수
fun sum(vararg numbers: Int): Int {
    return numbers.sum()
}

// 반환값 없는 함수 (Unit)
fun printLine(text: String): Unit {
    println("--- $text ---")
}

// 지역 함수
fun calculate(x: Int, y: Int): Int {
    fun validate(n: Int) = require(n >= 0) { "음수 불가: $n" }
    validate(x)
    validate(y)
    return x + y
}

fun main() {
    println(add(3, 5))
    println(multiply(4, 6))

    greet("철수")
    greet("영희", "Hello")

    // 이름 있는 인수로 순서 무관
    createProfile(age = 25, name = "민수", city = "부산")

    println("합계: ${sum(1, 2, 3, 4, 5)}")

    printLine("구분선")

    println(calculate(10, 20))
}
