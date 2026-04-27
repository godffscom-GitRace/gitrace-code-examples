// [207] 함수 - Functions
// 레벨: 2 | 함수 오버로딩, 기본값 매개변수, 인라인 함수를 배웁니다

#include <iostream>
#include <string>
using namespace std;

int add(int a, int b) { return a + b; }
double add(double a, double b) { return a + b; }

void greet(string name, string msg = "Hi") {
    cout << msg << " " << name << endl;
}

inline int sq(int x) { return x * x; }

int fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}

int& pick(int a[], int i) { return a[i]; }

int main() {
    cout << add(2, 3) << endl;
    cout << add(1.5, 2.5) << endl;

    greet("Alex");
    greet("Sam", "Hello");

    cout << sq(4) << endl;

    cout << fib(5) << endl;

    int arr[] = {1, 2, 3};
    pick(arr, 1) = 9;
    cout << arr[1] << endl;

    return 0;
}
