// [205] 조건문 - if/else
// 레벨: 1 | if-else 체인과 C++17 if-init 문법을 배웁니다

#include <iostream>
#include <string>
using namespace std;

int main() {
    int score;
    cout << "점수를 입력하세요 (0~100): ";
    cin >> score;

    // if-else if-else 체인
    string grade;
    if (score >= 90) {
        grade = "A";
        cout << "우수한 성적입니다!" << endl;
    } else if (score >= 80) {
        grade = "B";
        cout << "좋은 성적입니다." << endl;
    } else if (score >= 70) {
        grade = "C";
        cout << "보통 성적입니다." << endl;
    } else if (score >= 60) {
        grade = "D";
        cout << "노력이 필요합니다." << endl;
    } else {
        grade = "F";
        cout << "재시험이 필요합니다." << endl;
    }
    cout << "학점: " << grade << endl;

    // 삼항 연산자
    string result = (score >= 60) ? "합격" : "불합격";
    cout << "결과: " << result << endl;

    // C++17: if 초기화 문법
    if (int bonus = score - 60; bonus > 0) {
        cout << "기본 점수 초과: +" << bonus << "점" << endl;
    }

    // 중첩 if
    if (score >= 60) {
        cout << "\n합격!" << endl;
        if (score == 100) {
            cout << "만점 달성! 🎉" << endl;
        } else if (score >= 90) {
            cout << "장학금 대상입니다!" << endl;
        }
    }

    return 0;
}
