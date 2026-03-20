// [217] 예외 처리 - Exception Handling
// 레벨: 3 | try-catch-throw로 예외를 처리하는 방법을 배웁니다

#include <iostream>
#include <stdexcept>  // standard exceptions
#include <string>
using namespace std;

// 사용자 정의 예외 클래스
class ValidationError : public runtime_error {
    int value;
public:
    ValidationError(const string& msg, int v)
        : runtime_error(msg), value(v) {}
    int getValue() const { return value; }
};

double divide(double a, double b) {
    if (b == 0) {
        throw invalid_argument("0으로 나눌 수 없습니다!");
    }
    return a / b;
}

int getScore(int score) {
    if (score < 0 || score > 100) {
        throw ValidationError("점수 범위 오류: 0~100이어야 합니다", score);
    }
    return score;
}

int main() {
    // 기본 try-catch
    cout << "=== 기본 예외 처리 ===" << endl;
    try {
        cout << divide(10, 2) << endl;   // 정상
        cout << divide(10, 0) << endl;   // 예외 발생!
    } catch (const invalid_argument& e) {
        cout << "오류: " << e.what() << endl;
    }

    // 여러 예외 타입 처리
    cout << "\n=== 다중 catch ===" << endl;
    try {
        vector<int> v = {1, 2, 3};
        cout << v.at(10) << endl;  // out_of_range 예외
    } catch (const out_of_range& e) {
        cout << "범위 오류: " << e.what() << endl;
    } catch (const exception& e) {
        cout << "일반 오류: " << e.what() << endl;
    }

    // 사용자 정의 예외
    cout << "\n=== 사용자 정의 예외 ===" << endl;
    int testScores[] = {85, 150, -5, 92};
    for (int s : testScores) {
        try {
            int valid = getScore(s);
            cout << "유효한 점수: " << valid << endl;
        } catch (const ValidationError& e) {
            cout << "검증 오류 (입력값: " << e.getValue()
                 << "): " << e.what() << endl;
        }
    }

    // finally 역할 (RAII 개념)
    cout << "\n=== 항상 실행 ===" << endl;
    try {
        cout << "작업 시작..." << endl;
        throw runtime_error("작업 중 오류 발생!");
        cout << "이 줄은 실행 안 됨" << endl;
    } catch (const runtime_error& e) {
        cout << "오류 처리: " << e.what() << endl;
    }
    cout << "예외 처리 후 계속 실행됨" << endl;

    return 0;
}
