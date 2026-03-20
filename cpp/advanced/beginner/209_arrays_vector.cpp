// [209] 배열과 벡터 - Arrays & Vector
// 레벨: 2 | C 배열과 C++ vector의 차이와 활용을 배웁니다

#include <iostream>
#include <vector>
#include <algorithm>  // sort, find
using namespace std;

int main() {
    // C 스타일 배열 (크기 고정)
    int cArr[5] = {5, 3, 1, 4, 2};
    cout << "C 배열: ";
    for (int n : cArr) cout << n << " ";
    cout << endl;

    // sort (algorithm 헤더)
    sort(cArr, cArr + 5);
    cout << "정렬 후: ";
    for (int n : cArr) cout << n << " ";
    cout << endl;

    // vector: 동적 크기, 안전
    cout << "\n=== vector ===" << endl;
    vector<int> scores = {85, 92, 78, 96, 88};

    // push_back: 뒤에 추가
    scores.push_back(100);
    cout << "push_back 후 크기: " << scores.size() << endl;

    // pop_back: 뒤에서 제거
    scores.pop_back();
    cout << "pop_back 후 크기: " << scores.size() << endl;

    // 인덱스 접근
    cout << "첫 번째: " << scores.front() << endl;
    cout << "마지막: " << scores.back() << endl;
    cout << "scores[2]: " << scores.at(2) << endl;  // 범위 체크

    // 벡터 정렬
    sort(scores.begin(), scores.end());
    cout << "정렬: ";
    for (auto s : scores) cout << s << " ";
    cout << endl;

    // 역순 정렬
    sort(scores.begin(), scores.end(), greater<int>());
    cout << "역순: ";
    for (auto s : scores) cout << s << " ";
    cout << endl;

    // 2차원 벡터
    cout << "\n=== 2차원 벡터 ===" << endl;
    vector<vector<int>> matrix = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    for (const auto& row : matrix) {
        for (int n : row) cout << n << " ";
        cout << endl;
    }

    // 문자열 벡터
    vector<string> names = {"김철수", "이영희", "박민수"};
    sort(names.begin(), names.end());
    cout << "\n이름 정렬: ";
    for (const auto& n : names) cout << n << " ";
    cout << endl;

    return 0;
}
