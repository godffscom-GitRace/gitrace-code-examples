// [808] 컬렉션 - Collections
// 레벨: 1 | List, Set, Map과 불변/가변 컬렉션을 배웁니다

fun main() {
    // List (불변)
    val fruits = listOf("사과", "바나나", "체리", "사과")
    println("과일: $fruits")
    println("크기: ${fruits.size}, 첫번째: ${fruits[0]}")
    println("포함 여부: ${"바나나" in fruits}")

    // MutableList (가변)
    val mutableFruits = mutableListOf("사과", "바나나")
    mutableFruits.add("망고")
    mutableFruits.remove("바나나")
    println("가변 리스트: $mutableFruits")

    // Set (중복 불가, 불변)
    val numbers = setOf(1, 2, 3, 2, 1)
    println("Set: $numbers")  // 중복 제거

    val mutableSet = mutableSetOf(1, 2, 3)
    mutableSet.add(4)
    mutableSet.add(2)  // 무시됨
    println("가변 Set: $mutableSet")

    // Map (불변)
    val scores = mapOf("철수" to 90, "영희" to 85, "민수" to 92)
    println("점수: $scores")
    println("철수 점수: ${scores["철수"]}")
    println("없는 키: ${scores["없음"] ?: 0}")

    // MutableMap
    val mutableMap = mutableMapOf("a" to 1, "b" to 2)
    mutableMap["c"] = 3
    mutableMap.remove("a")
    println("가변 Map: $mutableMap")

    // 컬렉션 함수
    val nums = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    println("짝수: ${nums.filter { it % 2 == 0 }}")
    println("제곱: ${nums.map { it * it }}")
    println("합계: ${nums.sum()}")
    println("평균: ${nums.average()}")
    println("최대: ${nums.max()}")

    // groupBy
    val grouped = nums.groupBy { if (it % 2 == 0) "짝수" else "홀수" }
    println("그룹: $grouped")
}
