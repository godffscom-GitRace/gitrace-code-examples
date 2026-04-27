// [204] 연산자 - Operators
// 레벨: 1 | C++의 다양한 연산자와 C와의 차이점을 배웁니다

#include <iostream>
using namespace std;

int main() {
    int a = 10, b = 3;

    cout << a + b << endl;
    cout << a * b << endl;
    cout << a % b << endl;

    double d = static_cast<double>(a) / b;
    cout << d << endl;

    cout << boolalpha;
    cout << (a > b) << endl;
    cout << (a == b) << endl;

    bool x = true, y = false;
    cout << (x && y) << endl;
    cout << (x || y) << endl;

    int n = 10;
    n += 5;
    n *= 2;
    cout << n << endl;

    char c = static_cast<char>(65);
    cout << c << endl;

    return 0;
}
