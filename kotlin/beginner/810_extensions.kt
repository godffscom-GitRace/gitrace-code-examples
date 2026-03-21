// [810] 확장 함수 - Extension Functions
// 레벨: 1 | 기존 클래스를 수정 없이 기능을 추가하는 확장 함수

// String 확장 함수
fun String.isPalindrome(): Boolean {
    val cleaned = this.lowercase().filter { it.isLetter() }
    return cleaned == cleaned.reversed()
}

fun String.truncate(maxLength: Int, suffix: String = "..."): String {
    return if (this.length <= maxLength) this
    else this.take(maxLength) + suffix
}

fun String.wordCount(): Int = this.trim().split("\\s+".toRegex()).size

// Int 확장 함수
fun Int.isEven() = this % 2 == 0
fun Int.factorial(): Long {
    require(this >= 0) { "음수 불가" }
    return (1..this).fold(1L) { acc, n -> acc * n }
}

// List 확장 함수
fun <T> List<T>.second(): T {
    if (size < 2) throw NoSuchElementException("크기 부족")
    return this[1]
}

// 확장 프로퍼티
val String.hasDigit: Boolean
    get() = this.any { it.isDigit() }

val Int.isPositive: Boolean
    get() = this > 0

fun main() {
    println("racecar".isPalindrome())    // true
    println("hello".isPalindrome())      // false
    println("A man a plan a canal Panama".isPalindrome()) // true

    val longText = "Kotlin은 간결하고 안전한 언어입니다"
    println(longText.truncate(10))

    println("hello world kotlin".wordCount())

    println(4.isEven())   // true
    println(5.factorial()) // 120

    val list = listOf(10, 20, 30)
    println("두 번째: ${list.second()}")

    println("abc123".hasDigit)  // true
    println("abcdef".hasDigit)  // false
    println(42.isPositive)      // true
}
