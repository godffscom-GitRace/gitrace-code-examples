// [816] 위임 - Delegation
// 레벨: 2 | 클래스 위임과 프로퍼티 위임 패턴을 배웁니다

import kotlin.properties.Delegates
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty

// ===== 클래스 위임 by =====
interface Printer {
    fun print(text: String)
    fun println(text: String)
}

class ConsolePrinter : Printer {
    override fun print(text: String) = kotlin.io.print(text)
    override fun println(text: String) = kotlin.io.println(text)
}

// LoggingPrinter은 Printer를 ConsolePrinter에 위임
class LoggingPrinter(printer: Printer) : Printer by printer {
    override fun println(text: String) {
        kotlin.io.println("[LOG] $text")  // println만 오버라이드
    }
}

// ===== 프로퍼티 위임 =====
// lazy: 처음 접근 시 초기화
class HeavyObject {
    val data: List<Int> by lazy {
        println("무거운 데이터 로드 중...")
        (1..1000).toList()
    }
}

// observable: 변경 감지
class User(name: String) {
    var name: String by Delegates.observable(name) { prop, old, new ->
        println("${prop.name}: $old → $new")
    }
    var age: Int by Delegates.vetoable(0) { _, _, new ->
        new >= 0  // 음수이면 거부
    }
}

// 커스텀 위임자
class ValidatedString(private val maxLength: Int) : ReadWriteProperty<Any?, String> {
    private var value = ""
    override fun getValue(thisRef: Any?, property: KProperty<*>): String = value
    override fun setValue(thisRef: Any?, property: KProperty<*>, value: String) {
        require(value.length <= maxLength) { "최대 ${maxLength}자" }
        this.value = value
    }
}

class Profile {
    var bio: String by ValidatedString(50)
}

fun main() {
    // 클래스 위임
    val logger = LoggingPrinter(ConsolePrinter())
    logger.print("print: ")  // 위임
    logger.println("println")  // 오버라이드

    // lazy
    val obj = HeavyObject()
    println("객체 생성 완료")
    println("첫 접근: ${obj.data.size}개")
    println("두 번째 접근: ${obj.data.size}개")  // 재초기화 없음

    // observable & vetoable
    val user = User("철수")
    user.name = "영희"
    user.age = 25
    user.age = -1  // 거부됨
    println("나이: ${user.age}")  // 여전히 25

    // 커스텀 위임
    val profile = Profile()
    profile.bio = "Kotlin 개발자입니다"
    println("소개: ${profile.bio}")

    try {
        profile.bio = "a".repeat(51)
    } catch (e: IllegalArgumentException) {
        println("오류: ${e.message}")
    }
}
