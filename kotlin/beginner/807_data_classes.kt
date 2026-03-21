// [807] 데이터 클래스 - Data Classes
// 레벨: 1 | data class로 간결하게 모델 객체를 만듭니다

// data class: equals, hashCode, toString, copy 자동 생성
data class User(
    val id: Int,
    val name: String,
    val email: String,
    val age: Int = 0
)

data class Point(val x: Double, val y: Double)

fun main() {
    val user1 = User(1, "철수", "cs@email.com", 25)
    val user2 = User(1, "철수", "cs@email.com", 25)
    val user3 = User(2, "영희", "yh@email.com", 23)

    // toString 자동 생성
    println(user1)

    // equals 자동 생성 (구조적 동등성)
    println("같음: ${user1 == user2}")   // true
    println("같음: ${user1 == user3}")   // false

    // copy: 일부 필드만 변경
    val updated = user1.copy(age = 26, email = "new@email.com")
    println("원본: $user1")
    println("복사: $updated")

    // 구조 분해 선언
    val (id, name, email) = user1
    println("id=$id, name=$name, email=$email")

    // 컴포넌트 함수
    println("component1: ${user1.component1()}")

    // 중첩 data class
    data class Rectangle(val topLeft: Point, val bottomRight: Point) {
        val width get() = bottomRight.x - topLeft.x
        val height get() = bottomRight.y - topLeft.y
        val area get() = width * height
    }

    val rect = Rectangle(Point(0.0, 0.0), Point(5.0, 3.0))
    println("넓이: ${rect.area}")
}
