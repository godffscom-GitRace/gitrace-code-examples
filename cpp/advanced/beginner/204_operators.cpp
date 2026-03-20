// [204] 연산자 - Operators
// 레벨: 1 | C++의 다양한 연산자와 C와의 차이점을 배웁니다

#include <iostream>
using namespace std;

int main() {
    int a = 10, b = 3;

    // 산술 연산자
    cout << "=== 산술 연산 ===" << endl;
    cout << a << " + " << b << " = " << (a + b) << endl;
    cout << a << " - " << b << " = " << (a - b) << endl;
    cout << a << " * " << b << " = " << (a * b) << endl;
    cout << a << " / " << b << " = " << (a / b) << endl;
    cout << a << " % " << b << " = " << (a % b) << endl;

    // 실수 나눗셈
    double result = static_cast<double>(a) / b;
    cout << a << " / " << b << " = " << result << " (실수)" << endl;

    // 비교 연산자
    cout << "\n=== 비교 연산 ===" << endl;
    cout << boolalpha;  // true/false 문자로 출력
    cout << "10 > 3: " << (a > b) << endl;
    cout << "10 == 3: " << (a == b) << endl;
    cout << "10 != 3: " << (a != b) << endl;

    // 논리 연산자
    cout << "\n=== 논리 연산 ===" << endl;
    bool x = true, y = false;
    cout << "true && false: " << (x && y) << endl;
    cout << "true || false: " << (x || y) << endl;
    cout << "!true: " << (!x) << endl;

    // 복합 대입 연산자
    cout << "\n=== 복합 대입 ===" << endl;
    int n = 10;
    cout << "n = " << n << endl;
    n += 5;  cout << "n += 5: " << n << endl;
    n -= 3;  cout << "n -= 3: " << n << endl;
    n *= 2;  cout << "n *= 2: " << n << endl;
    n /= 4;  cout << "n /= 4: " << n << endl;

    // C++ static_cast (C 스타일 캐스팅보다 안전)
    int num = 65;
    char ch = static_cast<char>(num);
    cout << "\nstatic_cast<char>(65) = " << ch << endl;

    return 0;
}
