// [219] 스마트 포인터 - Smart Pointers
// 레벨: 4 | unique_ptr, shared_ptr, weak_ptr로 메모리를 자동 관리합니다

#include <iostream>
#include <memory>
#include <string>
#include <vector>
using namespace std;

class Resource {
    string name;
public:
    Resource(string n) : name(n) {
        cout << "Resource(" << name << ") 생성" << endl;
    }
    ~Resource() {
        cout << "Resource(" << name << ") 소멸" << endl;
    }
    void use() const { cout << name << " 사용 중..." << endl; }
    string getName() const { return name; }
};

// unique_ptr을 함수 매개변수로 (이동 전달)
void processResource(unique_ptr<Resource> res) {
    res->use();
    // 함수 종료 시 자동 소멸
}

int main() {
    // ===== unique_ptr =====
    cout << "=== unique_ptr (단독 소유) ===" << endl;
    {
        unique_ptr<Resource> up = make_unique<Resource>("파일A");
        up->use();
        // up2 = up;  // 컴파일 오류: 복사 불가
        unique_ptr<Resource> up2 = move(up);  // 소유권 이전
        cout << "이동 후 up: " << (up == nullptr ? "null" : "유효") << endl;
        up2->use();
    }  // 블록 끝 - 자동 소멸

    // make_unique 권장
    auto res = make_unique<Resource>("설정파일");
    processResource(move(res));  // 소유권 이전

    // ===== shared_ptr =====
    cout << "\n=== shared_ptr (공유 소유) ===" << endl;
    shared_ptr<Resource> sp1 = make_shared<Resource>("데이터베이스");
    {
        shared_ptr<Resource> sp2 = sp1;  // 참조 카운트 2
        shared_ptr<Resource> sp3 = sp1;  // 참조 카운트 3
        cout << "참조 카운트: " << sp1.use_count() << endl;
        sp2->use();
    }  // sp2, sp3 소멸 - 참조 카운트 1
    cout << "블록 후 참조 카운트: " << sp1.use_count() << endl;
    sp1->use();

    // ===== weak_ptr =====
    cout << "\n=== weak_ptr (순환 참조 방지) ===" << endl;
    weak_ptr<Resource> wp;
    {
        auto sp = make_shared<Resource>("임시자원");
        wp = sp;  // 참조 카운트 증가 없음
        cout << "유효: " << !wp.expired() << endl;

        if (auto locked = wp.lock()) {  // 사용 전 lock() 필수
            locked->use();
        }
    }  // sp 소멸
    cout << "소멸 후 유효: " << boolalpha << !wp.expired() << endl;

    // ===== unique_ptr 배열 =====
    cout << "\n=== 스마트 포인터 벡터 ===" << endl;
    vector<shared_ptr<Resource>> resources;
    resources.push_back(make_shared<Resource>("리소스1"));
    resources.push_back(make_shared<Resource>("리소스2"));
    for (auto& r : resources) r->use();

    return 0;  // 모든 스마트 포인터 자동 소멸
}
