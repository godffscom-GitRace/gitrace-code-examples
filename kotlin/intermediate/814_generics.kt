// [814] 제네릭 - Generics
// 레벨: 2 | 타입 파라미터로 재사용 가능한 코드를 작성합니다

// 제네릭 클래스
class Box<T>(var value: T) {
    fun get(): T = value
    fun set(newValue: T) { value = newValue }
    override fun toString() = "Box($value)"
}

// 제네릭 함수
fun <T> swap(pair: Pair<T, T>): Pair<T, T> = Pair(pair.second, pair.first)

fun <T : Comparable<T>> max(a: T, b: T): T = if (a > b) a else b

// 상한 제약 (T는 Number 하위 타입이어야 함)
fun <T : Number> sum(list: List<T>): Double =
    list.sumOf { it.toDouble() }

// 공변 (out): 생산자
class Producer<out T>(private val value: T) {
    fun produce(): T = value
}

// 반공변 (in): 소비자
class Consumer<in T> {
    fun consume(value: T) = println("소비: $value")
}

// 제네릭 스택
class Stack<T> {
    private val items = mutableListOf<T>()

    fun push(item: T) = items.add(item)
    fun pop(): T? = if (items.isEmpty()) null else items.removeAt(items.size - 1)
    fun peek(): T? = items.lastOrNull()
    fun isEmpty() = items.isEmpty()
    val size get() = items.size
    override fun toString() = items.toString()
}

// reified 타입 파라미터 (inline 함수에서 타입 접근 가능)
inline fun <reified T> List<*>.filterByType(): List<T> =
    filterIsInstance<T>()

fun main() {
    val intBox = Box(42)
    val strBox = Box("Hello")
    println(intBox)
    println(strBox)

    println(swap(Pair("A", "B")))
    println(max(10, 20))
    println(max("apple", "banana"))

    println("합계: ${sum(listOf(1, 2, 3, 4, 5))}")
    println("합계: ${sum(listOf(1.5, 2.5, 3.0))}")

    // 공변
    val producer: Producer<String> = Producer("Kotlin")
    val anyProducer: Producer<Any> = producer  // 공변이므로 가능
    println(anyProducer.produce())

    // 스택
    val stack = Stack<Int>()
    listOf(1, 2, 3, 4, 5).forEach { stack.push(it) }
    println("스택: $stack, 크기: ${stack.size}")
    println("pop: ${stack.pop()}, peek: ${stack.peek()}")

    // reified
    val mixed: List<Any> = listOf(1, "hello", 2.0, "world", 3)
    println("문자열만: ${mixed.filterByType<String>()}")
    println("정수만: ${mixed.filterByType<Int>()}")
}
