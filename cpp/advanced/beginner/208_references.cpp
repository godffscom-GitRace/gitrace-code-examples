// [208] 참조 - References
// 레벨: 2 | C++의 참조(&)는 변수의 별명(alias)입니다

#include <iostream>
#include <string>
using namespace std;

void swapv(int& a, int& b) {
    int t = a; a = b; b = t;
}

void show(const string& name, int age) {
    cout << name << " " << age << endl;
}

class C {
public:
    int v = 0;
    C& inc() { v++; return *this; }
};

int main() {
    int x = 1, y = 2;
    swapv(x, y);
    cout << x << " " << y << endl;

    string n = "Alex";
    show(n, 20);

    C c;
    c.inc().inc();
    cout << c.v << endl;

    int a[] = {1, 2, 3};
    for (int& i : a) i *= 2;
    for (int i : a) cout << i << " ";
    cout << endl;

    return 0;
}
