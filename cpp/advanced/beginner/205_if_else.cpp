// [205] 조건문 - if/else
// 레벨: 1 | if-else 체인과 C++17 if-init 문법을 배웁니다

#include <iostream>
#include <string>
using namespace std;

int main() {
    int score;
    cin >> score;

    string grade;
    if (score >= 90) grade = "A";
    else if (score >= 80) grade = "B";
    else if (score >= 70) grade = "C";
    else grade = "F";

    cout << grade << endl;

    string pass = (score >= 60) ? "Pass" : "Fail";
    cout << pass << endl;

    if (int bonus = score - 60; bonus > 0)
        cout << bonus << endl;

    if (score == 100) cout << "Perfect" << endl;

    return 0;
}
