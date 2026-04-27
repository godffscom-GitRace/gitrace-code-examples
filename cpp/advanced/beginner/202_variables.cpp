// [202] 변수와 자료형 - Variables & Data Types
// 레벨: 1 | C++의 기본 자료형과 auto 키워드를 배웁니다

#include <iostream>
#include <string>
using namespace std;

int main() {
    int age = 20;
    double height = 170.5;
    char grade = 'B';
    bool isStudent = true;

    string name = "Alex";

    auto score = 90;
    auto city = string("Seoul");

    cout << "Name " << name << endl;
    cout << "Age " << age << endl;
    cout << "Grade " << grade << endl;
    cout << "Student " << boolalpha << isStudent << endl;

    cout << "Score " << score << endl;
    cout << "City " << city << endl;

    const double PI = 3.14;
    cout << "PI " << PI << endl;

    return 0;
}
