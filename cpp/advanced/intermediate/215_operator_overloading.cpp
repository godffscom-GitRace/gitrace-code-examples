// [215] 연산자 오버로딩 - Operator Overloading
// 레벨: 3 | 사용자 정의 타입에 연산자를 정의하는 방법을 배웁니다

#include <iostream>
using namespace std;

class V {
public:
    double x, y;
    V(double x=0,double y=0):x(x),y(y){}

    V operator+(const V& o) const { return V(x+o.x,y+o.y); }
    V operator*(double s) const { return V(x*s,y*s); }
    bool operator==(const V& o) const { return x==o.x&&y==o.y; }

    double& operator[](int i){ return i?y:x; }

    V& operator+=(const V& o){ x+=o.x;y+=o.y;return *this; }

    friend ostream& operator<<(ostream& os,const V& v){
        os<<v.x<<" "<<v.y;return os;
    }
};

int main(){
    V a(1,2),b(3,4);

    cout<<(a+b)<<endl;
    cout<<(a*2)<<endl;
    cout<<(a==b)<<endl;

    cout<<a[0]<<" "<<a[1]<<endl;
    a[0]=5;

    a+=b;
    cout<<a<<endl;

    return 0;
}
