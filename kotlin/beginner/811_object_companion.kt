// [811] object와 companion object - Object & Companion
// 레벨: 1 | 싱글톤, 정적 멤버, 익명 객체를 배웁니다

// object: 싱글톤
object AppConfig {
    val appName = "GitRace"
    var version = "1.0.0"
    val maxUsers = 1000

    fun info() = "$appName v$version (max: $maxUsers)"
}

// companion object: Java의 static 대체
class MathUtils {
    companion object {
        const val PI = 3.14159265
        fun circleArea(r: Double) = PI * r * r
        fun abs(n: Int) = if (n < 0) -n else n
    }
}

// companion object에 이름 부여
class User private constructor(val name: String, val role: String) {
    companion object Factory {
        fun createAdmin(name: String) = User(name, "ADMIN")
        fun createGuest(name: String) = User(name, "GUEST")
    }

    override fun toString() = "User($name, $role)"
}

// 인터페이스 구현도 가능
interface Greeter {
    fun greet(name: String): String
}

fun main() {
    // object 싱글톤
    println(AppConfig.info())
    AppConfig.version = "2.0.0"
    println(AppConfig.info())

    // companion object
    println("원 넓이: ${MathUtils.circleArea(5.0)}")
    println("절댓값: ${MathUtils.abs(-42)}")

    // Factory 패턴
    val admin = User.createAdmin("철수")
    val guest = User.createGuest("영희")
    println(admin)
    println(guest)

    // 익명 object
    val greeter = object : Greeter {
        override fun greet(name: String) = "안녕하세요, $name!"
    }
    println(greeter.greet("민수"))

    // object 표현식 (임시 구현)
    val comparator = object : Comparator<String> {
        override fun compare(a: String, b: String) = a.length - b.length
    }
    val words = listOf("banana", "apple", "kiwi", "cherry")
    println(words.sortedWith(comparator))
}
