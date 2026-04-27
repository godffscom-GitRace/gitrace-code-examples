// [214] STL 컨테이너 - vector & map
// 레벨: 3 | 가장 많이 쓰이는 STL 컨테이너 vector와 map을 배웁니다

#include <iostream>
#include <vector>
#include <map>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {3, 1, 2};
    v.push_back(4);
    v.erase(v.begin());
    sort(v.begin(), v.end());

    for (int n : v) cout << n << " ";
    cout << endl;

    auto it = find(v.begin(), v.end(), 2);
    if (it != v.end()) cout << distance(v.begin(), it) << endl;

    map<string, int> m;
    m["a"] = 1;
    m["b"] = 2;
    m.erase("a");

    for (auto& [k, val] : m)
        cout << k << " " << val << endl;

    return 0;
}
