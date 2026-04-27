// [220] 람다 표현식 - Lambda Expressions
// 레벨: 4 | C++11 람다로 익명 함수를 간결하게 작성합니다

#include <iostream>
#include <vector>
#include <algorithm>
#include <functional>
using namespace std;

int main() {
    auto add = [](int a,int b){ return a+b; };
    cout<<add(2,3)<<endl;

    int base = 10;
    auto f = [=](int x){ return base + x; };
    cout<<f(5)<<endl;

    int c = 0;
    auto inc = [&](){ c++; };
    inc(); inc();
    cout<<c<<endl;

    vector<int> v = {3,1,2};
    sort(v.begin(), v.end(), [](int a,int b){ return a>b; });
    for(int n:v) cout<<n<<" ";
    cout<<endl;

    int k = count_if(v.begin(), v.end(), [](int n){ return n>1; });
    cout<<k<<endl;

    function<int(int)> sq = [](int x){ return x*x; };
    cout<<sq(4)<<endl;

    int r = [](int x){ return x+1; }(5);
    cout<<r<<endl;

    return 0;
}
