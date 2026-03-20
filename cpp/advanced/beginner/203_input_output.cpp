// [203] 표준 입출력 - cin / cout
// 레벨: 1 | cin으로 입력받고 cout으로 출력하는 방법을 배웁니다

#include <iostream>
#include <string>
#include <iomanip>  // setw, setprecision
using namespace std;

int main() {
    string name;
    int age;
    double height;

    cout << "=== 개인정보 입력 ===" << endl;

    // cin: 표준 입력 스트림 (공백 전까지 읽음)
    cout << "이름을 입력하세요: ";
    cin >> name;

    cout << "나이를 입력하세요: ";
    cin >> age;

    cout << "키를 입력하세요 (cm): ";
    cin >> height;

    // 출력
    cout << "\n=== 입력 결과 ===" << endl;
    cout << "이름: " << name << endl;
    cout << "나이: " << age << "세" << endl;
    cout << "키: " << fixed << setprecision(1) << height << " cm" << endl;

    // getline: 공백 포함한 한 줄 전체 읽기
    cin.ignore();  // 버퍼의 남은 '\n' 제거
    string address;
    cout << "\n주소를 입력하세요: ";
    getline(cin, address);
    cout << "주소: " << address << endl;

    // iomanip으로 출력 형식 지정
    cout << "\n=== 출력 형식 ===" << endl;
    cout << setw(10) << "이름" << setw(10) << "점수" << endl;
    cout << setw(10) << "김철수" << setw(10) << 95 << endl;
    cout << setw(10) << "이영희" << setw(10) << 88 << endl;

    return 0;
}
