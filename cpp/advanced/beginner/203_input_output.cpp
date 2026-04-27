// [203] 표준 입출력 - cin / cout
// 레벨: 1 | cin으로 입력받고 cout으로 출력하는 방법을 배웁니다

#include <iostream>
#include <string>
#include <iomanip>
using namespace std;

int main() {
    string name;
    double height;

    cout << "Name ";
    cin >> name;

    cout << "Height ";
    cin >> height;

    cout << fixed << setprecision(1);
    cout << name << " " << height << endl;

    cin.ignore();
    string city;
    getline(cin, city);
    cout << city << endl;

    cout << setw(8) << name << setw(8) << 100 << endl;

    return 0;
}
