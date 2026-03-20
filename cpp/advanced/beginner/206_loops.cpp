// [206] 반복문 - Loops (for / while / range-for)
// 레벨: 1 | C++ 반복문과 범위 기반 for문을 배웁니다

#include <iostream>
#include <vector>
using namespace std;

int main() {
    // 기본 for문
    cout << "1부터 10까지: ";
    for (int i = 1; i <= 10; i++) {
        cout << i << " ";
    }
    cout << endl;

    // while문
    cout << "\n=== while: 2의 거듭제곱 ===" << endl;
    int val = 1;
    while (val <= 1024) {
        cout << val << " ";
        val *= 2;
    }
    cout << endl;

    // do-while
    cout << "\n=== do-while ===" << endl;
    int input;
    do {
        cout << "1~10 사이 숫자 입력: ";
        cin >> input;
    } while (input < 1 || input > 10);
    cout << "입력값: " << input << endl;

    // 범위 기반 for문 (C++11) - 배열/컨테이너 순회
    cout << "\n=== 범위 기반 for문 ===" << endl;
    vector<string> langs = {"C++", "Python", "Java", "JavaScript"};

    for (const string& lang : langs) {
        cout << "  - " << lang << endl;
    }

    // auto 사용
    int arr[] = {10, 20, 30, 40, 50};
    int sum = 0;
    for (auto n : arr) {
        sum += n;
    }
    cout << "배열 합계: " << sum << endl;

    // 중첩 for + break/continue
    cout << "\n=== 소수 찾기 (2~20) ===" << endl;
    for (int n = 2; n <= 20; n++) {
        bool isPrime = true;
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) { isPrime = false; break; }
        }
        if (isPrime) cout << n << " ";
    }
    cout << endl;

    return 0;
}
