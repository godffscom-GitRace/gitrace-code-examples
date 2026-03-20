// [202] 변수와 자료형 - Variables & Data Types
// 레벨: 1 | C++의 기본 자료형과 auto 키워드를 배웁니다

#include <iostream>
#include <string>
using namespace std;

int main() {
    // 기본 자료형
    int age = 25;
    double height = 175.5;
    char grade = 'A';
    bool isStudent = true;

    // C++ string (C의 char 배열보다 편리)
    string name = "김철수";

    // auto: 컴파일러가 자료형을 자동 추론
    auto score = 95;       // int로 추론
    auto gpa = 4.2;        // double로 추론
    auto city = "서울"s;  // string으로 추론

    // 출력
    cout << "이름: " << name << endl;
    cout << "나이: " << age << endl;
    cout << "키: " << height << " cm" << endl;
    cout << "학점: " << grade << endl;
    cout << "학생 여부: " << boolalpha << isStudent << endl;
    cout << "점수: " << score << endl;

    // 상수 (const)
    const double PI = 3.14159265358979;
    cout << "π = " << PI << endl;

    // 자료형 크기
    cout << "\n자료형 크기:" << endl;
    cout << "int: " << sizeof(int) << " bytes" << endl;
    cout << "double: " << sizeof(double) << " bytes" << endl;
    cout << "string: " << sizeof(string) << " bytes" << endl;

    return 0;
}
