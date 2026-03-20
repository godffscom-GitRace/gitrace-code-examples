// [213] 상속과 다형성 - Inheritance & Polymorphism
// 레벨: 3 | 상속, 오버라이딩, 가상 함수, 순수 가상 함수를 배웁니다

#include <iostream>
#include <string>
#include <vector>
using namespace std;

// 추상 기본 클래스
class Animal {
protected:
    string name;
    int age;

public:
    Animal(string n, int a) : name(n), age(a) {}
    virtual ~Animal() {}  // 가상 소멸자: 다형성 사용 시 필수

    // 순수 가상 함수: 반드시 오버라이드해야 함
    virtual string sound() const = 0;

    // 가상 함수: 오버라이드 가능
    virtual void introduce() const {
        cout << "저는 " << name << "이고 " << age << "살입니다." << endl;
    }

    string getName() const { return name; }
};

// 파생 클래스
class Dog : public Animal {
    string breed;
public:
    Dog(string n, int a, string b) : Animal(n, a), breed(b) {}

    // override 키워드: 오버라이드 명시 (오타 방지)
    string sound() const override { return "멍멍!"; }

    void introduce() const override {
        Animal::introduce();  // 부모 함수 호출
        cout << "품종: " << breed << ", 소리: " << sound() << endl;
    }
};

class Cat : public Animal {
public:
    Cat(string n, int a) : Animal(n, a) {}
    string sound() const override { return "야옹~"; }
};

class Parrot : public Animal {
    string phrase;
public:
    Parrot(string n, int a, string p) : Animal(n, a), phrase(p) {}
    string sound() const override { return phrase + "!"; }
};

int main() {
    // 다형성: 기본 클래스 포인터로 파생 클래스 객체 관리
    vector<Animal*> animals;
    animals.push_back(new Dog("초코", 3, "말티즈"));
    animals.push_back(new Cat("나비", 5));
    animals.push_back(new Parrot("폴리", 2, "안녕"));
    animals.push_back(new Dog("바둑이", 7, "진돗개"));

    cout << "=== 동물 소개 ===" << endl;
    for (Animal* a : animals) {
        a->introduce();
        cout << "소리: " << a->sound() << "\n" << endl;
    }

    // 메모리 해제
    for (Animal* a : animals) {
        delete a;
    }

    return 0;
}
