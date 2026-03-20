// [208] 참조 - References
// 레벨: 2 | C++의 참조(&)는 변수의 별명(alias)입니다

#include <iostream>
#include <string>
using namespace std;

// 참조 매개변수: 값 교환 (포인터 없이)
void swap(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

// const 참조: 복사 없이 읽기만
void printInfo(const string& name, const int& age) {
    cout << name << " (" << age << "세)" << endl;
}

// 참조 반환으로 연속 호출 가능
class Counter {
public:
    int count = 0;
    Counter& increment() { count++; return *this; }
    Counter& add(int n)  { count += n; return *this; }
};

int main() {
    // 참조 기본: 별명
    int original = 42;
    int& ref = original;  // ref는 original의 별명

    cout << "original = " << original << endl;
    cout << "ref = " << ref << endl;

    ref = 100;  // ref를 바꾸면 original도 바뀜
    cout << "ref = 100 후, original = " << original << endl;

    // 포인터 vs 참조 비교
    cout << "\n=== 참조로 swap ===" << endl;
    int x = 5, y = 10;
    cout << "전: x=" << x << ", y=" << y << endl;
    swap(x, y);  // & 없이 깔끔하게 호출
    cout << "후: x=" << x << ", y=" << y << endl;

    // const 참조: 큰 객체를 복사 없이 전달
    cout << "\n=== const 참조 ===" << endl;
    string name = "박민수";
    int age = 28;
    printInfo(name, age);  // 복사 없이 전달 (효율적)

    // 참조 반환으로 메서드 체이닝
    cout << "\n=== 메서드 체이닝 ===" << endl;
    Counter c;
    c.increment().increment().add(5).increment();
    cout << "count = " << c.count << endl;  // 1+1+5+1=8

    // 범위 기반 for에서 참조 사용
    int arr[] = {1, 2, 3, 4, 5};
    cout << "\n=== 참조로 배열 수정 ===" << endl;
    for (int& n : arr) {
        n *= 2;  // 원본 수정
    }
    for (int n : arr) {
        cout << n << " ";
    }
    cout << endl;

    return 0;
}
