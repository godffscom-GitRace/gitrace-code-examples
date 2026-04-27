// [210] 문자열 - std::string
// 레벨: 2 | C++ string 클래스의 다양한 메서드를 배웁니다

#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string s = "Hello Race";

    cout << s.substr(6) << endl;

    size_t p = s.find("Race");
    cout << p << endl;

    string t = s;
    transform(t.begin(), t.end(), t.begin(), ::toupper);
    cout << t << endl;

    s.replace(6, 4, "Code");
    cout << s << endl;

    int n = 42;
    string ns = to_string(n);
    cout << ns << endl;

    double v = stod("3.5");
    cout << v << endl;

    return 0;
}
