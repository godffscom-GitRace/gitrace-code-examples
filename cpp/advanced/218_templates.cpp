// [218] 템플릿 - Templates
// 레벨: 4 | 함수 템플릿과 클래스 템플릿으로 제네릭 프로그래밍을 배웁니다

#include <iostream>
#include <vector>
#include <string>
using namespace std;

// 함수 템플릿: 어떤 타입이든 동작
template<typename T>
T maxVal(T a, T b) {
    return (a > b) ? a : b;
}

// 여러 타입 매개변수
template<typename T, typename U>
void printPair(const T& first, const U& second) {
    cout << "(" << first << ", " << second << ")" << endl;
}

// 템플릿 특수화: 특정 타입에 맞는 동작 정의
template<>
string maxVal<string>(string a, string b) {
    return (a.length() >= b.length()) ? a : b;  // 길이 기준
}

// 클래스 템플릿
template<typename T>
class Stack {
    vector<T> data;
public:
    void push(const T& val) { data.push_back(val); }

    void pop() {
        if (!empty()) data.pop_back();
    }

    T& top() { return data.back(); }

    bool empty() const { return data.empty(); }
    size_t size() const { return data.size(); }

    void print() const {
        cout << "Stack [";
        for (const auto& v : data) cout << v << " ";
        cout << "]" << endl;
    }
};

// 템플릿 + 기본값
template<typename T, int SIZE = 10>
class FixedArray {
    T arr[SIZE];
    int count = 0;
public:
    bool add(const T& val) {
        if (count >= SIZE) return false;
        arr[count++] = val;
        return true;
    }
    void print() const {
        for (int i = 0; i < count; i++) cout << arr[i] << " ";
        cout << endl;
    }
};

int main() {
    // 함수 템플릿
    cout << "=== 함수 템플릿 ===" << endl;
    cout << "max(3, 7) = " << maxVal(3, 7) << endl;
    cout << "max(3.14, 2.71) = " << maxVal(3.14, 2.71) << endl;
    cout << "max(\"apple\", \"kiwi\") = " << maxVal<string>("apple", "kiwi") << endl;

    cout << "\n페어 출력:" << endl;
    printPair("이름", "김철수");
    printPair("나이", 25);
    printPair(3.14, true);

    // 클래스 템플릿
    cout << "\n=== 정수 스택 ===" << endl;
    Stack<int> intStack;
    intStack.push(10); intStack.push(20); intStack.push(30);
    intStack.print();
    cout << "top: " << intStack.top() << endl;
    intStack.pop();
    intStack.print();

    cout << "\n=== 문자열 스택 ===" << endl;
    Stack<string> strStack;
    strStack.push("C++"); strStack.push("Python"); strStack.push("Java");
    strStack.print();

    cout << "\n=== 고정 크기 배열 ===" << endl;
    FixedArray<double, 5> arr;
    arr.add(1.1); arr.add(2.2); arr.add(3.3);
    arr.print();

    return 0;
}
