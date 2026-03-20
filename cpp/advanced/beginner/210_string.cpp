// [210] 문자열 - std::string
// 레벨: 2 | C++ string 클래스의 다양한 메서드를 배웁니다

#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string s1 = "Hello, GitRace!";
    string s2 = "C++ Programming";

    // 기본 정보
    cout << "문자열: " << s1 << endl;
    cout << "길이: " << s1.length() << endl;
    cout << "비어있나: " << boolalpha << s1.empty() << endl;

    // 문자열 연결: + 연산자
    string full = s1 + " " + s2;
    cout << "연결: " << full << endl;

    // 부분 문자열 (substr)
    cout << "\n=== 부분 문자열 ===" << endl;
    cout << s1.substr(7) << endl;        // 7번째부터 끝까지
    cout << s1.substr(7, 7) << endl;     // 7번째부터 7글자

    // 검색 (find)
    size_t pos = s1.find("Race");
    if (pos != string::npos) {
        cout << "'Race' 위치: " << pos << endl;
    }

    // 문자열 비교
    cout << "\n=== 비교 ===" << endl;
    string a = "apple", b = "banana";
    cout << (a < b ? "apple이 먼저" : "banana가 먼저") << endl;
    cout << (a == b ? "같다" : "다르다") << endl;

    // 대소문자 변환
    cout << "\n=== 대소문자 변환 ===" << endl;
    string text = "Hello World";
    string lower = text, upper = text;
    transform(lower.begin(), lower.end(), lower.begin(), ::tolower);
    transform(upper.begin(), upper.end(), upper.begin(), ::toupper);
    cout << "소문자: " << lower << endl;
    cout << "대문자: " << upper << endl;

    // replace: 일부 교체
    string msg = "Hello, 김철수님!";
    msg.replace(7, 9, "이영희");  // 7번째부터 9글자를 교체
    cout << "\n교체 후: " << msg << endl;

    // 숫자 ↔ 문자열 변환
    cout << "\n=== 변환 ===" << endl;
    int num = 42;
    string numStr = to_string(num);
    cout << "to_string: " << numStr << " (길이: " << numStr.length() << ")" << endl;

    string pi = "3.14159";
    double val = stod(pi);
    cout << "stod: " << val * 2 << endl;

    return 0;
}
