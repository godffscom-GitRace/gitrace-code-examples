// [817] 컬렉션 고급 - Collections Advanced
// 레벨: 2 | Kotlin 컬렉션 API를 깊이 있게 활용합니다

data class Student(val name: String, val grade: Int, val score: Double)

fun main() {
    val students = listOf(
        Student("철수", 3, 88.5),
        Student("영희", 2, 92.0),
        Student("민수", 3, 75.0),
        Student("지영", 1, 95.5),
        Student("현우", 2, 80.0),
        Student("수연", 1, 88.0),
    )

    // groupBy
    val byGrade = students.groupBy { it.grade }
    byGrade.forEach { (grade, list) ->
        println("${grade}학년: ${list.map { it.name }}")
    }

    // partition: 조건에 맞는/안 맞는 두 리스트로 분리
    val (pass, fail) = students.partition { it.score >= 85 }
    println("\n합격: ${pass.map { it.name }}")
    println("불합격: ${fail.map { it.name }}")

    // flatMap
    val words = listOf("Hello Kotlin", "Functional Programming")
    val allWords = words.flatMap { it.split(" ") }
    println("\n모든 단어: $allWords")

    // zip
    val names = listOf("A", "B", "C")
    val scores = listOf(90, 85, 92)
    val zipped = names.zip(scores)
    println("\nzip: $zipped")

    val unzipped = zipped.unzip()
    println("unzip: $unzipped")

    // windowed / chunked
    val numbers = (1..10).toList()
    println("\nwindowed(3): ${numbers.windowed(3)}")
    println("chunked(3): ${numbers.chunked(3)}")

    // associate
    val nameToScore = students.associate { it.name to it.score }
    println("\nnameToScore: $nameToScore")

    val byName = students.associateBy { it.name }
    println("철수 점수: ${byName["철수"]?.score}")

    // 통계
    println("\n=== 통계 ===")
    println("평균 점수: ${"%.1f".format(students.averageOf { it.score })}")
    println("최고 점수: ${students.maxByOrNull { it.score }?.name}")
    println("최저 점수: ${students.minByOrNull { it.score }?.name}")

    // sortedWith 복합 정렬
    val sorted = students.sortedWith(
        compareByDescending<Student> { it.score }.thenBy { it.name }
    )
    println("\n정렬 결과:")
    sorted.forEach { println("  ${it.name}: ${it.score}") }
}

fun <T> Iterable<T>.averageOf(selector: (T) -> Double): Double =
    map(selector).average()
