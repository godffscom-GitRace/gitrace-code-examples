// [813] 봉인 클래스 - Sealed Classes
// 레벨: 2 | 제한된 계층 구조로 상태와 결과를 안전하게 표현합니다

// sealed class: 하위 클래스가 같은 파일에 정의됨
sealed class Result<out T> {
    data class Success<T>(val data: T) : Result<T>()
    data class Error(val message: String, val code: Int = 0) : Result<Nothing>()
    object Loading : Result<Nothing>()
}

// UI 상태 표현
sealed class UiState {
    object Idle : UiState()
    object Loading : UiState()
    data class Success(val message: String) : UiState()
    data class Error(val error: String) : UiState()
}

// 네트워크 응답
sealed class NetworkResponse<out T> {
    data class Success<T>(val body: T, val code: Int = 200) : NetworkResponse<T>()
    data class Failure(val code: Int, val message: String) : NetworkResponse<Nothing>()
    object NetworkError : NetworkResponse<Nothing>()
}

fun handleResult(result: Result<String>) {
    // when은 sealed class와 함께 쓸 때 else 불필요
    val message = when (result) {
        is Result.Success -> "성공: ${result.data}"
        is Result.Error   -> "오류 [${result.code}]: ${result.message}"
        Result.Loading    -> "로딩 중..."
    }
    println(message)
}

fun fetchData(succeed: Boolean): Result<String> {
    return if (succeed) Result.Success("사용자 데이터")
    else Result.Error("서버 오류", 500)
}

fun main() {
    handleResult(Result.Loading)
    handleResult(fetchData(true))
    handleResult(fetchData(false))

    // UiState 처리
    val states = listOf(
        UiState.Idle,
        UiState.Loading,
        UiState.Success("데이터 로드 완료"),
        UiState.Error("연결 실패")
    )

    for (state in states) {
        val display = when (state) {
            UiState.Idle          -> "대기 중"
            UiState.Loading       -> "⏳ 로딩..."
            is UiState.Success    -> "✅ ${state.message}"
            is UiState.Error      -> "❌ ${state.error}"
        }
        println(display)
    }
}
