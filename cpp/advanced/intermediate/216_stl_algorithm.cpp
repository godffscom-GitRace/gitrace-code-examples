// [216] STL 알고리즘 - STL Algorithms
// 레벨: 3 | algorithm 헤더의 핵심 함수들을 배웁니다

#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

int main() {
    vector<int> v = {3,1,2,1};

    sort(v.begin(), v.end());
    v.erase(unique(v.begin(), v.end()), v.end());

    for (int n : v) cout << n << " ";
    cout << endl;

    auto it = find(v.begin(), v.end(), 2);
    if (it != v.end()) cout << 1 << endl;

    int sum = accumulate(v.begin(), v.end(), 0);
    cout << sum << endl;

    for_each(v.begin(), v.end(), [](int n){ cout << n*n << " "; });
    cout << endl;

    vector<int> d(v.size());
    transform(v.begin(), v.end(), d.begin(), [](int n){ return n*2; });
    for (int n : d) cout << n << " ";
    cout << endl;

    vector<int> e;
    copy_if(v.begin(), v.end(), back_inserter(e), [](int n){ return n%2==0; });
    for (int n : e) cout << n << " ";
    cout << endl;

    reverse(v.begin(), v.end());
    for (int n : v) cout << n << " ";
    cout << endl;

    return 0;
}
