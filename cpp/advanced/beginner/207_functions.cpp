// [207] 함수 - Functions
// 레벨: 2 | 함수 오버로딩, 기본값 매개변수, 인라인 함수를 배웁니다

#include <iostream>
#include <string>
using namespace std;

// 함수 오버로딩: 같은 이름, 다른 매개변수
int add(int a, int b) { return a + b; }
double add(double a, double b) { return a + b; }
int add(int a, int b, int c) { return a + b + c; }

// 기본값 매개변수
void greet(string name, string msg = "안녕하세요") {
    cout << msg << ", " << name << "님!" << endl;
}

// 인라인 함수: 함수 호출 오버헤드 제거
inline int square(int x) { return x * x; }

// 재귀 함수
int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// 값 반환 vs 참조 반환
int& getElement(int arr[], int idx) {
    return arr[idx];  // 참조 반환: 원본 수정 가능
}

int main() {
    // 함수 오버로딩
    cout << "=== 함수 오버로딩 ===" << endl;
    cout << "add(3, 4) = " << add(3, 4) << endl;
    cout << "add(1.5, 2.5) = " << add(1.5, 2.5) << endl;
    cout << "add(1, 2, 3) = " << add(1, 2, 3) << endl;

    // 기본값 매개변수
    cout << "\n=== 기본값 매개변수 ===" << endl;
    greet("김철수");               // 기본 메시지 사용
    greet("이영희", "좋은 아침");  // 직접 지정

    // 인라인 함수
    cout << "\n=== 인라인 함수 ===" << endl;
    for (int i = 1; i <= 5; i++) {
        cout << i << "² = " << square(i) << endl;
    }

    // 피보나치 수열
    cout << "\n=== 피보나치 수열 ===" << endl;
    for (int i = 0; i <= 9; i++) {
        cout << fibonacci(i) << " ";
    }
    cout << endl;

    // 참조 반환으로 배열 요소 수정
    int scores[] = {85, 92, 78, 96, 88};
    getElement(scores, 2) = 100;  // scores[2]를 100으로 변경
    cout << "\nscores[2] 수정 후: " << scores[2] << endl;

    return 0;
}
