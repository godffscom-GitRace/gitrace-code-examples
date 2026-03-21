// [803] 제어 흐름 - Control Flow
// 레벨: 1 | if 표현식, when, for, while로 흐름을 제어합니다

fun main() {
    // if 표현식 (문이 아닌 표현식)
    val score = 85
    val grade = if (score >= 90) "A"
                else if (score >= 80) "B"
                else if (score >= 70) "C"
                else "F"
    println("점수: $score → 등급: $grade")

    // when 표현식 (Java switch 대체)
    val day = 3
    val dayName = when (day) {
        1 -> "월요일"
        2 -> "화요일"
        3 -> "수요일"
        4 -> "목요일"
        5 -> "금요일"
        6, 7 -> "주말"
        else -> "알 수 없음"
    }
    println("$day 번째 날: $dayName")

    // when 범위 조건
    val temp = 25
    val weather = when {
        temp < 0  -> "영하"
        temp < 10 -> "추움"
        temp < 25 -> "적당"
        temp < 35 -> "더움"
        else      -> "폭염"
    }
    println("기온 ${temp}°C: $weather")

    // for 반복
    for (i in 1..5) print("$i ")
    println()

    for (i in 5 downTo 1) print("$i ")
    println()

    for (i in 0..10 step 2) print("$i ")
    println()

    // 컬렉션 순회
    val fruits = listOf("사과", "바나나", "체리")
    for ((index, fruit) in fruits.withIndex()) {
        println("$index: $fruit")
    }

    // while
    var count = 0
    while (count < 3) {
        print("count=$count ")
        count++
    }
    println()

    // repeat
    repeat(3) { i -> print("반복$i ") }
    println()
}
