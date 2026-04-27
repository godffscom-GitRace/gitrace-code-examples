// [212] 포인터 - Pointers
// 레벨: 2 | C++ 포인터와 nullptr, 스마트 포인터 미리보기

#include <iostream>
using namespace std;

void inc(int* p) { (*p)++; }

int* make(int n) {
    int* a = new int[n];
    for (int i = 0; i < n; i++) a[i] = i;
    return a;
}

int main() {
    int x = 5;
    int* p = &x;

    cout << *p << endl;

    inc(&x);
    cout << x << endl;

    int* arr = make(3);
    for (int i = 0; i < 3; i++)
        cout << arr[i] << " ";
    cout << endl;

    delete[] arr;
    arr = nullptr;

    int (*f)(int) = [](int n){ return n * 2; };
    cout << f(3) << endl;

    return 0;
}
