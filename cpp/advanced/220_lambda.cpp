// [220] 람다 표현식 - Lambda Expressions
// 레벨: 4 | C++11 람다로 익명 함수를 간결하게 작성합니다

#include <iostream>
#include <vector>
#include <algorithm>
#include <functional>
#include <string>
using namespace std;

int main() {
    // 람다 기본 문법: [캡처](매개변수) -> 반환타입 { 본문 }
    auto greet = []() { cout << "Hello, Lambda!" << endl; };
    greet();

    // 매개변수와 반환값
    auto add = [](int a, int b) -> int { return a + b; };
    cout << "add(3, 4) = " << add(3, 4) << endl;

    // 반환 타입 추론 (-> int 생략 가능)
    auto square = [](int x) { return x * x; };
    cout << "square(5) = " << square(5) << endl;

    // ===== 캡처 =====
    cout << "\n=== 캡처 ===" << endl;
    int base = 100;
    string prefix = "점수: ";

    // [=]: 외부 변수를 값으로 캡처
    auto showScore = [=](int score) {
        cout << prefix << (base + score) << endl;
    };
    showScore(20);

    // [&]: 외부 변수를 참조로 캡처 (수정 가능)
    int count = 0;
    auto counter = [&]() { count++; };
    counter(); counter(); counter();
    cout << "count = " << count << endl;  // 3

    // ===== STL과 람다 =====
    cout << "\n=== STL + 람다 ===" << endl;
    vector<int> nums = {5, 2, 8, 1, 9, 3, 7, 4, 6};

    // sort: 내림차순
    sort(nums.begin(), nums.end(), [](int a, int b) { return a > b; });
    cout << "내림차순: ";
    for (auto n : nums) cout << n << " ";
    cout << endl;

    // find_if: 조건 검색
    auto it = find_if(nums.begin(), nums.end(), [](int n) { return n < 3; });
    cout << "3 미만 첫 값: " << *it << endl;

    // count_if
    int bigCount = count_if(nums.begin(), nums.end(), [](int n) { return n > 5; });
    cout << "5 초과 개수: " << bigCount << endl;

    // ===== function 객체 =====
    cout << "\n=== std::function ===" << endl;
    function<int(int, int)> op;

    op = [](int a, int b) { return a + b; };
    cout << "더하기: " << op(3, 4) << endl;

    op = [](int a, int b) { return a * b; };
    cout << "곱하기: " << op(3, 4) << endl;

    // 즉시 실행 람다 (IIFE)
    int result = [](int x) { return x * x + 2 * x + 1; }(5);
    cout << "\n즉시 실행: " << result << endl;

    return 0;
}
