// [214] STL 컨테이너 - vector & map
// 레벨: 3 | 가장 많이 쓰이는 STL 컨테이너 vector와 map을 배웁니다

#include <iostream>
#include <vector>
#include <map>
#include <algorithm>
#include <string>
using namespace std;

int main() {
    // ===== vector =====
    cout << "=== vector ===" << endl;
    vector<int> v = {5, 2, 8, 1, 9, 3};

    // 삽입/삭제
    v.push_back(7);            // 뒤에 추가
    v.insert(v.begin(), 0);    // 앞에 삽입
    v.erase(v.begin() + 3);    // 3번 인덱스 삭제

    sort(v.begin(), v.end());

    cout << "정렬된 벡터: ";
    for (auto n : v) cout << n << " ";
    cout << "\n크기: " << v.size() << endl;

    // find로 검색
    auto it = find(v.begin(), v.end(), 8);
    if (it != v.end()) {
        cout << "8의 위치: " << distance(v.begin(), it) << endl;
    }

    // ===== map =====
    cout << "\n=== map (정렬된 키-값 쌍) ===" << endl;
    map<string, int> scores;

    // 삽입
    scores["김철수"] = 88;
    scores["이영희"] = 95;
    scores["박민수"] = 72;
    scores.insert({"최지영", 91});

    // 순회 (키 기준 자동 정렬)
    for (const auto& [name, score] : scores) {  // C++17 구조적 바인딩
        cout << name << ": " << score << "점" << endl;
    }

    // 검색
    if (scores.count("이영희")) {
        cout << "\n이영희 점수: " << scores["이영희"] << endl;
    }

    // find
    auto it2 = scores.find("박민수");
    if (it2 != scores.end()) {
        cout << it2->first << "의 점수: " << it2->second << endl;
    }

    // 수정 & 삭제
    scores["박민수"] = 85;
    scores.erase("김철수");

    cout << "\n수정 후:" << endl;
    for (const auto& [k, v] : scores) {
        cout << "  " << k << ": " << v << endl;
    }

    cout << "\n맵 크기: " << scores.size() << endl;

    return 0;
}
