// [218] 템플릿 - Templates
// 레벨: 4 | 함수 템플릿과 클래스 템플릿으로 제네릭 프로그래밍을 배웁니다

#include <iostream>
#include <vector>
#include <string>
using namespace std;

template<typename T>
T maxv(T a,T b){ return a>b?a:b; }

template<>
string maxv<string>(string a,string b){
    return a.size()>b.size()?a:b;
}

template<typename T>
class S{
    vector<T> d;
public:
    void push(T v){ d.push_back(v); }
    T top(){ return d.back(); }
};

template<typename T,int N=3>
class A{
    T a[N];
    int i=0;
public:
    void add(T v){ if(i<N) a[i++]=v; }
    void print(){ for(int j=0;j<i;j++) cout<<a[j]<<" "; cout<<endl; }
};

int main(){
    cout<<maxv(3,5)<<endl;
    cout<<maxv<string>("a","bb")<<endl;

    S<int> s;
    s.push(1); s.push(2);
    cout<<s.top()<<endl;

    A<int> arr;
    arr.add(1); arr.add(2);
    arr.print();

    return 0;
}
