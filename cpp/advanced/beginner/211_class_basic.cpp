// [211] 클래스 기초 - Class Basics
// 레벨: 2 | 클래스, 생성자, 소멸자, 접근 제어자를 배웁니다

#include <iostream>
#include <string>
using namespace std;

class S {
private:
    string name;
    int score;

public:
    S(string n, int s) : name(n), score(s) {}
    ~S() { cout << name << " end" << endl; }

    string getName() const { return name; }
    int getScore() const { return score; }

    void setScore(int s) {
        if (s >= 0 && s <= 100) score = s;
    }

    void print() const {
        cout << name << " " << score << endl;
    }
};

int main() {
    S a("Alex", 80);
    a.print();

    a.setScore(90);
    cout << a.getName() << " " << a.getScore() << endl;

    return 0;
}
