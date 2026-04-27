// [206] 반복문 - Loops (for / while / range-for)
// 레벨: 1 | C++ 반복문과 범위 기반 for문을 배웁니다

#include <iostream>
#include <vector>
using namespace std;

int main() {
    for (int i = 1; i <= 5; i++)
        cout << i << " ";
    cout << endl;

    int v = 1;
    while (v <= 8) {
        cout << v << " ";
        v *= 2;
    }
    cout << endl;

    int x;
    do {
        cin >> x;
    } while (x < 1 || x > 5);
    cout << x << endl;

    vector<int> nums = {1, 2, 3};
    for (int n : nums)
        cout << n << " ";
    cout << endl;

    for (int i = 1; i <= 5; i++) {
        if (i == 3) continue;
        if (i == 5) break;
        cout << i << " ";
    }
    cout << endl;

    return 0;
}
