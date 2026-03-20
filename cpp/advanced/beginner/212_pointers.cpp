// [212] 포인터 - Pointers
// 레벨: 2 | C++ 포인터와 nullptr, 스마트 포인터 미리보기

#include <iostream>
#include <string>
using namespace std;

void increment(int* ptr) {
    (*ptr)++;
}

int* createArray(int size, int initVal) {
    int* arr = new int[size];
    for (int i = 0; i < size; i++) arr[i] = initVal;
    return arr;
}

int main() {
    // 포인터 기본
    int num = 42;
    int* ptr = &num;  // &: 주소 연산자

    cout << "num = " << num << endl;
    cout << "*ptr = " << *ptr << endl;      // 역참조
    cout << "ptr = " << ptr << endl;         // 주소값

    // nullptr (C++11): NULL 대신 사용
    int* p = nullptr;
    if (p == nullptr) {
        cout << "\np는 nullptr (안전)" << endl;
    }

    // 포인터로 값 변경
    increment(&num);
    cout << "increment 후: " << num << endl;

    // 동적 메모리 할당
    cout << "\n=== 동적 배열 ===" << endl;
    int* scores = createArray(5, 0);
    scores[0] = 85; scores[1] = 92; scores[2] = 78;
    scores[3] = 96; scores[4] = 88;

    for (int i = 0; i < 5; i++) {
        cout << "scores[" << i << "] = " << scores[i] << endl;
    }
    delete[] scores;  // 배열 해제: delete[] 사용
    scores = nullptr;

    // 포인터와 string
    cout << "\n=== 포인터와 객체 ===" << endl;
    string* sPtr = new string("안녕하세요!");
    cout << *sPtr << endl;
    cout << sPtr->length() << "글자" << endl;  // -> 연산자
    delete sPtr;

    // 함수 포인터
    cout << "\n=== 함수 포인터 ===" << endl;
    auto square = [](int x) { return x * x; };
    int (*funcPtr)(int) = [](int x) { return x * 2; };

    cout << "square(5) = " << square(5) << endl;
    cout << "funcPtr(5) = " << funcPtr(5) << endl;

    return 0;
}
