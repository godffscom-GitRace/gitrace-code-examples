// [213] 상속과 다형성 - Inheritance & Polymorphism
// 레벨: 3 | 상속, 오버라이딩, 가상 함수, 순수 가상 함수를 배웁니다

#include <iostream>
#include <vector>
using namespace std;

class A {
public:
    virtual ~A() {}
    virtual int sound() const = 0;
};

class D : public A {
public:
    int sound() const override { return 1; }
};

class C : public A {
public:
    int sound() const override { return 2; }
};

int main() {
    vector<A*> v;
    v.push_back(new D());
    v.push_back(new C());

    for (A* a : v)
        cout << a->sound() << endl;

    for (A* a : v)
        delete a;

    return 0;
}
