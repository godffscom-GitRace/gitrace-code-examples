// [806] 클래스 - Classes
// 레벨: 1 | Kotlin 클래스의 기본 구조와 생성자를 배웁니다

// 기본 클래스 (주 생성자)
class Person(val name: String, var age: Int) {
    // 초기화 블록
    init {
        require(age >= 0) { "나이는 0 이상이어야 합니다" }
        println("Person 생성: $name ($age)")
    }

    // 부 생성자
    constructor(name: String) : this(name, 0)

    // 프로퍼티
    val isAdult: Boolean
        get() = age >= 18

    // 메서드
    fun introduce() {
        println("저는 ${name}이고 ${age}살입니다.")
    }

    override fun toString() = "Person(name=$name, age=$age)"
}

// 상속 (open 키워드 필요)
open class Animal(val name: String) {
    open fun sound() = println("$name: ...")
}

class Dog(name: String) : Animal(name) {
    override fun sound() = println("$name: 멍멍!")
    fun fetch() = println("$name이 공을 가져옵니다!")
}

// 인터페이스
interface Flyable {
    val maxAltitude: Int
    fun fly() = println("${maxAltitude}m 높이로 날아오릅니다")
}

class Bird(name: String) : Animal(name), Flyable {
    override val maxAltitude = 1000
    override fun sound() = println("$name: 짹짹!")
}

fun main() {
    val p1 = Person("김철수", 25)
    p1.introduce()
    println("성인 여부: ${p1.isAdult}")

    val p2 = Person("아기")
    println(p2)

    val dog = Dog("바둑이")
    dog.sound()
    dog.fetch()

    val bird = Bird("참새")
    bird.sound()
    bird.fly()

    // is 연산자 (타입 체크)
    val animals: List<Animal> = listOf(dog, bird)
    for (animal in animals) {
        when (animal) {
            is Dog  -> animal.fetch()
            is Bird -> animal.fly()
        }
    }
}
