// [216] STL 알고리즘 - STL Algorithms
// 레벨: 3 | algorithm 헤더의 핵심 함수들을 배웁니다

#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>   // accumulate
#include <string>
using namespace std;

int main() {
    vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3};

    cout << "원본: ";
    for (auto n : v) cout << n << " ";
    cout << endl;

    // sort: 정렬
    sort(v.begin(), v.end());
    cout << "정렬: ";
    for (auto n : v) cout << n << " ";
    cout << endl;

    // unique: 중복 제거 (정렬 후 사용)
    auto it = unique(v.begin(), v.end());
    v.erase(it, v.end());
    cout << "중복 제거: ";
    for (auto n : v) cout << n << " ";
    cout << endl;

    // find / count
    cout << "\n=== 검색 ===" << endl;
    auto pos = find(v.begin(), v.end(), 5);
    if (pos != v.end()) cout << "5 발견!" << endl;
    cout << "5의 개수: " << count(v.begin(), v.end(), 5) << endl;

    // min_element, max_element
    cout << "최솟값: " << *min_element(v.begin(), v.end()) << endl;
    cout << "최댓값: " << *max_element(v.begin(), v.end()) << endl;

    // accumulate: 합계
    int total = accumulate(v.begin(), v.end(), 0);
    cout << "합계: " << total << endl;

    // for_each: 각 요소에 함수 적용
    cout << "\n=== for_each ===" << endl;
    for_each(v.begin(), v.end(), [](int n) {
        cout << n * n << " ";
    });
    cout << endl;

    // transform: 변환하여 저장
    vector<int> doubled(v.size());
    transform(v.begin(), v.end(), doubled.begin(), [](int n) {
        return n * 2;
    });
    cout << "2배: ";
    for (auto n : doubled) cout << n << " ";
    cout << endl;

    // copy_if: 조건 필터링
    vector<int> evens;
    copy_if(v.begin(), v.end(), back_inserter(evens), [](int n) {
        return n % 2 == 0;
    });
    cout << "짝수만: ";
    for (auto n : evens) cout << n << " ";
    cout << endl;

    // reverse
    reverse(v.begin(), v.end());
    cout << "역순: ";
    for (auto n : v) cout << n << " ";
    cout << endl;

    return 0;
}
