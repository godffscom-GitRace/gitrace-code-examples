// [809] 람다와 고차 함수 - Lambdas & Higher-Order Functions
// 레벨: 1 | 람다 표현식과 함수형 프로그래밍을 배웁니다

fun main() {
    // 람다 기본 문법
    val square = { x: Int -> x * x }
    println(square(5))

    // 타입 명시
    val add: (Int, Int) -> Int = { a, b -> a + b }
    println(add(3, 4))

    // 파라미터가 하나일 때 it 사용
    val double: (Int) -> Int = { it * 2 }
    println(double(7))

    // 고차 함수 (함수를 인수로 받음)
    fun operate(a: Int, b: Int, op: (Int, Int) -> Int): Int = op(a, b)

    println(operate(10, 3, { a, b -> a + b }))
    println(operate(10, 3) { a, b -> a * b })  // 마지막 람다는 괄호 밖

    // 함수 참조 ::
    fun isEven(n: Int) = n % 2 == 0
    val nums = listOf(1, 2, 3, 4, 5, 6)
    println(nums.filter(::isEven))

    // 컬렉션에서 람다 활용
    val names = listOf("Alice", "Bob", "Charlie", "Dave")
    val result = names
        .filter { it.length > 3 }
        .map { it.uppercase() }
        .sortedBy { it }
    println(result)

    // fold / reduce
    val sum = nums.fold(0) { acc, n -> acc + n }
    println("합계: $sum")

    val product = nums.reduce { acc, n -> acc * n }
    println("곱: $product")

    // 클로저 (외부 변수 캡처)
    var count = 0
    val increment = { count++ }
    repeat(5) { increment() }
    println("count: $count")
}
