// [815] 코루틴 기초 - Coroutines Basic
// 레벨: 2 | Kotlin 코루틴으로 비동기 프로그래밍을 배웁니다

import kotlinx.coroutines.*

// 일시 중단 함수 (suspend function)
suspend fun fetchUser(id: Int): String {
    delay(100)  // 비차단 지연
    return "User#$id"
}

suspend fun fetchScore(userId: String): Int {
    delay(50)
    return userId.hashCode() % 100 + 50
}

fun main() = runBlocking {
    // launch: 결과 없이 실행 (Job 반환)
    println("=== launch ===")
    val job = launch {
        delay(200)
        println("launch 완료")
    }
    println("launch 시작됨")
    job.join()  // 완료 대기

    // async: 결과 반환 (Deferred 반환)
    println("\n=== async/await ===")
    val deferred = async {
        fetchUser(1)
    }
    println("다른 작업 중...")
    val user = deferred.await()
    println("결과: $user")

    // 병렬 실행 (두 작업 동시 수행)
    println("\n=== 병렬 실행 ===")
    val start = System.currentTimeMillis()
    val user1 = async { fetchUser(1) }
    val user2 = async { fetchUser(2) }
    println("${user1.await()}, ${user2.await()}")
    println("소요 시간: ${System.currentTimeMillis() - start}ms")

    // 순차 실행 vs 병렬
    println("\n=== 순차 체이닝 ===")
    val fetchedUser = fetchUser(42)
    val score = fetchScore(fetchedUser)
    println("$fetchedUser 의 점수: $score")

    // withContext: 스레드 전환
    println("\n=== withContext ===")
    val result = withContext(Dispatchers.Default) {
        // CPU 집약적 작업
        (1..1000).sum()
    }
    println("합계: $result")

    // coroutineScope: 자식 코루틴 관리
    println("\n=== coroutineScope ===")
    coroutineScope {
        launch { println("자식 1") }
        launch { println("자식 2") }
        launch { println("자식 3") }
    }
    println("모든 자식 완료")
}
