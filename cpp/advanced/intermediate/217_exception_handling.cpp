// [217] 예외 처리 - Exception Handling
// 레벨: 3 | try-catch-throw로 예외를 처리하는 방법을 배웁니다

#include <iostream>
#include <stdexcept>
using namespace std;

class E : public runtime_error {
public:
    E():runtime_error("bad"){} 
};

double divv(double a,double b){
    if(b==0) throw invalid_argument("zero");
    return a/b;
}

int main(){
    try{
        cout<<divv(6,2)<<endl;
        cout<<divv(6,0)<<endl;
    }catch(const invalid_argument& e){
        cout<<e.what()<<endl;
    }

    try{
        throw E();
    }catch(const E&){
        cout<<1<<endl;
    }catch(const exception&){
        cout<<2<<endl;
    }

    try{
        throw runtime_error("x");
    }catch(...){
        cout<<3<<endl;
    }

    cout<<4<<endl;
    return 0;
}
