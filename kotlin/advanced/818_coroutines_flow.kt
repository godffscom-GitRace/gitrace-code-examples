// [818] 코루틴 Flow - Coroutines Flow
// 레벨: 3 | 비동기 데이터 스트림을 Flow로 처리합니다

import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

// 기본 Flow 생성
fun numberFlow(): Flow<Int> = flow {
    for (i in 1..5) {
        delay(100)
        emit(i)
    }
}

// StateFlow: 상태 홀더 (항상 최신 값 보유)
// SharedFlow: 여러 구독자에게 브로드캐스트

// 데이터 처리 파이프라인 시뮬레이션
fun generateEvents(): Flow<String> = flow {
    val events = listOf("login", "purchase", "logout", "login", "view")
    events.forEach { event ->
        delay(50)
        emit(event)
    }
}

fun main() = runBlocking {
    // 기본 collect
    println("=== 기본 Flow ===")
    numberFlow().collect { value ->
        println("수신: $value")
    }

    // map, filter 연산자
    println("\n=== 변환 연산자 ===")
    numberFlow()
        .filter { it % 2 == 0 }
        .map { it * it }
        .collect { println("짝수 제곱: $it") }

    // take
    println("\n=== take ===")
    numberFlow().take(3).collect { print("$it ") }
    println()

    // toList
    val list = numberFlow().toList()
    println("리스트: $list")

    // reduce
    val sum = numberFlow().reduce { acc, value -> acc + value }
    println("합계: $sum")

    // zip: 두 flow 결합
    println("\n=== zip ===")
    val flow1 = flowOf("A", "B", "C")
    val flow2 = flowOf(1, 2, 3)
    flow1.zip(flow2) { a, b -> "$a$b" }.collect { print("$it ") }
    println()

    // flatMapConcat: 각 값을 새 Flow로 변환
    println("\n=== flatMapConcat ===")
    flowOf(1, 2, 3)
        .flatMapConcat { n ->
            flow { repeat(n) { emit("$n-$it") } }
        }
        .collect { print("$it ") }
    println()

    // 이벤트 처리 파이프라인
    println("\n=== 이벤트 파이프라인 ===")
    generateEvents()
        .filter { it == "login" }
        .map { "로그인 감지: $it" }
        .collect { println(it) }

    // catch: 오류 처리
    println("\n=== 오류 처리 ===")
    flow<Int> {
        emit(1)
        emit(2)
        throw RuntimeException("Flow 오류!")
    }.catch { e ->
        println("오류 캐치: ${e.message}")
        emit(-1)
    }.collect { println("값: $it") }
}
