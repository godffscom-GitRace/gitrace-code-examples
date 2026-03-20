// [201] Hello World - 첫 번째 C++ 프로그램
// 레벨: 1 | C++의 기본 구조와 cout 출력을 배웁니다

#include <iostream>
using namespace std;

int main() {
    // cout: C++의 표준 출력 스트림
    cout << "Hello, World!" << endl;
    cout << "안녕하세요, C++!" << endl;

    // endl: 줄바꿈 + 버퍼 비우기 (\n보다 안전)
    cout << "첫 번째 줄" << endl;
    cout << "두 번째 줄" << "\n";  // \n도 사용 가능

    // << 연산자로 여러 값을 이어서 출력
    cout << "C++ " << "is " << "awesome!" << endl;

    return 0;
}
