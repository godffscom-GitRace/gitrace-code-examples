// [209] 배열과 벡터 - Arrays & Vector
// 레벨: 2 | C 배열과 C++ vector의 차이와 활용을 배웁니다

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int a[5] = {5, 3, 1, 4, 2};
    sort(a, a + 5);
    for (int n : a) cout << n << " ";
    cout << endl;

    vector<int> v = {3, 1, 2};
    v.push_back(4);
    v.pop_back();

    sort(v.begin(), v.end());
    for (int n : v) cout << n << " ";
    cout << endl;

    vector<vector<int>> m = {{1,2},{3,4}};
    for (auto& r : m) {
        for (int n : r) cout << n << " ";
        cout << endl;
    }

    return 0;
}
