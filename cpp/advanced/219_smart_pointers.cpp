// [219] 스마트 포인터 - Smart Pointers
// 레벨: 4 | unique_ptr, shared_ptr, weak_ptr로 메모리를 자동 관리합니다

#include <iostream>
#include <memory>
using namespace std;

struct R{
    int v;
    R(int v):v(v){ cout<<v<<" create"<<endl; }
    ~R(){ cout<<v<<" del"<<endl; }
};

int main(){
    unique_ptr<R> u = make_unique<R>(1);
    u->v++;

    shared_ptr<R> s1 = make_shared<R>(2);
    shared_ptr<R> s2 = s1;
    cout<<s1.use_count()<<endl;

    weak_ptr<R> w = s1;
    if(auto t = w.lock()) cout<<t->v<<endl;

    s1.reset();
    cout<<w.expired()<<endl;

    return 0;
}
