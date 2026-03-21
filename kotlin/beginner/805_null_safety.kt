// [805] Null 안전성 - Null Safety
// 레벨: 1 | Kotlin의 핵심 기능인 Null 안전 시스템을 배웁니다

fun main() {
    // null 불가 타입 vs nullable 타입
    val nonNull: String = "항상 값 있음"
    var nullable: String? = "값 있음"
    nullable = null

    // 안전 호출 연산자 ?.
    println(nullable?.length)       // null
    println(nonNull.length)         // 8

    // 엘비스 연산자 ?: (기본값 제공)
    val len = nullable?.length ?: 0
    println("길이: $len")

    // 안전 캐스트 as?
    val obj: Any = "Hello"
    val str: String? = obj as? String
    val num: Int? = obj as? Int
    println("str: $str, num: $num")

    // 비-null 단언 !! (NPE 위험 - 확실할 때만)
    val definitelyNotNull: String? = "확실한 값"
    println(definitelyNotNull!!.length)

    // let으로 null 체크
    nullable?.let {
        println("값이 있음: $it")
    } ?: println("null입니다")

    // null 체크 후 스마트 캐스트
    var name: String? = "Kotlin"
    if (name != null) {
        println(name.length)  // 스마트 캐스트: String?→String
    }

    // nullable 컬렉션
    val list: List<String?> = listOf("a", null, "b", null, "c")
    val nonNullList = list.filterNotNull()
    println("null 제거: $nonNullList")
}
